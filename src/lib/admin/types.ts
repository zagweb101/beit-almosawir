export type AdminCourseFields = {
  name: string;
  priceLabel: string;
  priceAmount?: number;
  currency?: string;
  scheduleLabel: string;
  startDate?: string;
  endDate?: string;
  durationDays: number;
  totalHours: number;
  dailyHours: number;
  instructorName: string;
  level: string;
  location: string;
  trainingType: string;
  heroSubtitle?: string;
};

export type AdminCourseOverride = Partial<AdminCourseFields> & {
  updatedAt: string;
};

export type AdminCustomCourse = AdminCourseFields & {
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminStore = {
  overrides: Record<string, AdminCourseOverride>;
  customCourses: AdminCustomCourse[];
  deletedSlugs: string[];
};

export type AdminCourseRow = AdminCourseFields & {
  slug: string;
  path: string;
  source: "builtin" | "custom";
  updatedAt?: string;
};

export const EMPTY_ADMIN_STORE: AdminStore = {
  overrides: {},
  customCourses: [],
  deletedSlugs: [],
};

export type AdminOrder = {
  id: string;
  courseSlug: string;
  courseName: string;
  amount: number;
  currency: string;
  paypalOrderId?: string;
  status: "pending" | "paid" | "failed";
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  createdAt: string;
};

export type AdminInstructorFields = {
  name: string;
  specialty: string;
  bio: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  active: boolean;
};

export type AdminInstructor = AdminInstructorFields & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminTestimonialFields = {
  authorName: string;
  role: string;
  quote: string;
  rating: number;
  photoUrl?: string;
  courseSlug?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

export type AdminTestimonial = AdminTestimonialFields & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

/** خيارات نوع التدريب المعروضة في لوحة الإدارة. */
export const TRAINING_TYPE_OPTIONS = ["حضوري", "أونلاين", "برايفت"] as const;

/** اقتراحات المستوى (قابلة للتعديل اليدوي). */
export const LEVEL_OPTIONS = ["مبتدئ", "متوسط", "متقدم", "جميع المستويات"] as const;
