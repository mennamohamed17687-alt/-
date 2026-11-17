-- =============================================================================
-- خُطوة – KHOTWA
-- مخطط قاعدة البيانات المتكامل (PostgreSQL / Supabase Schema)
-- الشعار: «كل خطوة تقرّبك من المكان المناسب.»
-- =============================================================================

-- تفعيل ملحق UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. جدول الحسابات والملفات الشخصية (profiles)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    city VARCHAR(100) DEFAULT 'القاهرة',
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- -----------------------------------------------------------------------------
-- 2. جدول تصنيفات الأماكن (place_categories)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.place_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(20) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 3. جدول ميزات وتجهيزات الإتاحة (accessibility_features)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.accessibility_features (
    id VARCHAR(50) PRIMARY KEY,
    category_group VARCHAR(50) NOT NULL CHECK (category_group IN ('mobility', 'visual', 'hearing', 'intellectual', 'autism')),
    name VARCHAR(150) NOT NULL,
    icon VARCHAR(20) NOT NULL,
    description TEXT
);

CREATE INDEX IF NOT EXISTS idx_features_group ON public.accessibility_features(category_group);

-- -----------------------------------------------------------------------------
-- 4. جدول الأماكن والخدمات (places)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.places (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_en VARCHAR(200),
    category_id VARCHAR(50) REFERENCES public.place_categories(id) ON DELETE SET NULL,
    governorate VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    lat DECIMAL(10, 7) NOT NULL,
    lng DECIMAL(10, 7) NOT NULL,
    phone VARCHAR(50),
    website TEXT,
    working_hours TEXT,
    description TEXT,
    verification_status VARCHAR(30) DEFAULT 'pending' CHECK (verification_status IN ('verified', 'pending', 'experimental', 'rejected')),
    verification_badge VARCHAR(100) DEFAULT 'قيد التدقيق والمراجعة',
    source TEXT,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_places_category ON public.places(category_id);
CREATE INDEX IF NOT EXISTS idx_places_gov_city ON public.places(governorate, city);
CREATE INDEX IF NOT EXISTS idx_places_verification ON public.places(verification_status);
CREATE INDEX IF NOT EXISTS idx_places_rating ON public.places(rating DESC);

-- -----------------------------------------------------------------------------
-- 5. جدول تفاصيل إتاحة المكان (place_accessibility)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.place_accessibility (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id VARCHAR(50) REFERENCES public.places(id) ON DELETE CASCADE,
    feature_id VARCHAR(50) REFERENCES public.accessibility_features(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL CHECK (status IN ('available', 'unavailable', 'unverified', 'partial')),
    note TEXT,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(place_id, feature_id)
);

CREATE INDEX IF NOT EXISTS idx_place_access_place ON public.place_accessibility(place_id);

-- -----------------------------------------------------------------------------
-- 6. جدول صور الأماكن (place_images)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.place_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id VARCHAR(50) REFERENCES public.places(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 7. جدول المفضلة (favorites)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    place_id VARCHAR(50) REFERENCES public.places(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, place_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);

-- -----------------------------------------------------------------------------
-- 8. جدول التقييمات وتجارب الزوار (reviews)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id VARCHAR(50) REFERENCES public.places(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_name VARCHAR(150) NOT NULL,
    user_role VARCHAR(100) DEFAULT 'زائر مهتم بالإتاحة',
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_place ON public.reviews(place_id);

-- -----------------------------------------------------------------------------
-- 9. جدول بلاغات تصحيح البيانات (reports)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id VARCHAR(50) REFERENCES public.places(id) ON DELETE SET NULL,
    place_name VARCHAR(200) NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    reporter_name VARCHAR(150),
    reporter_email VARCHAR(255),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);

-- -----------------------------------------------------------------------------
-- 10. جدول اقتراحات الأماكن الجديدة (place_suggestions)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.place_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    category_id VARCHAR(50),
    governorate VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    notes TEXT,
    features_summary TEXT,
    submitted_by VARCHAR(150) NOT NULL,
    submitter_email VARCHAR(255),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_suggestions_status ON public.place_suggestions(status);

-- -----------------------------------------------------------------------------
-- 11. جدول تفضيلات الإتاحة للمستخدم (user_preferences)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    preference_key VARCHAR(50) NOT NULL,
    preference_value TEXT NOT NULL,
    UNIQUE(user_id, preference_key)
);

-- -----------------------------------------------------------------------------
-- 12. جدول الإشعارات (notifications)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 13. جدول سجل العمليات الإدارية (audit_logs)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor VARCHAR(200) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target VARCHAR(200),
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at DESC);
