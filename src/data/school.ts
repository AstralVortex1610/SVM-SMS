import {
  Activity,
  Banknote,
  Bell,
  BookOpen,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Role = "student" | "teacher" | "admin" | "superadmin";

export type RouteKey =
  | "overview"
  | "attendance"
  | "assignments"
  | "classes"
  | "fees"
  | "notices"
  | "people"
  | "reports"
  | "security"
  | "tenants";

export type NavItem = {
  key: RouteKey;
  label: string;
  icon: LucideIcon;
  roles: Role[];
};

export type Action = {
  label: string;
  detail: string;
  route: RouteKey;
  roles: Role[];
};

export type Insight = {
  label: string;
  value: string;
  trend: string;
  tone: "good" | "watch" | "neutral";
  roles: Role[];
};

export const roles: Record<Role, { label: string; name: string; context: string }> = {
  student: {
    label: "Student",
    name: "Aarav Sharma",
    context: "Class 9A",
  },
  teacher: {
    label: "Teacher",
    name: "Meera Iyer",
    context: "Mathematics Faculty",
  },
  admin: {
    label: "Admin",
    name: "Rohan Menon",
    context: "Campus Operations",
  },
  superadmin: {
    label: "Superadmin",
    name: "SVM Trust Office",
    context: "Multi-campus Control",
  },
};

export const navItems: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, roles: ["student", "teacher", "admin", "superadmin"] },
  { key: "attendance", label: "Attendance", icon: CalendarCheck, roles: ["student", "teacher", "admin"] },
  { key: "assignments", label: "Assignments", icon: ClipboardCheck, roles: ["student", "teacher"] },
  { key: "classes", label: "Classes", icon: BookOpen, roles: ["student", "teacher", "admin"] },
  { key: "fees", label: "Fees", icon: Banknote, roles: ["student", "admin"] },
  { key: "notices", label: "Notices", icon: Megaphone, roles: ["student", "teacher", "admin", "superadmin"] },
  { key: "people", label: "People", icon: Users, roles: ["teacher", "admin", "superadmin"] },
  { key: "reports", label: "Reports", icon: ScrollText, roles: ["admin", "superadmin"] },
  { key: "security", label: "Security", icon: LockKeyhole, roles: ["admin", "superadmin"] },
  { key: "tenants", label: "Tenants", icon: Building2, roles: ["superadmin"] },
];

export const insights: Insight[] = [
  { label: "Attendance", value: "96.4%", trend: "+2.1% this month", tone: "good", roles: ["student"] },
  { label: "Pending work", value: "3", trend: "2 due this week", tone: "watch", roles: ["student"] },
  { label: "Merit points", value: "184", trend: "Top 8% in grade", tone: "good", roles: ["student"] },
  { label: "Classes today", value: "5", trend: "1 substitution", tone: "neutral", roles: ["teacher"] },
  { label: "Submissions", value: "78%", trend: "22 reviews left", tone: "watch", roles: ["teacher"] },
  { label: "Parent responses", value: "41", trend: "12 new messages", tone: "neutral", roles: ["teacher"] },
  { label: "Campus attendance", value: "92.8%", trend: "+0.8% vs last week", tone: "good", roles: ["admin"] },
  { label: "Fee collection", value: "84%", trend: "118 invoices open", tone: "watch", roles: ["admin"] },
  { label: "Open approvals", value: "17", trend: "6 urgent", tone: "watch", roles: ["admin"] },
  { label: "Active campuses", value: "4", trend: "All online", tone: "good", roles: ["superadmin"] },
  { label: "System health", value: "99.98%", trend: "No incidents", tone: "good", roles: ["superadmin"] },
  { label: "Policy reviews", value: "9", trend: "3 awaiting signoff", tone: "watch", roles: ["superadmin"] },
];

export const actions: Action[] = [
  { label: "View timetable", detail: "Open today's classes and room changes.", route: "classes", roles: ["student"] },
  { label: "Submit assignment", detail: "Upload work into the pending queue.", route: "assignments", roles: ["student"] },
  { label: "Mark attendance", detail: "Take period-wise attendance with review states.", route: "attendance", roles: ["teacher"] },
  { label: "Review submissions", detail: "Grade pending classwork and send feedback.", route: "assignments", roles: ["teacher"] },
  { label: "Approve leave", detail: "Resolve student and staff leave requests.", route: "people", roles: ["admin"] },
  { label: "Publish notice", detail: "Send targeted campus announcements.", route: "notices", roles: ["admin", "superadmin"] },
  { label: "Audit access", detail: "Inspect role grants and security events.", route: "security", roles: ["admin", "superadmin"] },
  { label: "Manage campus", detail: "Review tenant configuration and rollout status.", route: "tenants", roles: ["superadmin"] },
];

export const timeline = [
  { time: "08:30", title: "Assembly and attendance sync", owner: "Campus", status: "Complete" },
  { time: "10:10", title: "Mathematics assessment window", owner: "Class 9A", status: "Live" },
  { time: "12:45", title: "Fee reminder batch approval", owner: "Admin desk", status: "Queued" },
  { time: "15:20", title: "Parent communication digest", owner: "Teachers", status: "Drafting" },
];

export const routeCopy: Record<RouteKey, { title: string; description: string; icon: LucideIcon }> = {
  overview: {
    title: "Role dashboard",
    description: "A focused daily command center with only the tools this role can use.",
    icon: Sparkles,
  },
  attendance: {
    title: "Attendance operations",
    description: "Period-wise capture, student history, exception review, and export-ready status.",
    icon: CalendarCheck,
  },
  assignments: {
    title: "Assignments and evaluation",
    description: "Submission queues, due dates, rubrics, teacher feedback, and student progress.",
    icon: ClipboardCheck,
  },
  classes: {
    title: "Classroom planning",
    description: "Timetables, subjects, sections, rooms, substitutions, and class-level context.",
    icon: BookOpen,
  },
  fees: {
    title: "Fees and receipts",
    description: "Invoice status, reminders, concessions, receipt history, and payment readiness.",
    icon: Banknote,
  },
  notices: {
    title: "Notices and communication",
    description: "Targeted announcements with draft, approval, schedule, and delivery states.",
    icon: Bell,
  },
  people: {
    title: "People directory",
    description: "Students, guardians, teachers, staff, approvals, and role-sensitive profiles.",
    icon: Users,
  },
  reports: {
    title: "Reports",
    description: "Operational summaries for attendance, academics, finance, and compliance.",
    icon: Activity,
  },
  security: {
    title: "Security and audit",
    description: "Role grants, session policies, sensitive actions, and immutable audit trails.",
    icon: ShieldCheck,
  },
  tenants: {
    title: "Tenant control",
    description: "Campus provisioning, feature flags, usage limits, and trust-level governance.",
    icon: UserCog,
  },
};
