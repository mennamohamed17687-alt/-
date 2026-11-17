/**
 * خُطوة – KHOTWA
 * نظام إدارة المصادقة والمستخدمين والصلاحيات (Authentication & RBAC)
 * يدعم تسجيل الدخول، إنشاء الحساب، الصلاحيات، وإدارة الجلسات الآمنة.
 */

(function () {
    const CURRENT_USER_KEY = "khotwa_current_user_v1";
    const USERS_KEY = "khotwa_users_v1";

    const KhotwaAuth = {
        // جلب المستخدم الحالي المسجل
        getCurrentUser: function () {
            try {
                const stored = sessionStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem(CURRENT_USER_KEY);
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                return null;
            }
        },

        // التحقق مما إذا كان المستخدم مديراً
        isAdmin: function () {
            const user = this.getCurrentUser();
            return user && user.role === "admin";
        },

        // تسجيل الدخول
        login: function (email, password, rememberMe = true) {
            const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
            const cleanEmail = email.trim().toLowerCase();
            const found = users.find(u => u.email.toLowerCase() === cleanEmail);

            if (!found) {
                return { success: false, message: "البريد الإلكتروني غير مسجل في المنصة." };
            }

            // التحقق من كلمة المرور (في بيئة العرض ومطابقة كلمة المرور المشفرة/المخزنة)
            if (found.passwordHash !== password) {
                return { success: false, message: "كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة." };
            }

            // إنشاء بيانات الجلسة (بدون كلمة المرور)
            const sessionUser = {
                id: found.id,
                name: found.name,
                email: found.email,
                role: found.role,
                phone: found.phone || "",
                city: found.city || "",
                accessibilityPreferences: found.accessibilityPreferences || [],
                token: "token_" + Math.random().toString(36).substr(2) + Date.now()
            };

            if (rememberMe) {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
            } else {
                sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
            }

            if (window.KhotwaStore) {
                window.KhotwaStore.addAuditLog("تسجيل دخول", `تم تسجيل دخول المستخدم ${found.name} (${found.role}).`);
            }

            return { success: true, user: sessionUser };
        },

        // إنشاء حساب جديد
        register: function (data) {
            const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
            const cleanEmail = data.email.trim().toLowerCase();

            if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
                return { success: false, message: "هذا البريد الإلكتروني مسجل بالفعل. يمكنك تسجيل الدخول مباشرة." };
            }

            if (!data.password || data.password.length < 6) {
                return { success: false, message: "يجب ألا تقل كلمة المرور عن 6 خانات لضمان الأمان." };
            }

            const newUser = {
                id: "usr-" + Date.now().toString().slice(-6),
                name: data.name.trim(),
                email: cleanEmail,
                passwordHash: data.password, // يتم حفظ التشفير في بيئة الإنتاج السحابية
                role: "user",
                phone: data.phone ? data.phone.trim() : "",
                city: data.city || "القاهرة",
                accessibilityPreferences: data.accessibilityPreferences || [],
                createdAt: new Date().toISOString().split("T")[0]
            };

            users.push(newUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            // تسجيل الدخول التلقائي بعد التسجيل
            return this.login(cleanEmail, data.password, true);
        },

        // تسجيل الخروج
        logout: function () {
            const user = this.getCurrentUser();
            if (user && window.KhotwaStore) {
                window.KhotwaStore.addAuditLog("تسجيل خروج", `قام ${user.name} بتسجيل الخروج.`);
            }
            sessionStorage.removeItem(CURRENT_USER_KEY);
            localStorage.removeItem(CURRENT_USER_KEY);
            window.location.href = "login.html";
        },

        // تعديل البيانات الشخصية
        updateProfile: function (updatedData) {
            const user = this.getCurrentUser();
            if (!user) return { success: false, message: "يجب تسجيل الدخول أولاً." };

            const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
            const index = users.findIndex(u => u.id === user.id);
            if (index === -1) return { success: false, message: "المستخدم غير موجود." };

            users[index].name = updatedData.name ? updatedData.name.trim() : users[index].name;
            users[index].phone = updatedData.phone !== undefined ? updatedData.phone.trim() : users[index].phone;
            users[index].city = updatedData.city || users[index].city;
            if (updatedData.accessibilityPreferences) {
                users[index].accessibilityPreferences = updatedData.accessibilityPreferences;
            }

            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            // تحديث الجلسة النشطة
            const sessionUser = {
                ...user,
                name: users[index].name,
                phone: users[index].phone,
                city: users[index].city,
                accessibilityPreferences: users[index].accessibilityPreferences
            };
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

            return { success: true, user: sessionUser };
        },

        // تعديل كلمة المرور
        changePassword: function (oldPassword, newPassword) {
            const user = this.getCurrentUser();
            if (!user) return { success: false, message: "يجب تسجيل الدخول أولاً." };

            const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
            const index = users.findIndex(u => u.id === user.id);
            if (index === -1) return { success: false, message: "المستخدم غير موجود." };

            if (users[index].passwordHash !== oldPassword) {
                return { success: false, message: "كلمة المرور الحالية غير صحيحة." };
            }

            if (!newPassword || newPassword.length < 6) {
                return { success: false, message: "كلمة المرور الجديدة يجب أن تكون 6 خانات على الأقل." };
            }

            users[index].passwordHash = newPassword;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            return { success: true, message: "تم تحديث كلمة المرور بنجاح." };
        },

        // استعادة / إعادة تعيين كلمة المرور
        resetPassword: function (email, newPassword) {
            const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
            const cleanEmail = email.trim().toLowerCase();
            const index = users.findIndex(u => u.email.toLowerCase() === cleanEmail);

            if (index === -1) {
                return { success: false, message: "البريد الإلكتروني غير مسجل في قاعدة البيانات." };
            }

            if (!newPassword || newPassword.length < 6) {
                return { success: false, message: "كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف." };
            }

            users[index].passwordHash = newPassword;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            if (window.KhotwaStore) {
                window.KhotwaStore.addAuditLog("استعادة كلمة المرور", `تم تعيين كلمة مرور جديدة للمستخدم (${cleanEmail}).`);
            }

            return { success: true, message: "تم تعيين كلمة المرور الجديدة بنجاح! يمكنك الآن تسجيل الدخول." };
        },

        // حذف الحساب
        deleteAccount: function () {
            const user = this.getCurrentUser();
            if (!user) return false;

            let users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
            users = users.filter(u => u.id !== user.id);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            this.logout();
            return true;
        },

        // فحص الحماية للصفحات المحمية (Route Guard)
        requireAuth: function (adminOnly = false) {
            const user = this.getCurrentUser();
            if (!user) {
                window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.pathname);
                return false;
            }
            if (adminOnly && user.role !== "admin") {
                alert("عفواً، هذه الصفحة مخصصة لمديري منصة خُطوة فقط.");
                window.location.href = "index.html";
                return false;
            }
            return true;
        },

        // تحديث شريط الهيدر ديناميكياً في كل الصفحات
        renderNavAuth: function () {
            const container = document.getElementById("navAuthContainer");
            if (!container) return;

            const user = this.getCurrentUser();

            if (user) {
                const isAdmin = user.role === "admin";
                container.innerHTML = `
                    <div class="user-nav-dropdown" style="display:flex;align-items:center;gap:12px;">
                        ${isAdmin ? `<a href="admin.html" class="nav-admin-badge" style="background:#d97706;color:white;padding:5px 11px;border-radius:8px;font-size:12px;font-weight:bold;text-decoration:none;">لوحة الإدارة ⚙️</a>` : ""}
                        <a href="profile.html" class="user-nav-profile" style="display:flex;align-items:center;gap:7px;color:#176b63;font-weight:bold;text-decoration:none;font-size:14px;">
                            <span class="user-avatar-circle" style="width:34px;height:34px;border-radius:50%;background:#e0f2fe;color:#0369a1;display:flex;align-items:center;justify-content:center;font-size:14px;border:1px solid #bae6fd;">
                                ${user.name.charAt(0)}
                            </span>
                            <span>${user.name.split(" ")[0]}</span>
                        </a>
                        <button onclick="KhotwaAuth.logout()" class="btn-logout" title="تسجيل الخروج" style="background:transparent;border:1px solid #cbd5e1;color:#64748b;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:13px;">خروج</button>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div style="display:flex;align-items:center;gap:10px;">
                        <a href="login.html" class="btn btn-secondary" style="padding:8px 16px;font-size:14px;">دخول</a>
                        <a href="register.html" class="btn btn-primary" style="padding:8px 16px;font-size:14px;">إنشاء حساب</a>
                    </div>
                `;
            }
        }
    };

    window.KhotwaAuth = KhotwaAuth;
    document.addEventListener("DOMContentLoaded", function () {
        KhotwaAuth.renderNavAuth();
    });
})();
