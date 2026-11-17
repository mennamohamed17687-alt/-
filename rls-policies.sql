-- =============================================================================
-- خُطوة – KHOTWA
-- سياسات الأمان على مستوى الصفوف (Row Level Security - RLS Policies)
-- لحماية البيانات وصلاحيات القراءة والكتابة في Supabase
-- =============================================================================

-- تفعيل RLS على جميع الجداول
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.place_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. جدول الأماكن (places):
-- القراءة عامة للجميع (الأماكن الموثقة)
CREATE POLICY "Public places are viewable by everyone" 
ON public.places FOR SELECT 
USING (verification_status = 'verified' OR auth.role() = 'authenticated');

-- التعديل والإضافة والحذف محصور فقط بالمسؤولين (admin)
CREATE POLICY "Admins can manage places" 
ON public.places FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
);

-- 2. جدول التقييمات (reviews):
-- قراءة التقييمات عامة للجميع
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (true);

-- إضافة تقييم متاح للمستخدمين
CREATE POLICY "Users can insert their own reviews" 
ON public.reviews FOR INSERT 
WITH CHECK (true);

-- 3. جدول المفضلة (favorites):
-- كل مستخدم يرى ويعدل مفضلته الشخصية فقط
CREATE POLICY "Users can manage their own favorites" 
ON public.favorites FOR ALL 
USING (auth.uid() = user_id);

-- 4. جدول الاقتراحات (place_suggestions):
-- يمكن لأي زائر أو مستخدم إرسال اقتراح مكان
CREATE POLICY "Anyone can submit a place suggestion" 
ON public.place_suggestions FOR INSERT 
WITH CHECK (true);

-- مراجعة وتعديل الاقتراحات للمسؤول فقط
CREATE POLICY "Admins can manage suggestions" 
ON public.place_suggestions FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
);

-- 5. جدول البلاغات (reports):
-- يمكن للجميع تقديم بلاغ
CREATE POLICY "Anyone can report an issue" 
ON public.reports FOR INSERT 
WITH CHECK (true);

-- إدارة البلاغات للمسؤول فقط
CREATE POLICY "Admins can manage reports" 
ON public.reports FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
);

-- 6. جدول سجل العمليات (audit_logs):
-- محصور بالقراءة والكتابة لإدارة المنصة فقط
CREATE POLICY "Audit logs are strictly for admins" 
ON public.audit_logs FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
);
