export type AdminCourseFields = {
  name: string;
  priceLabel: string;
  scheduleLabel: string;
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
