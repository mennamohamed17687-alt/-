/**
 * خُطوة – KHOTWA
 * طبقة إدارة وتخزين البيانات المركزية (Unified Data Store)
 * يدعم التخزين المحلي الدائم (LocalStorage) مع تكامل اختياري مع خوادم السحاب (Supabase Adapter)
 */

(function () {
    const STORAGE_KEYS = {
        PLACES: "khotwa_places_v1",
        FAVORITES: "khotwa_favorites_v1",
        REVIEWS: "khotwa_reviews_v1",
        SUGGESTIONS: "khotwa_suggestions_v1",
        REPORTS: "khotwa_reports_v1",
        USERS: "khotwa_users_v1",
        CURRENT_USER: "khotwa_current_user_v1",
        AUDIT_LOGS: "khotwa_audit_logs_v1",
        SETTINGS: "khotwa_accessibility_settings_v1"
    };

    // تهيئة البيانات الأولية عند أول تشغيل للمنصة
    function initStorage() {
        const initial = window.KHOTWA_INITIAL_DATA || {};

        if (!localStorage.getItem(STORAGE_KEYS.PLACES)) {
            localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(initial.places || []));
        }
        if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initial.reviews || []));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SUGGESTIONS)) {
            localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(initial.suggestions || []));
        }
        if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
            localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(initial.reports || []));
        }
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initial.users || []));
        }
        if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
            localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initial.auditLogs || []));
        }
        if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
            localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
        }
    }

    // حساب المسافة الجغرافية بالكيلومتر باستخدام صيغة Haversine
    function calculateDistanceKm(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;
        const R = 6371; // نصف قطر الأرض بالكيلومتر
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round((R * c) * 10) / 10;
    }

    const KhotwaStore = {
        init: initStorage,

        // جلب التصنيفات وميزات الإتاحة
        getCategories: function () {
            return (window.KHOTWA_INITIAL_DATA && window.KHOTWA_INITIAL_DATA.categories) || [];
        },

        getAccessibilityFeatures: function () {
            return (window.KHOTWA_INITIAL_DATA && window.KHOTWA_INITIAL_DATA.accessibilityFeatures) || {};
        },

        // العمليات على الأماكن
        getAllPlaces: function () {
            initStorage();
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEYS.PLACES)) || [];
            } catch (e) {
                console.error("خطأ في قراءة الأماكن", e);
                return [];
            }
        },

        getPlaceById: function (id) {
            if (!id) return null;
            const places = this.getAllPlaces();
            return places.find(p => p.id === id) || null;
        },

        searchPlaces: function (options = {}) {
            let places = this.getAllPlaces();
            const {
                query = "",
                category = "",
                governorate = "",
                city = "",
                needs = [], // قائمة بالاحتياجات المختارة مثل: ['mobility', 'visual', ...]
                specificFeatures = [], // ميزات دقيقة
                userLat = null,
                userLng = null,
                sortBy = "rating", // rating | proximity | recent | name
                verifiedOnly = false
            } = options;

            // حساب المسافة لكل مكان إذا تم تزويد الموقع
            if (userLat && userLng) {
                places = places.map(p => {
                    const dist = calculateDistanceKm(userLat, userLng, p.lat, p.lng);
                    return { ...p, distanceKm: dist };
                });
            }

            // تطبيق الفلاتر
            let filtered = places.filter(place => {
                // فلتر التحقق
                if (verifiedOnly && place.verificationStatus !== "verified") {
                    return false;
                }

                // فلتر التصنيف
                if (category && category !== "all" && place.category !== category) {
                    return false;
                }

                // فلتر المحافظة والمدينة
                if (governorate && governorate !== "all") {
                    if (!place.governorate.includes(governorate)) return false;
                }
                if (city && city.trim() !== "") {
                    const cityLower = city.trim().toLowerCase();
                    if (!place.city.toLowerCase().includes(cityLower) && !place.address.toLowerCase().includes(cityLower)) {
                        return false;
                    }
                }

                // فلتر كلمة البحث (الاسم، الوصف، العنوان)
                if (query && query.trim() !== "") {
                    const q = query.trim().toLowerCase();
                    const matchName = place.name.toLowerCase().includes(q) || (place.nameEn && place.nameEn.toLowerCase().includes(q));
                    const matchDesc = place.description && place.description.toLowerCase().includes(q);
                    const matchAddr = place.address && place.address.toLowerCase().includes(q);
                    const matchCat = place.categoryName && place.categoryName.toLowerCase().includes(q);
                    if (!matchName && !matchDesc && !matchAddr && !matchCat) {
                        return false;
                    }
                }

                // فلتر الإتاحة حسب نوع الإعاقة (متاح ومؤكد)
                if (needs && needs.length > 0) {
                    for (const need of needs) {
                        const needObj = place.accessibilityDetails && place.accessibilityDetails[need];
                        if (!needObj) return false;
                        // التحقق من وجود ميزة واحدة على الأقل متاحة
                        const hasAvailable = Object.values(needObj).some(f => f.status === "available");
                        if (!hasAvailable) return false;
                    }
                }

                // فلتر ميزات إتاحة معينة
                if (specificFeatures && specificFeatures.length > 0) {
                    for (const feat of specificFeatures) {
                        let featureFound = false;
                        if (place.accessibilityDetails) {
                            for (const nKey in place.accessibilityDetails) {
                                if (place.accessibilityDetails[nKey][feat] && place.accessibilityDetails[nKey][feat].status === "available") {
                                    featureFound = true;
                                    break;
                                }
                            }
                        }
                        if (!featureFound) return false;
                    }
                }

                return true;
            });

            // الترتيب
            if (sortBy === "proximity" && userLat && userLng) {
                filtered.sort((a, b) => (a.distanceKm || 9999) - (b.distanceKm || 9999));
            } else if (sortBy === "recent") {
                filtered.sort((a, b) => new Date(b.lastUpdated || "2020-01-01") - new Date(a.lastUpdated || "2020-01-01"));
            } else if (sortBy === "name") {
                filtered.sort((a, b) => a.name.localeCompare(b.name, "ar"));
            } else {
                // الافتراضي: التقييم الأعلى
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            }

            return filtered;
        },

        addPlace: function (newPlace) {
            initStorage();
            const places = this.getAllPlaces();
            const id = "plc-" + Date.now().toString().slice(-6);
            const place = {
                id: id,
                name: newPlace.name,
                nameEn: newPlace.nameEn || "",
                category: newPlace.category || "daily_services",
                categoryName: newPlace.categoryName || "خدمات عامة",
                governorate: newPlace.governorate || "القاهرة",
                city: newPlace.city || "",
                address: newPlace.address || "",
                lat: parseFloat(newPlace.lat) || 30.0444,
                lng: parseFloat(newPlace.lng) || 31.2357,
                phone: newPlace.phone || "",
                website: newPlace.website || "",
                workingHours: newPlace.workingHours || "مواعيد العمل الرسمية",
                description: newPlace.description || "",
                verificationStatus: newPlace.verificationStatus || "pending",
                verificationBadge: newPlace.verificationStatus === "verified" ? "موثق ومتحقق ميدانياً" : "قيد المراجعة والتدقيق",
                lastUpdated: new Date().toISOString().split("T")[0],
                source: newPlace.source || "مشاركة مستخدم منصة خُطوة",
                rating: 5.0,
                reviewsCount: 1,
                images: newPlace.images && newPlace.images.length > 0 ? newPlace.images : [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                ],
                accessibilityDetails: newPlace.accessibilityDetails || {
                    mobility: { ramps: { status: "available", note: "مدخل ممهد" } },
                    visual: { high_contrast: { status: "available", note: "لوحات واضحة" } },
                    hearing: { written_communication: { status: "available", note: "تواصل مكتوب" } }
                },
                services: newPlace.services || ["خدمات ميسرة"]
            };

            places.unshift(place);
            localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
            this.addAuditLog("إضافة مكان جديد", `تمت إضافة ${place.name} بنجاح.`);
            return place;
        },

        updatePlace: function (id, updatedFields) {
            initStorage();
            const places = this.getAllPlaces();
            const index = places.findIndex(p => p.id === id);
            if (index === -1) return null;

            places[index] = {
                ...places[index],
                ...updatedFields,
                lastUpdated: new Date().toISOString().split("T")[0]
            };

            localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
            this.addAuditLog("تحديث بيانات مكان", `تم تعديل بيانات: ${places[index].name} (${id})`);
            return places[index];
        },

        deletePlace: function (id) {
            initStorage();
            let places = this.getAllPlaces();
            const place = places.find(p => p.id === id);
            if (!place) return false;

            places = places.filter(p => p.id !== id);
            localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
            this.addAuditLog("حذف مكان", `تم حذف المكان: ${place.name} (${id})`);
            return true;
        },

        // إدارة المفضلة
        getFavorites: function () {
            initStorage();
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
            } catch (e) {
                return [];
            }
        },

        isFavorite: function (placeId) {
            const favs = this.getFavorites();
            return favs.includes(placeId);
        },

        toggleFavorite: function (placeId) {
            initStorage();
            let favs = this.getFavorites();
            let added = false;
            if (favs.includes(placeId)) {
                favs = favs.filter(id => id !== placeId);
                added = false;
            } else {
                favs.push(placeId);
                added = true;
            }
            localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
            return added;
        },

        getFavoritePlaces: function () {
            const favIds = this.getFavorites();
            const allPlaces = this.getAllPlaces();
            return allPlaces.filter(p => favIds.includes(p.id));
        },

        // إدارة التقييمات
        getReviewsForPlace: function (placeId) {
            initStorage();
            try {
                const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [];
                return reviews.filter(r => r.placeId === placeId);
            } catch (e) {
                return [];
            }
        },

        addReview: function (reviewData) {
            initStorage();
            const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [];
            const newRev = {
                id: "rev-" + Date.now().toString().slice(-6),
                placeId: reviewData.placeId,
                userName: reviewData.userName || "زائر للمنصة",
                userRole: reviewData.userRole || "مستخدم مهتم بالإتاحة",
                rating: parseInt(reviewData.rating, 10) || 5,
                date: new Date().toISOString().split("T")[0],
                comment: reviewData.comment || "",
                helpfulCount: 0
            };
            reviews.unshift(newRev);
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

            // تحديث متوسط تقييم المكان
            const place = this.getPlaceById(reviewData.placeId);
            if (place) {
                const placeReviews = reviews.filter(r => r.placeId === place.id);
                const avg = placeReviews.reduce((sum, r) => sum + r.rating, 0) / placeReviews.length;
                this.updatePlace(place.id, {
                    rating: Math.round(avg * 10) / 10,
                    reviewsCount: placeReviews.length
                });
            }

            return newRev;
        },

        // إدارة الاقتراحات (Suggest Place)
        getSuggestions: function () {
            initStorage();
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUGGESTIONS)) || [];
            } catch (e) {
                return [];
            }
        },

        addSuggestion: function (suggestion) {
            initStorage();
            const list = this.getSuggestions();
            const item = {
                id: "sug-" + Date.now().toString().slice(-6),
                name: suggestion.name,
                category: suggestion.category,
                governorate: suggestion.governorate || "القاهرة",
                city: suggestion.city || "",
                address: suggestion.address || "",
                phone: suggestion.phone || "",
                submittedBy: suggestion.submittedBy || "مستخدم المنصة",
                submitterEmail: suggestion.submitterEmail || "",
                submittedDate: new Date().toISOString().split("T")[0],
                status: "pending",
                notes: suggestion.notes || "",
                featuresSummary: suggestion.featuresSummary || "إتاحة مقترحة"
            };
            list.unshift(item);
            localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(list));
            return item;
        },

        approveSuggestion: function (suggestionId) {
            initStorage();
            const suggestions = this.getSuggestions();
            const sug = suggestions.find(s => s.id === suggestionId);
            if (!sug) return null;

            sug.status = "approved";
            localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(suggestions));

            // إضافة المكان إلى قائمة الأماكن النشطة
            const newPlace = this.addPlace({
                name: sug.name,
                category: sug.category,
                governorate: sug.governorate,
                city: sug.city,
                address: sug.address,
                phone: sug.phone,
                description: sug.notes || "مكان تم اقتراحه واعتماده من خلال مجتمع خُطوة.",
                verificationStatus: "verified",
                source: `اقتراح معتمد من (${sug.submittedBy})`
            });

            this.addAuditLog("اعتماد اقتراح مكان", `تمت الموافقة على اقتراح ${sug.name} ونشره كمعلم نشط.`);
            return newPlace;
        },

        rejectSuggestion: function (suggestionId, reason) {
            initStorage();
            const suggestions = this.getSuggestions();
            const sug = suggestions.find(s => s.id === suggestionId);
            if (!sug) return false;

            sug.status = "rejected";
            sug.rejectionReason = reason || "المعلومات غير مكتملة أو تعذر التحقق منها.";
            localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(suggestions));
            this.addAuditLog("رفض اقتراح مكان", `تم رفض اقتراح ${sug.name} لسبب: ${sug.rejectionReason}`);
            return true;
        },

        // إدارة البلاغات (Reports)
        getReports: function () {
            initStorage();
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS)) || [];
            } catch (e) {
                return [];
            }
        },

        addReport: function (report) {
            initStorage();
            const reports = this.getReports();
            const item = {
                id: "rep-" + Date.now().toString().slice(-6),
                placeId: report.placeId || "",
                placeName: report.placeName || "مكان عام",
                reportType: report.reportType || "بيانات غير دقيقة",
                details: report.details || "",
                reporterName: report.reporterName || "مستخدم مجهول",
                reporterEmail: report.reporterEmail || "",
                submittedDate: new Date().toISOString().split("T")[0],
                status: "pending"
            };
            reports.unshift(item);
            localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
            return item;
        },

        resolveReport: function (reportId) {
            initStorage();
            const reports = this.getReports();
            const rep = reports.find(r => r.id === reportId);
            if (!rep) return false;

            rep.status = "resolved";
            rep.resolvedAt = new Date().toISOString().split("T")[0];
            localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
            this.addAuditLog("حل بلاغ مستخدم", `تمت معالجة وتحديث البلاغ رقم ${reportId} الخاص بـ (${rep.placeName}).`);
            return true;
        },

        // سجل العمليات الإدارية (Audit Logs)
        getAuditLogs: function () {
            initStorage();
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) || [];
            } catch (e) {
                return [];
            }
        },

        addAuditLog: function (action, details) {
            initStorage();
            const logs = this.getAuditLogs();
            const currentUser = (window.KhotwaAuth && window.KhotwaAuth.getCurrentUser()) || { name: "النظام", email: "system" };
            const item = {
                id: "log-" + Date.now().toString().slice(-6),
                timestamp: new Date().toLocaleString("ar-EG"),
                actor: `${currentUser.name} (${currentUser.email})`,
                action: action,
                details: details
            };
            logs.unshift(item);
            // الاحتفاظ بآخر 100 عملية
            if (logs.length > 100) logs.pop();
            localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
        },

        // إحصائيات عامة للمنصة ولوحة الإدارة
        getStats: function () {
            initStorage();
            const places = this.getAllPlaces();
            const suggestions = this.getSuggestions();
            const reports = this.getReports();
            const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
            const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || "[]");

            return {
                totalPlaces: places.length,
                publishedPlaces: places.filter(p => p.verificationStatus === "verified").length,
                pendingPlaces: places.filter(p => p.verificationStatus === "pending").length,
                pendingSuggestions: suggestions.filter(s => s.status === "pending").length,
                pendingReports: reports.filter(r => r.status === "pending").length,
                totalUsers: users.length,
                totalReviews: reviews.length
            };
        }
    };

    // إتاحة الكائن عالمياً
    window.KhotwaStore = KhotwaStore;
    KhotwaStore.init();
})();
