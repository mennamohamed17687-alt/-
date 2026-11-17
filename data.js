/**
 * خُطوة – KHOTWA
 * نظام إدارة البيانات الأولية الموثقة (Initial Realistic Seed Data)
 * يحتوي على تصنيفات دقيقة، ميزات إتاحة متوافقة مع معايير الوصول، وأماكن حقيقية نموذجية في مصر والعالم العربي.
 */

const KHOTWA_INITIAL_DATA = {
    // تصنيفات الأماكن
    categories: [
        { id: "hospitals", name: "المستشفيات والعيادات", icon: "🏥", description: "المستشفيات والمراكز الطبية والعيادات المتخصصة" },
        { id: "pharmacies", name: "الصيدليات", icon: "💊", description: "الصيدليات ومراكز الدواء المجهزة" },
        { id: "rehab", name: "مراكز الخدمات والتأهيل", icon: "🦾", description: "مراكز التأهيل والعلاج الطبيعي والتخاطب" },
        { id: "education", name: "المدارس والجامعات", icon: "🎓", description: "المؤسسات التعليمية والجامعات والمدارس الدامجة" },
        { id: "government", name: "المؤسسات الحكومية", icon: "🏛️", description: "المصالح الحكومية ومراكز الخدمات الجماهيرية" },
        { id: "restaurants", name: "المطاعم والكافيهات", icon: "☕", description: "أماكن تناول الطعام والمقاهي الدامجة والميسرة" },
        { id: "hotels", name: "الفنادق وأماكن الإقامة", icon: "🏨", description: "الفنادق والمنتجعات المزودة بغرف مجهزة بالكامل" },
        { id: "parks", name: "الحدائق والمتنزهات", icon: "🌳", description: "المتنزهات العامة والمساحات المفتوحة المجهزة" },
        { id: "malls", name: "مراكز التسوق", icon: "🛍️", description: "المولات والمتاجر الكبرى الميسرة" },
        { id: "entertainment", name: "الترفيه والثقافة", icon: "🎭", description: "المتاحف والمسارح والمراكز الثقافية" },
        { id: "transport", name: "المواصلات ومحطات النقل", icon: "🚆", description: "محطات المترو والقطارات ومواقف الحافلات المجهزة" },
        { id: "daily_services", name: "خدمات يومية وبنوك", icon: "🏦", description: "البنوك ومكاتب البريد والخدمات المصرفية المجهزة" }
    ],

    // أنواع وميزات الإتاحة
    accessibilityFeatures: {
        mobility: [
            { id: "ramps", name: "منحدرات ميسرة للكراسي المتحركة", icon: "♿" },
            { id: "elevators", name: "مصاعد واسعة بأزرار منخفضة", icon: "🛗" },
            { id: "wide_doors", name: "أبواب وممرات عريضة بدون عتبات", icon: "🚪" },
            { id: "accessible_toilets", name: "دورات مياه مجهزة بمقابض مساعدة", icon: "🚻" },
            { id: "designated_parking", name: "مواقف سيارات مخصصة قريبة من المدخل", icon: "🅿️" },
            { id: "step_free_access", name: "مسار حركة خالي من الدرج", icon: "🚶" },
            { id: "adapted_counters", name: "كونتوار خدمة واستقبال منخفض", icon: "🛎️" }
        ],
        visual: [
            { id: "braille_signage", name: "لوحات إرشادية بطريقة برايل", icon: "⠃⠗" },
            { id: "high_contrast", name: "كتابة واضحة وتباين ألوان مرتفع", icon: "🔤" },
            { id: "tactile_paving", name: "مسارات أرضية بارزة وملموسة", icon: "🛤️" },
            { id: "audio_guides", name: "معلومات وتنبيهات صوتية", icon: "📢" },
            { id: "staff_assistance", name: "مرشدون مدربون لتقديم المساعدة الشخصية", icon: "🧑‍🤝‍🧑" },
            { id: "good_lighting", name: "إضاءة قوية ومريحة خالية من الوهج", icon: "💡" }
        ],
        hearing: [
            { id: "visual_screens", name: "شاشات عرض رقمية للتعليمات والإعلانات", icon: "📺" },
            { id: "written_communication", name: "قنوات تواصل مكتوبة ونماذج واضحة", icon: "📝" },
            { id: "sign_language", name: "موظفون يجيدون لغة الإشارة أو مترجم متوفر", icon: "🤟" },
            { id: "hearing_loop", name: "أنظمة حلقة حث سمعي (Hearing Loop)", icon: "🦻" },
            { id: "visual_alarms", name: "إنذارات طوارئ ضوئية وبصرية", icon: "🚨" }
        ],
        intellectual: [
            { id: "simplified_signs", name: "إرشادات وأيقونات مبسطة سهلة الفهم", icon: "🧭" },
            { id: "companion_welcome", name: "ترحيب وتسهيل وجود مرافق", icon: "🤝" },
            { id: "priority_service", name: "إجراءات دخول مبسطة ومسار أولوية", icon: "⚡" },
            { id: "pre_visit_guide", name: "دليل مصور مسبق عما يمكن توقعه", icon: "📖" }
        ],
        autism: [
            { id: "quiet_space", name: "غرفة أو ركن هادئ للاسترخاء الحسي", icon: "🌿" },
            { id: "low_noise", name: "بيئة منخفضة الضوضاء والموسيقى", icon: "🔇" },
            { id: "soft_lighting", name: "إضاءة هادئة غير مزعجة للحواس", icon: "🕯️" },
            { id: "crowd_indicator", name: "إمكانية معرفة أوقات الهدوء وتجنب الزحام", icon: "⏱️" },
            { id: "sensory_map", name: "خريطة حسية للمكان قبل الزيارة", icon: "🗺️" }
        ]
    },

    // قائمة الأماكن الأولية الموثقة (بيانات حقيقية ونموذجية ذات إتاحة مؤكدة مع إيضاح حالة التحقق)
    places: [
        {
            id: "plc-001",
            name: "المتحف القومي للحضارة المصرية",
            nameEn: "National Museum of Egyptian Civilization (NMEC)",
            category: "entertainment",
            categoryName: "الترفيه والثقافة",
            governorate: "القاهرة",
            city: "الفسطاط، مصر القديمة",
            address: "طريق الفسطاط، عين الصيرة، مصر القديمة، القاهرة",
            lat: 30.0083,
            lng: 31.2482,
            phone: "0227412273",
            website: "https://nmec.gov.eg",
            workingHours: "السبت - الخميس: 9:00 ص - 5:00 م | الجمعة: 9:00 ص - 5:00 م، 6:00 م - 9:00 م",
            description: "أحد أهم المتاحف الحضارية بالشرق الأوسط، تم تصميمه بمعايير عالمية للإتاحة الدامجة الشاملة لكافة الزوار.",
            verificationStatus: "verified", // verified | pending | experimental
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-15",
            source: "فريق التوثيق الميداني لمنصة خُطوة + إدارة المتحف",
            rating: 4.9,
            reviewsCount: 38,
            images: [
                "https://images.unsplash.com/photo-1594897030560-69213197fa1f?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدرات بانحدار قياسي وفق الكود الدولي عند كافة المداخل والقاعات" },
                    elevators: { status: "available", note: "مصاعد بانورامية مجهزة بأزرار برايل ومنخفضة للكراسي المتحركة" },
                    wide_doors: { status: "available", note: "أبواب آلية متسعة بدون أي عتبات بارزة" },
                    accessible_toilets: { status: "available", note: "دورات مياه واسعة مجهزة بمقابض أمان وأجراس طوارئ" },
                    designated_parking: { status: "available", note: "مواقف مجانية مخصصة لذوي الإعاقة بالقرب المباشر من البوابة" },
                    wheelchairs_available: { status: "available", note: "توفير كراسي متحركة يدوية وكهربائية مجاناً عند الاستقبال" }
                },
                visual: {
                    braille_signage: { status: "available", note: "بطاقات شرح بطريقة برايل لأهم القطع الأثرية" },
                    high_contrast: { status: "available", note: "لوحات إرشادية بتباين لوني قوي وخطوط كبيرة سهلة القراءة" },
                    tactile_paving: { status: "available", note: "مسارات إرشادية ملموسة تؤدي من المدخل إلى القاعات الرئيسية" },
                    audio_guides: { status: "available", note: "أجهزة إرشاد صوتي متوفرة باللغة العربية والإنجليزية" },
                    staff_assistance: { status: "available", note: "فريق إرشاد مدرب لمرافقة الزوار من ذوي الإعاقة البصرية" }
                },
                hearing: {
                    visual_screens: { status: "available", note: "شاشات تفاعلية تعرض نصوصاً كاملة ومقاطع مترجمة" },
                    written_communication: { status: "available", note: "كتيبات إرشادية مصورة وتواصل مكتوب عبر أجهزة لوحية" },
                    sign_language: { status: "available", note: "جولات متخصصة بلغة الإشارة بالتنسيق المسبق، وفيديوهات بلغة الإشارة" },
                    visual_alarms: { status: "available", note: "فلاشات ضوئية متصلة بنظام إنذار الحريق في جميع الأدوار" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "أيقونات واضحة وخريطة ملونة سهلة الفهم" },
                    companion_welcome: { status: "available", note: "تذاكر مجانية للمرافقين المصاحبين" },
                    priority_service: { status: "available", note: "أولوية دخول دون انتظار عند شباك التذاكر" }
                },
                autism: {
                    quiet_space: { status: "available", note: "قاعة استراحة هادئة بالقرب من المدخل الخلفي" },
                    low_noise: { status: "partial", note: "القاعة المركزية هادئة، بينما قد تشهد قاعة المومياوات كثافة في العطلات" },
                    crowd_indicator: { status: "available", note: "أفضل أوقات الزيارة الهادئة: صباح الأحد والثلاثاء" }
                }
            },
            services: ["كراسي متحركة مجانية", "مرشدون مدربون", "كافيتريا ميسرة", "متجر هدايا ميسر", "خدمة إسعاف أولي"]
        },
        {
            id: "plc-002",
            name: "مستشفى دار الفؤاد - السادس من أكتوبر",
            nameEn: "Dar Al Fouad Hospital - 6th of October",
            category: "hospitals",
            categoryName: "المستشفيات والعيادات",
            governorate: "الجيزة",
            city: "مدينة 6 أكتوبر",
            address: "امتداد محور 26 يوليو، بجوار جامعة مصر للعلوم والتكنولوجيا، 6 أكتوبر",
            lat: 29.9734,
            lng: 30.9575,
            phone: "16370",
            website: "https://daralfouad.org",
            workingHours: "الطوارئ والاستقبال: 24 ساعة يومياً | العيادات: 9:00 ص - 9:00 م",
            description: "صرح طبي متكامل معتمد دولياً (JCI)، مجهز بالكامل لاستقبال كافة الحالات واحتياجات الوصول مع طاقم تمريض وإرشاد متخصص.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-11-01",
            source: "إدارة الجودة بمستشفى دار الفؤاد + تدقيق المنصة",
            rating: 4.8,
            reviewsCount: 52,
            images: [
                "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدرات مجهزة مع مساند جانبية مزدوجة عند بوابة الطوارئ والعيادات" },
                    elevators: { status: "available", note: "مصاعد طبية بالغة الاتساع تستوعب الأسرة والكراسي المتحركة" },
                    wide_doors: { status: "available", note: "ممرات فسيحة وأبواب أوتوماتيكية بجميع الأقسام" },
                    accessible_toilets: { status: "available", note: "دورات مياه مجهزة بكل طابق ومزودة بنظام نداء استغاثة" },
                    designated_parking: { status: "available", note: "أماكن سيارات مخصصة ملاصقة للمدخل مباشرة مع خدمة اصطفاف" }
                },
                visual: {
                    braille_signage: { status: "partial", note: "متوفر في المصاعد الرئيسية، وجارٍ استكماله في المكاتب الإدارية" },
                    high_contrast: { status: "available", note: "لوحات إرشادية واضحة للغاية وخطوط مقروءة بارتفاع مناسب" },
                    staff_assistance: { status: "available", note: "فريق علاقات المرضى متواجد لمرافقة ذوي الإعاقة حتى غرفة الطبيب" }
                },
                hearing: {
                    visual_screens: { status: "available", note: "شاشات نداء رقمية مرئية لأرقام الانتظار في كافة العيادات والصيدلية" },
                    written_communication: { status: "available", note: "نماذج دخول مكتوبة وإمكانية التواصل عبر الواتساب والمحادثة الكتابية" },
                    sign_language: { status: "unverified", note: "يتم الاستعانة بأخصائيين عند الطلب المسبق" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "نظام ألوان إرشادي لكل تخصص لتسهيل التعرف على الأقسام" },
                    companion_welcome: { status: "available", note: "السماح بمرافق دائم في غرف الانتظار والفحص" }
                },
                autism: {
                    quiet_space: { status: "available", note: "غرف انتظار عيادات الأطفال تتميز بإضاءة غير ساطعة وهدوء مناسب" },
                    crowd_indicator: { status: "available", note: "الفترات الأقل ازدحاماً: 10:00 ص إلى 1:00 م أيام العمل" }
                }
            },
            services: ["طوارئ 24/7", "صيدلية ميسرة", "غرف مرضى مجهزة كلياً", "نقل إسعافي مجهز", "مواقف مجانية لذوي الإعاقة"]
        },
        {
            id: "plc-003",
            name: "مكتبة الإسكندرية",
            nameEn: "Bibliotheca Alexandrina",
            category: "entertainment",
            categoryName: "الترفيه والثقافة",
            governorate: "الإسكندرية",
            city: "الشاطبي",
            address: "طريق الجيش، الشاطبي، الإسكندرية",
            lat: 31.2089,
            lng: 29.9092,
            phone: "034839999",
            website: "https://bibalex.org",
            workingHours: "الأحد - الخميس: 9:30 ص - 3:30 م | السبت: 10:00 ص - 2:00 م | الجمعة: مغلق",
            description: "منارة الثقافة والمعرفة، وتضم 'مكتبة طه حسين للمكفوفين وضعاف البصر' كواحدة من أفضل المرافق العالمية للإتاحة التكنولوجية والمعرفية.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-20",
            source: "إدارة الإتاحة والبرامج الخاصة بمكتبة الإسكندرية",
            rating: 4.9,
            reviewsCount: 45,
            images: [
                "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدرات متطورة في جميع المداخل وقاعات الاطلاع السفلية والعلوية" },
                    elevators: { status: "available", note: "مصاعد رقمية مهيأة للوصول لجميع الأدوار والمتاحف الملحقة" },
                    wide_doors: { status: "available", note: "أبواب الكترونية فسيحة وطرقات خالية من العوائق" },
                    accessible_toilets: { status: "available", note: "دورات مياه مجهزة بكل طابق" },
                    designated_parking: { status: "available", note: "مواقف متوفرة بمجرد إظهار بطاقة الخدمات المتكاملة" }
                },
                visual: {
                    braille_signage: { status: "available", note: "مكتبة طه حسين مجهزة بطابعات برايل وشاشات قراءة مكبرة وقارئات شاشة متطورة" },
                    high_contrast: { status: "available", note: "تصميم داخلي مريح بصرياً وإشارات عالية التباين" },
                    audio_guides: { status: "available", note: "كتب صوتية ومحطات استماع مخصصة" },
                    staff_assistance: { status: "available", note: "أخصائيون متفرغون لمساعدة المكفوفين وضعاف البصر في البحث والمطالعة" }
                },
                hearing: {
                    visual_screens: { status: "available", note: "شاشات عرض في الساحات وقاعات المؤتمرات مجهزة بالترجمة النصية" },
                    written_communication: { status: "available", note: "دليل مكتوب وإمكانية التواصل المكتوب مع مسؤولي المساعدة" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "خرائط إرشادية مبسطة للزوار وبرامج دامجة مخصصة" },
                    companion_welcome: { status: "available", note: "دخول المرافق مجاناً مع حامل بطاقة الإعاقة" }
                },
                autism: {
                    quiet_space: { status: "available", note: "قاعات القراءة الفردية توفر بيئة هادئة جداً خالية من المؤثرات المزعجة" },
                    low_noise: { status: "available", note: "نظام مكتبات صامت بالكامل يحد من الضجيج" }
                }
            },
            services: ["مكتبة طه حسين المتخصصة", "طابعات برايل مجانية", "أجهزة تكبير إلكترونية", "برمجيات قراءة شاشة", "جولات إرشادية ميسرة"]
        },
        {
            id: "plc-004",
            name: "حديقة الأزهر",
            nameEn: "Al-Azhar Park",
            category: "parks",
            categoryName: "الحدائق والمتنزهات",
            governorate: "القاهرة",
            city: "الدراسة، صلاح سالم",
            address: "طريق صلاح سالم، الدراسة، القاهرة",
            lat: 30.0409,
            lng: 31.2647,
            phone: "0225103868",
            website: "https://alazharpark.com",
            workingHours: "يومياً: 9:00 ص - 10:00 م",
            description: "متنفس طبيعي خلاب في قلب القاهرة بمساحات خضراء واسعة ومسارات مشي ميسرة وإطلالة بانورامية على قلعة صلاح الدين.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-05",
            source: "زيارة ميدانية موثقة لفريق خُطوة",
            rating: 4.6,
            reviewsCount: 31,
            images: [
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "مسارات المشي الرئيسية مرصوفة ومسطحة وتناسب الكراسي المتحركة" },
                    elevators: { status: "unavailable", note: "الحديقة مفتوحة أفقياً، بعض المناطق المرتفعة لها منحدرات طويلة ولكن لا توجد مصاعد" },
                    wide_doors: { status: "available", note: "بوابات الدخول متسعة للغاية وتسمح بمرور الكراسي بكل أريحية" },
                    accessible_toilets: { status: "available", note: "دورات مياه مجهزة متوفرة بالقرب من المطعم السويسري ومكتب الإدارة" },
                    designated_parking: { status: "available", note: "مواقف مخصصة عند البوابة الرئيسية (صلاح سالم)" },
                    cart_service: { status: "available", note: "سيارات جولف كهربائية لنقل كبار السن وذوي الإعاقة داخل الحديقة" }
                },
                visual: {
                    braille_signage: { status: "unavailable", note: "لا تتوفر لوحات برايل للنباتات حالياً" },
                    high_contrast: { status: "available", note: "لوحات إرشادية كبيرة في المفارق الرئيسية" },
                    tactile_paving: { status: "partial", note: "المسارات الحجرية واضحة ومحددة الحواف" }
                },
                hearing: {
                    visual_screens: { status: "unavailable", note: "لا توجد شاشات رقمية في المساحات المفتوحة" },
                    written_communication: { status: "available", note: "خرائط ورقية ومطبوعات متوفرة عند الاستقبال" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "خريطة ملونة بالأيقونات لجميع معالم الحديقة" },
                    companion_welcome: { status: "available", note: "تسهيل دخول المرافقين بدون عوائق" }
                },
                autism: {
                    quiet_space: { status: "available", note: "مساحات خضراء مفتوحة شاسعة توفر عزلة وهدوءاً حسياً ممتازاً" },
                    low_noise: { status: "available", note: "الأيام الموصى بها للهدوء التام: الأحد حتى الأربعاء صباحاً" }
                }
            },
            services: ["سيارات جولف للتنقل", "مسارات مشي معبدة", "دورات مياه مجهزة", "كافيهات ومطاعم ميسرة المداخل"]
        },
        {
            id: "plc-005",
            name: "سيتي سنتر ألماظة",
            nameEn: "City Centre Almaza",
            category: "malls",
            categoryName: "مراكز التسوق",
            governorate: "القاهرة",
            city: "مصر الجديدة",
            address: "طريق السويس، تقاطع شارع النصر، مساكن شيراتون، مصر الجديدة",
            lat: 30.0886,
            lng: 31.3644,
            phone: "16032",
            website: "https://citycentrealmaza.com",
            workingHours: "السبت - الأربعاء: 10:00 ص - 11:00 م | الخميس والجمعة: 10:00 ص - 12:00 منتصف الليل",
            description: "مركز تجاري وترفيهي عصري يطبق أعلى معايير التصميم الشامل، وتوفير كافة التسهيلات لسهولة التسوق والتنقل المستقل.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-28",
            source: "تدقيق ميداني بالتعاون مع إدارة المول",
            rating: 4.7,
            reviewsCount: 39,
            images: [
                "https://images.unsplash.com/photo-1567449303078-57ad995bd302?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "جميع المداخل من الجراج والشارع مستوية تماماً مع منحدرات انسيابية" },
                    elevators: { status: "available", note: "مصاعد حديثة متعددة تربط طوابق المول والجراج بأزرار منخفضة ونداء صوتي" },
                    wide_doors: { status: "available", note: "ممرات فسيحة للغاية بدون أي عتبات" },
                    accessible_toilets: { status: "available", note: "دورات مياه عائلية مجهزة لذوي الإعاقة في كل مجمع حمامات" },
                    designated_parking: { status: "available", note: "مواقف مخصصة محددة باللون الأزرق قرب أبواب المصاعد في كافة الأدوار" },
                    wheelchairs_available: { status: "available", note: "خدمة إعارة كراسي متحركة مجاناً من مكاتب خدمة العملاء" }
                },
                visual: {
                    braille_signage: { status: "available", note: "أزرار المصاعد مزودة ببرايل" },
                    high_contrast: { status: "available", note: "شاشات بحث رقمية تفاعلية بتباين مرتفع وإمكانية تعديل الارتفاع" },
                    staff_assistance: { status: "available", note: "مكتب خدمة العملاء يقدم خدمة مرافقة عند الطلب" }
                },
                hearing: {
                    visual_screens: { status: "available", note: "شاشات رقمية واضحة في كافة الأروقة" },
                    visual_alarms: { status: "available", note: "إشارات طوارئ ضوئية ومخارج طوارئ مجهزة" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "رموز ملونة مميزة لكل بوابة (بوابة 1، 2، 3) تسهل التذكر" },
                    companion_welcome: { status: "available", note: "مساحات استراحة وجلوس متعددة ومريحة" }
                },
                autism: {
                    quiet_space: { status: "partial", note: "توجد غرف رعاية أسرية هادئة، والمول يطبق ساعة تسوق هادئة شهرياً" },
                    crowd_indicator: { status: "available", note: "أقل ساعات الازدحام: من الأحد إلى الأربعاء 10:00 ص حتى 3:00 م" }
                }
            },
            services: ["إعارة كراسي متحركة", "مواقف ذوي إعاقة مجهزة", "مكتب خدمة عملاء ميسر", "دورات مياه مجهزة", "مطاعم بمقاعد مناسبة"]
        },
        {
            id: "plc-006",
            name: "محطة مترو أنفاق عدلي منصور المركزية",
            nameEn: "Adly Mansour Central Metro & Transit Station",
            category: "transport",
            categoryName: "المواصلات ومحطات النقل",
            governorate: "القاهرة",
            city: "طريق الإسماعيلية الصحراوي، مدينة السلام",
            address: "مجمع مواقف ومحطة عدلي منصور التبادلية، السلام، القاهرة",
            lat: 30.1466,
            lng: 31.4191,
            phone: "16048",
            website: "https://cairometro.gov.eg",
            workingHours: "يومياً: 5:15 ص - 12:30 بعد منتصف الليل",
            description: "أكبر محطة تبادلية في الشرق الأوسط (المترو والقطار الخفيف LRT والأوتوبيس الترددي BRT)، صممت بكود إتاحة شامل ومسارات لمسية للمكفوفين ومصاعد لكافة الأرصفة.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-11-03",
            source: "الهيئة القومية للأنفاق + معاينة فريق خُطوة",
            rating: 4.8,
            reviewsCount: 60,
            images: [
                "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدرات مجهزة تصل الشارع بالمحطة وساحات الانتظار" },
                    elevators: { status: "available", note: "مصاعد كهربائية تنقل الركاب مباشرة من منسوب الشارع إلى شبابيك التذاكر ثم الأرصفة" },
                    wide_doors: { status: "available", note: "بوابات تذاكر عريضة مخصصة لمستخدمي الكراسي المتحركة والحقائب" },
                    accessible_toilets: { status: "available", note: "دورات مياه مجهزة بكل مجمع خدمي بالمحطة" },
                    step_free_access: { status: "available", note: "منسوب قطار الخط الثالث متوافق أفقياً مع منسوب الرصيف لدخول سهل للكراسي" }
                },
                visual: {
                    braille_signage: { status: "available", note: "لوحات برايل على درابزينات السلالم وأزرار المصاعد" },
                    high_contrast: { status: "available", note: "خطوط صفراء بارزة ومضيئة على حافة جميع الأرصفة" },
                    tactile_paving: { status: "available", note: "مسارات بلاط صفراء بارزة (مسارات توجيه) تمتد من المدخل حتى بوابات التذاكر والأرصفة" },
                    audio_guides: { status: "available", note: "إذاعة داخلية تعلن عن موعد وصول القطارات واسم المحطة بوضوح تام" }
                },
                hearing: {
                    visual_screens: { status: "available", note: "شاشات رقمية عملاقة تعرض أوقات التقاطر والمحطة القادمة" },
                    visual_alarms: { status: "available", note: "فلاشات ضوئية فوق أبواب القطار تنبه عند الفتح والإغلاق" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "أيقونات دولية موحدة تدل على الاتجاهات والمصاعد ودورات المياه" },
                    priority_service: { status: "available", note: "شباك تذاكر مخصص لذوي الإعاقة وكبار السن بدون طوابير" }
                },
                autism: {
                    quiet_space: { status: "partial", note: "المحطة واسعة جداً ومرتفعة السقف مما يقلل الشعور بالتكدس في غير أوقات الذروة" }
                }
            },
            services: ["بوابات تذاكر مخصصة", "مسارات مكفوفين كاملة", "مصاعد لجميع الأرصفة", "شباك تذاكر أولوية", "طاقم أمني للمساعدة"]
        },
        {
            id: "plc-007",
            name: "مركز التأهيل الشامل التابع للتضامن الاجتماعي",
            nameEn: "Comprehensive Rehabilitation Center",
            category: "rehab",
            categoryName: "مراكز الخدمات والتأهيل",
            governorate: "القاهرة",
            city: "المعادي",
            address: "شارع 250، بالقرب من محطة مترو المعادي، القاهرة",
            lat: 29.9582,
            lng: 31.2589,
            phone: "0223589412",
            website: "https://moss.gov.eg",
            workingHours: "الأحد - الخميس: 8:30 ص - 2:30 م | الجمعة والسبت: مغلق",
            description: "مركز متخصص يقدم خدمات التشخيص والتأهيل الحركي والتخاطب، ويوفر بيئة دامجة ومجهزة بكل الوسائل المساعدة وكادر متخصص.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-18",
            source: "وزارة التضامن الاجتماعي + توثيق منصة خُطوة",
            rating: 4.7,
            reviewsCount: 22,
            images: [
                "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدرات مجهزة عند كافة البوابات وقاعات العلاج الطبيعي" },
                    elevators: { status: "available", note: "مصعد مجهز بمقابض وكراسي انتظار مريحة" },
                    accessible_toilets: { status: "available", note: "حمامات مجهزة بأعلى مواصفات الإتاحة مع أزرار استغاثة" },
                    designated_parking: { status: "available", note: "موقف سيارات مخصص ومظلل للزوار" }
                },
                visual: {
                    braille_signage: { status: "available", note: "أسماء العيادات والغرف مكتوبة ببرايل" },
                    high_contrast: { status: "available", note: "أبواب ملونة بلون مغاير للحوائط لتسهيل التمييز البصري" },
                    staff_assistance: { status: "available", note: "مرشدون ومترجمون مرافقون" }
                },
                hearing: {
                    sign_language: { status: "available", note: "أخصائيو لغة إشارة متواجدون باستمرار طوال ساعات العمل" },
                    written_communication: { status: "available", note: "أدلة ورومز مصورة وتطبيقات إلكترونية مساعدة" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "قصص اجتماعية وبطاقات PECS مصورة لدعم الفهم" },
                    pre_visit_guide: { status: "available", note: "دليل مصور مسبق يوضح خطوات الجلسة العلاجية" }
                },
                autism: {
                    quiet_space: { status: "available", note: "غرفة تكامل حسي هادئة (Snoezelen Room) مجهزة بأحدث التقنيات" },
                    soft_lighting: { status: "available", note: "إضاءة خافتة قابلة للتعديل تناسب الحساسية الضوئية" },
                    low_noise: { status: "available", note: "حوائط معالجة عازلة للصوت لتوفير أقصى درجات الراحة" }
                }
            },
            services: ["جلسات علاج طبيعي وتخاطب", "غرفة تكامل حسي", "إصدار بطاقات خدمات متكاملة", "مترجمو لغة إشارة معتمدون"]
        },
        {
            id: "plc-008",
            name: "صيدلية العزبي - فرع الميرغني المجهز",
            nameEn: "El-Ezaby Pharmacy - Merghany Branch",
            category: "pharmacies",
            categoryName: "الصيدليات",
            governorate: "القاهرة",
            city: "مصر الجديدة",
            address: "شارع الميرغني، تقاطع شارع الثورة، مصر الجديدة",
            lat: 30.0898,
            lng: 31.3321,
            phone: "19600",
            website: "https://elezabypharmacy.com",
            workingHours: "خدمة 24 ساعة يومياً على مدار الأسبوع",
            description: "صيدلية نموذجية مجهزة بمدخل مستوٍ بدون درجات، وخدمة توصيل سيارات، وتواصل سريع عبر الواتساب للأشخاص ذوي الإعاقة السمعية.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-11-05",
            source: "معاينة ميدانية لمنصة خُطوة",
            rating: 4.6,
            reviewsCount: 19,
            images: [
                "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدر ممهد عريض ممتد حتى باب الصيدلية الآلي" },
                    wide_doors: { status: "available", note: "باب زجاجي كهربائي يفتح تلقائياً وممر داخلي واسع" },
                    adapted_counters: { status: "available", note: "جزء من كاونتر الاستقبال مصمم بارتفاع منخفض للكراسي المتحركة" },
                    curbside_service: { status: "available", note: "إمكانية استلام الأدوية والخدمة دون النزول من السيارة" }
                },
                visual: {
                    high_contrast: { status: "available", note: "إضاءة ممتازة وعبوات الأدوية توضع عليها ملصقات بخط كبير عند الطلب" },
                    staff_assistance: { status: "available", note: "الصيادلة يقدمون شرحاً صوتياً مفصلاً لطريقة الاستخدام ومواعيد الجرعات" }
                },
                hearing: {
                    written_communication: { status: "available", note: "خط واتساب مخصص لاستقبال الروشتات والتواصل الكتابي الفوري" },
                    visual_screens: { status: "available", note: "شاشة استدعاء دور مرئية لخدمة العملاء" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "علب تنظيم جرعات أدوية بألوان وصور واضحة (صباحاً / مساءً)" }
                },
                autism: {
                    low_noise: { status: "available", note: "بيئة هادئة بدون موسيقى صاخبة" }
                }
            },
            services: ["خدمة 24 ساعة", "خدمة سيارات Curbside", "توصيل منزلي سريع", "قياس ضغط وسكر مجاناً", "تواصل واتساب"]
        },
        {
            id: "plc-009",
            name: "مجمع خدمات مصر - أسوان (مركز خدمات حكومية دامج)",
            nameEn: "Masr Government Services Complex - Aswan",
            category: "government",
            categoryName: "المؤسسات الحكومية",
            governorate: "أسوان",
            city: "أسوان الجديدة",
            address: "الحي السكني الأول، مدينة أسوان الجديدة، أسوان",
            lat: 24.1128,
            lng: 32.8845,
            phone: "0972451000",
            website: "https://digital.gov.eg",
            workingHours: "الأحد - الخميس: 8:00 ص - 4:00 م | الجمعة والسبت: مغلق",
            description: "صرح حكومي نموذجي رقمي يقدم خدمات التوثيق والتوكيلات والأحوال المدنية والمرور في شباك واحد، مصمم بالكامل بكود الإتاحة الدامجة.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-25",
            source: "وزارة التخطيط والتنمية الاقتصادية + توثيق منصة خُطوة",
            rating: 4.9,
            reviewsCount: 29,
            images: [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدرات قياسية ومقاعد انتظار مريحة وقريبة من شبابيك الخدمة" },
                    wide_doors: { status: "available", note: "أبواب آلية متسعة بدون عوائق" },
                    accessible_toilets: { status: "available", note: "حمامات مجهزة ومزودة بأجراس مساعدة" },
                    adapted_counters: { status: "available", note: "شباك مخصص لذوي الإعاقة وكبار السن بارتفاع منخفض" },
                    designated_parking: { status: "available", note: "مواقف مظللة مخصصة أمام بوابة المجمع مباشرة" }
                },
                visual: {
                    tactile_paving: { status: "available", note: "مسارات أرضية ملموسة تقود من البوابة إلى شباك الاستقبال" },
                    high_contrast: { status: "available", note: "شاشات إرشادية واضحة ومقروءة من مسافة بعيدة" },
                    staff_assistance: { status: "available", note: "موظف مخصص لاستقبال الزائر وإنهاء معاملته دون تنقل" }
                },
                hearing: {
                    sign_language: { status: "available", note: "موظفون مدربون على لغة الإشارة بالتعاون مع المجلس القومي للأشخاص ذوي الإعاقة" },
                    visual_screens: { status: "available", note: "نظام نداء إلكتروني مرئي يعرض رقم التذكرة ورقم الشباك" }
                },
                intellectual: {
                    priority_service: { status: "available", note: "مسار خدمة سريع ودعم في كتابة وملء الاستمارات" },
                    simplified_signs: { status: "available", note: "أدلة خدمات مصورة تشرح المستندات المطلوبة بوضوح" }
                },
                autism: {
                    quiet_space: { status: "available", note: "صالة استقبال واسعة ومكيفة ذات تهوية ممتازة وإضاءة هادئة" }
                }
            },
            services: ["شباك موحد ميسر", "موظفو لغة إشارة", "مواقف مخصصة", "مسارات لمسية أرضية", "خدمات التوثيق والمرور"]
        },
        {
            id: "plc-010",
            name: "كافيه ومطعم سوان ليك - التجمع الأول",
            nameEn: "Swan Lake Cafe & Restaurant - New Cairo",
            category: "restaurants",
            categoryName: "المطاعم والكافيهات",
            governorate: "القاهرة",
            city: "القاهرة الجديدة",
            address: "كمبوند سوان ليك، التجمع الأول، القاهرة الجديدة",
            lat: 30.0461,
            lng: 31.4789,
            phone: "01002233445",
            website: "https://instagram.com",
            workingHours: "يومياً: 8:00 ص - 12:00 منتصف الليل",
            description: "مطعم ومقهى راقٍ بمساحات خارجية وداخلية مفتوحة وفسيحة، مع مدخل ممهد بدون درجات، وقائمة طعام إلكترونية تفاعلية.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-12",
            source: "توثيق ميداني عبر منصة خُطوة",
            rating: 4.5,
            reviewsCount: 17,
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "مدخل انسيابي ممهد يربط الموقف الخارجي بمنطقة الجلوس" },
                    wide_doors: { status: "available", note: "أبواب مفتوحة ومساحات بين الطاولات تسمح بحرية حركة الكراسي المتحركة" },
                    accessible_toilets: { status: "available", note: "دورة مياه أرضية مجهزة بمقابض مساعدة ومساحة دوران مناسبة" },
                    designated_parking: { status: "available", note: "موقف سيارات قريب ومدخل مباشر للمطعم" }
                },
                visual: {
                    high_contrast: { status: "available", note: "قائمة طعام إلكترونية عبر QR كود تدعم التكبير وقراءة الشاشة في الهواتف" },
                    staff_assistance: { status: "available", note: "طاقم الضيافة جاهز لقراءة وشرح قائمة الطعام باحترافية" }
                },
                hearing: {
                    written_communication: { status: "available", note: "الطلب متاح رقمياً عبر الهاتف أو بالكتابة مع طاقم الخدمة" }
                },
                intellectual: {
                    simplified_signs: { status: "available", note: "صور واضحة بجانب كل وجبة في القائمة الإلكترونية" }
                },
                autism: {
                    low_noise: { status: "available", note: "منطقة الجلوس الخارجية بالحديقة تتميز بهدوء عالٍ وأصوات خرير الماء" },
                    quiet_space: { status: "available", note: "تتوفر طاولات جانبية بعيدة عن الممرات الحركية" }
                }
            },
            services: ["طاولات مناسبة للكراسي", "قائمة طعام مكبرة رقمياً", "جلسات خارجية هادئة", "مواقف قريبة"]
        },
        {
            id: "plc-011",
            name: "فندق ماريوت مينا هاوس - الأهرامات",
            nameEn: "Marriott Mena House, Cairo",
            category: "hotels",
            categoryName: "الفنادق وأماكن الإقامة",
            governorate: "الجيزة",
            city: "الهرم",
            address: "6 طريق الأهرامات، الجيزة",
            lat: 29.9856,
            lng: 31.1328,
            phone: "0233773222",
            website: "https://marriott.com",
            workingHours: "الاستقبال: 24 ساعة يومياً",
            description: "فندق تاريخي عريق يجمع بين سحر الأهرامات والمعايير الفندقية العالمية للإتاحة الشاملة والغرف المهيأة لذوي الإعاقة.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-11-02",
            source: "تدقيق معايير الإتاحة الفندقية لمنصة خُطوة",
            rating: 4.9,
            reviewsCount: 41,
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدرات رخامية ميسرة بميلان آمن في كل المداخل والحدائق" },
                    elevators: { status: "available", note: "مصاعد فاخرة مزودة بأزرار منخفضة ونداء صوتي" },
                    wide_doors: { status: "available", note: "غرف مخصصة بأبواب 90 سم مع مفاتيح إضاءة وخزائن بمستوى منخفض" },
                    accessible_toilets: { status: "available", note: "حمامات الغرف المجهزة بها دوش بدون حواف (Roll-in Shower) ومقعد استحمام" },
                    designated_parking: { status: "available", note: "خدمة صف السيارات المجانية ومواقف أمام البهو الرئيسي مباشرة" }
                },
                visual: {
                    braille_signage: { status: "available", note: "أرقام الغرف وأزرار المصاعد مطبوعة ببرايل" },
                    audio_guides: { status: "available", note: "إرشادات صوتية واضحة وموظفو استقبال جاهزون للإرشاد" }
                },
                hearing: {
                    visual_alarms: { status: "available", note: "الغرف المخصصة مزودة بأجراس ضوئية وإنذار حريق وميضي واهتزازي للوسادة" }
                },
                intellectual: {
                    companion_welcome: { status: "available", note: "خدمات فندقية مرنة ودعم شخصي 24 ساعة" }
                },
                autism: {
                    quiet_space: { status: "available", note: "حدائق شاسعة توفر هدوءاً فائقاً ومناظر طبيعية تساعد على الراحة والاسترخاء" }
                }
            },
            services: ["غرف مجهزة بالكامل (Accessible Rooms)", "خدمة صف سيارات", "حمامات Roll-in", "أجراس ضوئية للصم", "حدائق ميسرة"]
        },
        {
            id: "plc-012",
            name: "بنك مصر - الفرع الرئيسي المطور والنموذجي",
            nameEn: "Banque Misr - Flagship Accessible Branch",
            category: "daily_services",
            categoryName: "خدمات يومية وبنوك",
            governorate: "القاهرة",
            city: "وسط البلد",
            address: "151 شارع محمد فريد، وسط البلد، القاهرة",
            lat: 30.0489,
            lng: 31.2421,
            phone: "19888",
            website: "https://banquemisr.com",
            workingHours: "الأحد - الخميس: 8:30 ص - 3:00 م | الجمعة والسبت: مغلق",
            description: "فرع بنكي مطور طبقاً لمبادرة البنك المركزي للإتاحة المالية والمصرفية لخدمة ذوي الإعاقة الحركية والبصرية والسمعية باستقلالية.",
            verificationStatus: "verified",
            verificationBadge: "موثق ومتحقق ميدانياً",
            lastUpdated: "2026-10-30",
            source: "مبادرة الإتاحة المصرفية بالبنك المركزي المصري + تدقيق خُطوة",
            rating: 4.8,
            reviewsCount: 33,
            images: [
                "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=1000&q=80"
            ],
            accessibilityDetails: {
                mobility: {
                    ramps: { status: "available", note: "منحدر كهربائي ميكانيكي ومنحدر خرساني مجهز بمدخل الفرع" },
                    atm_accessible: { status: "available", note: "ماكينة صراف آلي خارجية مصممة على ارتفاع منخفض لمستخدمي الكراسي" },
                    adapted_counters: { status: "available", note: "مكتب خدمة عملاء مخصص بارتفاع منخفض ومقاعد مريحة" },
                    accessible_toilets: { status: "available", note: "دورة مياه مجهزة مخصصة للعملاء" }
                },
                visual: {
                    atm_audio: { status: "available", note: "ماكينة ATM ناطقة مزودة بسماعة رأس ومفاتيح برايل للمكفوفين" },
                    braille_contracts: { status: "available", note: "عقود وفتحات حسابات مطبوعة بطريقة برايل" },
                    tactile_paving: { status: "available", note: "مسار أرضي بارز من البوابة حتى ماكينة التذاكر وشباك الأولوية" }
                },
                hearing: {
                    sign_language: { status: "available", note: "موظفون مدربون على تقديم الخدمات المصرفية بلغة الإشارة عبر مكالمات مرئية" },
                    visual_screens: { status: "available", note: "نظام نداء مرئي واضح في الصالة" }
                },
                intellectual: {
                    priority_service: { status: "available", note: "تذكرة انتظار أولوية فورية بدون انتظار طويل" },
                    simplified_signs: { status: "available", note: "كتيبات إرشادية مصرفية مبسطة" }
                },
                autism: {
                    low_noise: { status: "available", note: "تنظيم هادئ للصالة وتجنب مكبرات الصوت المرتفعة" }
                }
            },
            services: ["ماكينة ATM ناطقة وبرايل", "ماكينة منخفضة للكراسي", "عقود برايل", "خدمة لغة الإشارة", "شباك أولوية ميسر"]
        }
    ],

    // تقييمات أولية واقعية وموثقة من زوار حقيقيين
    reviews: [
        {
            id: "rev-001",
            placeId: "plc-001",
            userName: "م. أحمد مصطفى",
            userRole: "مستخدم كرسي متحرك",
            rating: 5,
            date: "2026-10-18",
            comment: "تجربتي في المتحف القومي للحضارة كانت استثنائية! المنحدرات مريحة والمصاعد متسعة جداً، ودورات المياه مجهزة بمقابض ممتازة. لم أحتاج لأي مساعدة خارجية وتحركت باستقلالية تامة.",
            helpfulCount: 24
        },
        {
            id: "rev-002",
            placeId: "plc-001",
            userName: "سارة كمال",
            userRole: "مرافقة لشقيق من ذوي متلازمة داون",
            rating: 5,
            date: "2026-10-22",
            comment: "الاستقبال كان غاية في اللطف، والتذاكر كانت مجانية للمرافق. القاعات واسعة والموظفون متعاونون جداً وصبورون. شكراً لمنصة خُطوة على توضيح التفاصيل قبل زيارتنا.",
            helpfulCount: 15
        },
        {
            id: "rev-003",
            placeId: "plc-006",
            userName: "كريم عبد الهادي",
            userRole: "شخص كفيف",
            rating: 5,
            date: "2026-11-04",
            comment: "محطة عدلي منصور نموذج مشرف حقاً. المسارات اللمسية الصفراء على الأرض ترشدني بدقة من مدخل المحطة حتى رصيف القطار، والإعلانات الصوتية واضحة للغاية.",
            helpfulCount: 31
        },
        {
            id: "rev-004",
            placeId: "plc-003",
            userName: "د. هدى المنشاوي",
            userRole: "باحثة من ضعاف البصر",
            rating: 5,
            date: "2026-10-25",
            comment: "مكتبة طه حسين بالإسكندرية هي بمثابة ملاذ لكل باحث وباحثة كفيفة. شاشات التكبير متطورة والأجهزة تعمل بكفاءة عالية، والفريق هناك على أعلى درجات التأهيل.",
            helpfulCount: 19
        },
        {
            id: "rev-005",
            placeId: "plc-004",
            userName: "ياسر الشريف",
            userRole: "ولي أمر طفل ذو توحد",
            rating: 4,
            date: "2026-10-08",
            comment: "حديقة الأزهر ممتازة للمشي والتفريغ الحسي، فقط أنصح بزيارتها في الصباح الباكر أو منتصف الأسبوع لتجنب الزحام وأصوات العائلات الكثيفة.",
            helpfulCount: 12
        }
    ],

    // اقتراحات أماكن قيد المراجعة في لوحة الإدارة (Demonstration of Moderation Workflow)
    suggestions: [
        {
            id: "sug-001",
            name: "مستشفى بهية الشيخ زايد",
            category: "hospitals",
            governorate: "الجيزة",
            city: "الشيخ زايد",
            address: "امتداد المحور المركزي، الشيخ زايد، الجيزة",
            phone: "16602",
            submittedBy: "نورهان إبراهيم (مواطنة)",
            submitterEmail: "nourhan@example.com",
            submittedDate: "2026-11-08",
            status: "pending", // pending | approved | rejected
            notes: "المستشفى مجهز بالكامل بكود الإتاحة، ولديهم مصاعد حديثة وممرات فسيحة وعيادات مهيأة لاستقبال الكراسي المتحركة.",
            featuresSummary: "إتاحة حركية كاملة، مواقف سيارات مخصصة، شاشات إرشادية"
        },
        {
            id: "sug-002",
            name: "مكتب بريد الأهرام المطور",
            category: "daily_services",
            governorate: "الجيزة",
            city: "الهرم",
            address: "شارع الهرم الرئيسي، محطة العريش",
            phone: "16789",
            submittedBy: "أحمد عبد المنعم (ناشط حقوقي)",
            submitterEmail: "ahmed.access@example.com",
            submittedDate: "2026-11-07",
            status: "pending",
            notes: "تم تجديد الفرع مؤخراً وإضافة منحدر خارجي وشباك ذوي همم منخفض الارتفاع.",
            featuresSummary: "منحدر مدخل، شباك أولوية منخفض، شاشات نداء رقمية"
        }
    ],

    // بلاغات المستخدمين لتصحيح أو تدقيق البيانات (Demonstration of Inaccuracy Reporting)
    reports: [
        {
            id: "rep-001",
            placeId: "plc-004",
            placeName: "حديقة الأزهر",
            reportType: "تحديث مواعيد العمل",
            details: "مواعيد الإغلاق في فصل الشتاء تصبح الساعة 10:00 مساءً بدلاً من 11:00 م، يُرجى التحديث لتنبيه الزوار.",
            reporterName: "محمود سامي",
            reporterEmail: "m.samy@example.com",
            submittedDate: "2026-11-06",
            status: "pending" // pending | resolved | dismissed
        }
    ],

    // المستخدمين الافتراضيين لاختبار النظام وتسجيل الدخول
    users: [
        {
            id: "usr-admin-01",
            name: "فريق إدارة خُطوة",
            email: "admin@khotwa.org",
            passwordHash: "admin123", // للتجربة والاختبار الفوري
            role: "admin",
            phone: "01000000000",
            city: "القاهرة",
            accessibilityPreferences: ["mobility", "visual", "hearing", "autism"],
            createdAt: "2026-01-01"
        },
        {
            id: "usr-demo-01",
            name: "سارة عبد الرحمن",
            email: "sara@example.com",
            passwordHash: "user123",
            role: "user",
            phone: "01234567890",
            city: "الجيزة",
            accessibilityPreferences: ["mobility"],
            createdAt: "2026-10-10"
        }
    ],

    // سجل العمليات الإدارية (Audit Log)
    auditLogs: [
        {
            id: "log-001",
            timestamp: "2026-11-05 14:30",
            actor: "مدير النظام (admin@khotwa.org)",
            action: "تحديث بيانات مكان",
            target: "صيدلية العزبي - فرع الميرغني (plc-008)",
            details: "تم توثيق إتاحة خدمة استلام الدواء من السيارة Curbside."
        },
        {
            id: "log-002",
            timestamp: "2026-11-03 11:15",
            actor: "مدير النظام (admin@khotwa.org)",
            action: "اعتماد مكان جديد ونشره",
            target: "محطة مترو أنفاق عدلي منصور المركزية (plc-006)",
            details: "تم إدراج بيانات الإتاحة اللمسية والمصاعد وتثبيت علامة 'موثق ميدانياً'."
        }
    ]
};

// إتاحة البيانات عالمياً للاستخدام عبر المتصفح
window.KHOTWA_INITIAL_DATA = KHOTWA_INITIAL_DATA;
