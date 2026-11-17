/**
 * خُطوة – KHOTWA
 * محرك إمكانية الوصول وسهولة الاستخدام (Accessibility Engine - WCAG 2.2 AA)
 * يوفر لوحة تحكم عائمة وتخصيصات فورية لجميع فئات المستخدمين.
 */

(function () {
    const SETTINGS_KEY = "khotwa_accessibility_settings_v1";

    const defaultSettings = {
        fontSize: "normal", // normal | medium | large
        contrast: "default", // default | high-contrast | dark
        dyslexicFont: false,
        reduceMotion: false,
        highlightLinks: false
    };

    function getSettings() {
        try {
            const saved = localStorage.getItem(SETTINGS_KEY);
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch (e) {
            return defaultSettings;
        }
    }

    function saveSettings(settings) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        applySettings(settings);
    }

    function applySettings(settings) {
        const root = document.documentElement;
        const body = document.body;

        // حجم الخط
        root.classList.remove("font-medium", "font-large");
        if (settings.fontSize === "medium") root.classList.add("font-medium");
        if (settings.fontSize === "large") root.classList.add("font-large");

        // التباين
        root.classList.remove("theme-high-contrast", "theme-dark");
        if (settings.contrast === "high-contrast") root.classList.add("theme-high-contrast");
        if (settings.contrast === "dark") root.classList.add("theme-dark");

        // خط عسر القراءة
        if (settings.dyslexicFont) {
            root.classList.add("font-dyslexic");
        } else {
            root.classList.remove("font-dyslexic");
        }

        // تقليل الحركة
        if (settings.reduceMotion) {
            root.classList.add("reduce-motion");
        } else {
            root.classList.remove("reduce-motion");
        }

        // إبراز الروابط
        if (settings.highlightLinks) {
            root.classList.add("highlight-links");
        } else {
            root.classList.remove("highlight-links");
        }

        // تحديث حالة عناصر التحكم في اللوحة إذا كانت مفتوحة
        updateWidgetUI(settings);
    }

    function updateWidgetUI(settings) {
        const widget = document.getElementById("khotwaAccessWidget");
        if (!widget) return;

        // تحديث أزرار حجم الخط
        const fontBtns = widget.querySelectorAll("[data-font-size]");
        fontBtns.forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-font-size") === settings.fontSize);
        });

        // أزرار التباين
        const contrastBtns = widget.querySelectorAll("[data-contrast]");
        contrastBtns.forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-contrast") === settings.contrast);
        });

        // مربعات الاختيار
        const dyslexicCheckbox = widget.querySelector("#toggleDyslexicFont");
        if (dyslexicCheckbox) dyslexicCheckbox.checked = settings.dyslexicFont;

        const motionCheckbox = widget.querySelector("#toggleReduceMotion");
        if (motionCheckbox) motionCheckbox.checked = settings.reduceMotion;

        const linksCheckbox = widget.querySelector("#toggleHighlightLinks");
        if (linksCheckbox) linksCheckbox.checked = settings.highlightLinks;
    }

    // القارئ الصوتي (Speech Synthesis)
    let currentUtterance = null;
    function speakText(text, onStart, onEnd) {
        if (!("speechSynthesis" in window)) {
            alert("عذراً، متصفحك لا يدعم خاصية تحويل النص إلى صوت حالياً.");
            return;
        }

        window.speechSynthesis.cancel(); // إيقاف أي قراءة جارية

        if (!text || text.trim() === "") return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ar-SA";
        utterance.rate = 0.95;

        // محاولة اختيار صوت عربي متاح في النظام
        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find(v => v.lang.startsWith("ar"));
        if (arabicVoice) utterance.voice = arabicVoice;

        utterance.onstart = () => { if (typeof onStart === "function") onStart(); };
        utterance.onend = () => { if (typeof onEnd === "function") onEnd(); };
        utterance.onerror = () => { if (typeof onEnd === "function") onEnd(); };

        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    }

    function stopSpeaking() {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    }

    // بناء الواجهة العائمة لإمكانية الوصول
    function injectFloatingWidget() {
        if (document.getElementById("khotwaAccessWidget")) return;

        // زر التخطي إلى المحتوى الرئيسي لسهولة وصول لوحة المفاتيح
        if (!document.getElementById("skipToContentLink")) {
            const skipLink = document.createElement("a");
            skipLink.id = "skipToContentLink";
            skipLink.href = "#mainContent";
            skipLink.className = "skip-to-content";
            skipLink.textContent = "تخطي إلى المحتوى الرئيسي";
            document.body.prepend(skipLink);
        }

        const widgetDiv = document.createElement("div");
        widgetDiv.id = "khotwaAccessWidget";
        widgetDiv.className = "accessibility-floating-widget";
        widgetDiv.setAttribute("role", "dialog");
        widgetDiv.setAttribute("aria-label", "خيارات سهولة الوصول");

        widgetDiv.innerHTML = `
            <button id="toggleAccessPanelBtn" class="access-trigger-btn" aria-haspopup="dialog" aria-expanded="false" title="إعدادات سهولة الوصول (Alt + A)">
                <span class="access-icon-spin" aria-hidden="true">♿</span>
                <span class="sr-only">إعدادات سهولة الوصول</span>
            </button>

            <div id="accessPanelCard" class="access-panel-card" style="display:none;" aria-hidden="true">
                <div class="access-panel-header">
                    <h3>أدوات سهولة الوصول ♿</h3>
                    <button id="closeAccessPanelBtn" class="close-panel-btn" aria-label="إغلاق لوحة الوصول">&times;</button>
                </div>

                <div class="access-panel-body">
                    <div class="tool-group">
                        <label class="tool-label">حجم الخط:</label>
                        <div class="tool-options font-sizes">
                            <button type="button" data-font-size="normal" class="tool-btn">افتراضي A</button>
                            <button type="button" data-font-size="medium" class="tool-btn">متوسط A+</button>
                            <button type="button" data-font-size="large" class="tool-btn">كبير A++</button>
                        </div>
                    </div>

                    <div class="tool-group">
                        <label class="tool-label">تباين الألوان:</label>
                        <div class="tool-options contrasts">
                            <button type="button" data-contrast="default" class="tool-btn">عادي</button>
                            <button type="button" data-contrast="high-contrast" class="tool-btn theme-btn-hc">تباين عالٍ 👁️</button>
                            <button type="button" data-contrast="dark" class="tool-btn theme-btn-dark">داكن 🌙</button>
                        </div>
                    </div>

                    <div class="tool-group toggles">
                        <label class="toggle-control">
                            <input type="checkbox" id="toggleDyslexicFont">
                            <span>خط سهل القراءة (عسر القراءة)</span>
                        </label>
                        <label class="toggle-control">
                            <input type="checkbox" id="toggleReduceMotion">
                            <span>إيقاف الحركات والتأثيرات الانتقالية</span>
                        </label>
                        <label class="toggle-control">
                            <input type="checkbox" id="toggleHighlightLinks">
                            <span>إبراز جميع الروابط والأزرار</span>
                        </label>
                    </div>

                    <div class="tool-actions">
                        <button type="button" id="resetAccessSettingsBtn" class="btn btn-secondary btn-sm" style="width:100%;font-size:13px;padding:8px;">إعادة ضبط الإعدادات</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(widgetDiv);

        // ربط الأحداث
        const triggerBtn = widgetDiv.querySelector("#toggleAccessPanelBtn");
        const panelCard = widgetDiv.querySelector("#accessPanelCard");
        const closeBtn = widgetDiv.querySelector("#closeAccessPanelBtn");

        function togglePanel(open) {
            const isCurrentlyOpen = panelCard.style.display !== "none";
            const willOpen = open !== undefined ? open : !isCurrentlyOpen;
            panelCard.style.display = willOpen ? "block" : "none";
            triggerBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
            panelCard.setAttribute("aria-hidden", willOpen ? "false" : "true");
            if (willOpen) {
                closeBtn.focus();
            } else {
                triggerBtn.focus();
            }
        }

        triggerBtn.addEventListener("click", () => togglePanel());
        closeBtn.addEventListener("click", () => togglePanel(false));

        // إغلاق بمفتاح Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && panelCard.style.display !== "none") {
                togglePanel(false);
            }
            // اختصار Alt + A لفتح لوحة الوصول
            if (e.altKey && (e.key === "a" || e.key === "A" || e.key === "ش")) {
                e.preventDefault();
                togglePanel();
            }
        });

        // أحداث تغيير الخط والتباين
        widgetDiv.querySelectorAll("[data-font-size]").forEach(btn => {
            btn.addEventListener("click", () => {
                const settings = getSettings();
                settings.fontSize = btn.getAttribute("data-font-size");
                saveSettings(settings);
            });
        });

        widgetDiv.querySelectorAll("[data-contrast]").forEach(btn => {
            btn.addEventListener("click", () => {
                const settings = getSettings();
                settings.contrast = btn.getAttribute("data-contrast");
                saveSettings(settings);
            });
        });

        widgetDiv.querySelector("#toggleDyslexicFont").addEventListener("change", (e) => {
            const settings = getSettings();
            settings.dyslexicFont = e.target.checked;
            saveSettings(settings);
        });

        widgetDiv.querySelector("#toggleReduceMotion").addEventListener("change", (e) => {
            const settings = getSettings();
            settings.reduceMotion = e.target.checked;
            saveSettings(settings);
        });

        widgetDiv.querySelector("#toggleHighlightLinks").addEventListener("change", (e) => {
            const settings = getSettings();
            settings.highlightLinks = e.target.checked;
            saveSettings(settings);
        });

        widgetDiv.querySelector("#resetAccessSettingsBtn").addEventListener("click", () => {
            saveSettings(defaultSettings);
        });

        applySettings(getSettings());
    }

    window.KhotwaAccessibility = {
        getSettings: getSettings,
        saveSettings: saveSettings,
        applySettings: applySettings,
        speakText: speakText,
        stopSpeaking: stopSpeaking
    };

    document.addEventListener("DOMContentLoaded", function () {
        applySettings(getSettings());
        injectFloatingWidget();
    });
})();
