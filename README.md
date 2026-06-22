# أكاديمية بيت المصور — Bayt Al Mosawir Academy

الموقع الرسمي لأكاديمية بيت المصور لتعليم التصوير الفوتوغرافي والفيديو في جدة، السعودية.

## الميزات

- **موقع تسويقي** عربي/إنجليزي (RTL/LTR) مع SEO مُحسّن
- **كتالوج دورات** مع 4 دورات مدمجة + إضافة دورات مخصصة من لوحة الإدارة
- **مساعد ذكي «لي لي»** لمساعدة الزوار في اختيار الدورات والأسعار والمواعيد
- **لوحة إدارة** (`/admin`) لتعديل الأسعار والمواعيد والمدربين وإضافة/حذف دورات
- **منصة متدربين** (`/platform`) — منتدى، رسائل مباشرة، بث مباشر، نظام إحالة، كوبونات

## التقنيات

- **الإطار**: TanStack Start (SSR/Nitro) + TanStack Router
- **الواجهة**: React 19 + Vite 7 + Tailwind CSS 4 + shadcn/ui
- **قاعدة البيانات**: PostgreSQL عبر Prisma 6
- **اللغة**: TypeScript 5.8
- **النشر**: Railway (Nixpacks) + Docker + Cloudflare

## المتطلبات

- Node.js 22+
- PostgreSQL 15+

## الإعداد المحلي

### 1. تثبيت الاعتماديات

```bash
npm install
```

### 2. إعداد متغيرات البيئة

انسخ `.env.example` إلى `.env` واملأ القيم:

```bash
cp .env.example .env
```

| المتغير                 | الوصف                                               | افتراضي                         |
| ----------------------- | --------------------------------------------------- | ------------------------------- |
| `ADMIN_PASSWORD`        | كلمة مرور لوحة الإدارة (استخدم كلمة قوية 16+ حرفًا) | `changeme-strong-password-here` |
| `DATABASE_URL`          | رابط PostgreSQL                                     | —                               |
| `VITE_LILI_LLM_API_KEY` | (اختياري) مفتاح LLM لردود لي لي الذكية              | غير مفعّل                       |

### 3. إعداد قاعدة البيانات

```bash
npx prisma db push     # إنشاء الجداول
npx prisma db seed     # فهرسة معرفة لي لي
```

### 4. التشغيل

```bash
npm run dev            # خادم التطوير على المنفذ 8080
npm run build          # بناء للإنتاج
npm run start          # تشغيل خادم الإنتاج
```

## الأوامر

| الأمر                   | الوصف                                       |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | خادم التطوير                                |
| `npm run build`         | بناء للإنتاج (prisma generate + vite build) |
| `npm run start`         | تشغيل خادم الإنتاج                          |
| `npm run lint`          | فحص ESLint                                  |
| `npm run format`        | تنسيق Prettier                              |
| `npm test`              | تشغيل الاختبارات (Vitest)                   |
| `npm run test:coverage` | تشغيل الاختبارات مع التغطية                 |
| `npm run db:push`       | مزامنة schema مع قاعدة البيانات             |
| `npm run db:seed`       | فهرسة معرفة لي لي                           |
| `npm run db:studio`     | Prisma Studio                               |

## لوحة الإدارة

- **الرابط**: `/admin/login`
- **كلمة المرور**: القيمة في `ADMIN_PASSWORD`

تتيح تعديل الأسعار والمواعيد والمدربين، وإضافة دورات جديدة، وحذف الدورات المدمجة.

## منصة المتدربين

- **الرابط**: `/platform`
- تسجيل دخول بالاسم والبريد
- منتدى مجتمعي، رسائل مباشرة مع فريق الأكاديمية، بث مباشر، نظام إحالة

## النشر على Railway

1. اربط مستودع GitHub بـ Railway
2. أضف خدمة PostgreSQL
3. اربط `DATABASE_URL` بـ `${{Postgres.DATABASE_URL}}`
4. اضبط `ADMIN_PASSWORD` بكلمة قوية
5. Railway سيستخدم `railway.toml` لبناء وتشغيل المشروع تلقائيًا

## هيكل المشروع

```
src/
├── routes/          صفحات (TanStack file-based routing)
├── lib/
│   ├── lili/        المساعد الذكي
│   ├── admin/       لوحة الإدارة + المصادقة
│   ├── platform/    منصة المتدربين
│   └── i18n.tsx     تدويل
├── components/
│   ├── ui/          مكتبة shadcn/ui
│   ├── course/      مكوّنات صفحة الدورة
│   └── ask-lili/    واجهة لي لي
└── data/courses/    كتالوج الدورات
prisma/
└── schema.prisma    نماذج قاعدة البيانات
```

## الاختبارات

```bash
npm test              # تشغيل 64+ اختبار
npm run test:coverage # مع تقرير التغطية
```

الاختبارات تغطي: `guardrails`, `retrieval`, `responder`, `merge`, `coupon`, `money`.

## الرخصة

خاص — أكاديمية بيت المصور.
