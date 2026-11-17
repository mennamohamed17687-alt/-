/**
 * خُطوة – KHOTWA
 * الملف البرمجي العام للتطبيقات والواجهات (Global UI & Utility Helpers)
 */

(function () {
    const KhotwaApp = {
        // رسائل التنبيه العائمة (Accessible Toast Notifications)
        showToast: function (message, type = "info", duration = 3500) {
            let container = document.getElementById("khotwaToastContainer");
            if (!container) {
                container = document.createElement("div");
                container.id = "khotwaToastContainer";
                container.className = "toast-container";
                container.setAttribute("aria-live", "polite");
                container.setAttribute("aria-atomic", "true");
                document.body.appendChild(container);
            }

            const toast = document.createElement("div");
            toast.className = `toast-item toast-${type}`;
            toast.setAttribute("role", "alert");

            let icon = "ℹ️";
            if (type === "success") icon = "✓";
            if (type === "error") icon = "✕";
            if (type === "warning") icon = "⚠️";

            toast.innerHTML = `
                <span class="toast-icon">${icon}</span>
                <span class="toast-text">${message}</span>
                <button class="toast-close" aria-label="إغلاق التنبيه">&times;</button>
            `;

            container.appendChild(toast);

            const removeToast = () => {
                toast.classList.add("toast-hiding");
                setTimeout(() => {
                    if (toast.parentNode) toast.parentNode.removeChild(toast);
                }, 300);
            };

            toast.querySelector(".toast-close").addEventListener("click", removeToast);
            setTimeout(removeToast, duration);
        },

        // مشاركة المكان
        sharePlace: function (placeName, placeUrl) {
            const url = placeUrl || window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: `منصة خُطوة | ${placeName}`,
                    text: `تعرّف على تفاصيل الإتاحة لـ ${placeName} عبر منصة خُطوة:`,
                    url: url
                }).catch(() => {
                    // المستخدم أغلق نافذة المشاركة
                });
            } else {
                navigator.clipboard.writeText(url).then(() => {
                    this.showToast("تم نسخ رابط المكان إلى الحافظة بنجاح! 📋", "success");
                }).catch(() => {
                    prompt("انسخ الرابط التالي لمشاركته:", url);
                });
            }
        },

        // طلب إحداثيات موقع المستخدم
        getUserLocation: function (onSuccess, onError) {
            if (!("geolocation" in navigator)) {
                if (typeof onError === "function") onError("متصفحك لا يدعم تحديد الموقع الجغرافي.");
                return;
            }

            this.showToast("جارٍ طلب إذن تحديد الموقع الجغرافي...", "info", 2000);

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    onSuccess(position.coords.latitude, position.coords.longitude);
                },
                function (err) {
                    let msg = "تعذر الحصول على موقعك الجغرافي.";
                    if (err.code === 1) msg = "تم رفض إذن الوصول إلى الموقع. يمكنك البحث باختيار المحافظة والمدينة يدوياً.";
                    if (err.code === 2) msg = "موقعك غير متاح حالياً. تأكد من اتصال الإنترنت ونظام تحديد المواقع GPS.";
                    if (err.code === 3) msg = "انتهت مهلة تحديد الموقع.";
                    if (typeof onError === "function") onError(msg);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
            );
        },

        // توليد نجوم التقييم كـ HTML
        renderStars: function (rating) {
            const num = Math.round((rating || 5) * 2) / 2;
            let stars = "";
            for (let i = 1; i <= 5; i++) {
                if (num >= i) {
                    stars += '<span class="star filled" aria-hidden="true">★</span>';
                } else if (num >= i - 0.5) {
                    stars += '<span class="star half" aria-hidden="true">★</span>';
                } else {
                    stars += '<span class="star empty" aria-hidden="true">☆</span>';
                }
            }
            return `<span class="stars-wrapper" title="تقييم ${rating} من 5">${stars} <strong class="rating-num">${rating}</strong></span>`;
        },

        // صورة بديلة عند تعذر تحميل الصورة الأصلية
        handleImageError: function (imgElement, fallbackTitle = "خُطوة") {
            imgElement.onerror = null;
            imgElement.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e8f5f3%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20fill%3D%22%23087e78%22%3E%F0%9F%A7%AD%20%D8%AE%D9%8F%D8%B7%D9%88%D8%A9%3C%2Ftext%3E%3C%2Fsvg%3E";
            imgElement.alt = fallbackTitle;
        },

        // تهيئة قائمة الهاتف المحمول (Mobile Nav)
        initMobileNav: function () {
            const toggleBtn = document.querySelector(".nav-toggle-btn");
            const navMenu = document.querySelector(".main-nav");
            if (!toggleBtn || !navMenu) return;

            toggleBtn.addEventListener("click", function () {
                const isOpen = navMenu.classList.toggle("open");
                toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            });
        },

        // تمييز الرابط النشط في القائمة
        highlightActiveLink: function () {
            const currentPath = window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll(".main-nav a");

            navLinks.forEach(link => {
                const href = link.getAttribute("href");
                if (href && (href === currentPath || (currentPath === "" && href === "index.html"))) {
                    link.classList.add("active");
                    link.setAttribute("aria-current", "page");
                }
            });
        },

        // تحديث التاريخ والسنة في التذييل
        updateFooterYear: function () {
            document.querySelectorAll(".current-year").forEach(el => {
                el.textContent = new Date().getFullYear();
            });
        }
    };

    window.KhotwaApp = KhotwaApp;

    document.addEventListener("DOMContentLoaded", function () {
        KhotwaApp.initMobileNav();
        KhotwaApp.highlightActiveLink();
        KhotwaApp.updateFooterYear();
    });
})();
