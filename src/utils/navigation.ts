import {
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  ClockIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  BriefcaseIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

export type MainNavigationItemsTypes = {
  name: string;
  href: string;
  icon: any;
  permissions?: string[]; // Instead Of Objects List
};

const MAIN_NAVIGATION: MainNavigationItemsTypes[] = [
  // Dashboard accessible for all users (maybe Candidat will be removed after)
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },

  // ================= Utilisateurs =================
  {
    name: "Utilisateurs",
    href: "/users",
    icon: UsersIcon,
    permissions: ["user_read"],
  },

  // ================= Filières + Niveaux + Groupes =================
  {
    name: "Filières",
    href: "/filieres",
    icon: AcademicCapIcon,
    permissions: ["filiere_read"],
  },
  {
    name: "Niveaux",
    href: "/niveaux",
    icon: RectangleGroupIcon,
    permissions: ["niveau_read"],
  },
  {
    name: "Groupes",
    href: "/groupes",
    icon: Squares2X2Icon,
    permissions: ["groupe_read"],
  },

  // ================= Modules + Cours =================
  {
    name: "Modules",
    href: "/modules",
    icon: BookOpenIcon,
    permissions: ["module_read"],
  },
  {
    name: "Cours",
    href: "/cours",
    icon: BookOpenIcon,
    permissions: ["cours_read"],
  },

  // ================= Examens + Notes =================
  {
    name: "Examens",
    href: "/examens",
    icon: ClipboardDocumentCheckIcon,
    permissions: ["module_read"],
  },
  {
    name: "Notes",
    href: "/notes",
    icon: PencilSquareIcon,
    permissions: ["note_read"],
  },

  // ================= Absences + Planning =================
  {
    name: "Absences",
    href: "/absences",
    icon: ClockIcon,
    permissions: ["absence_read"],
  },
  {
    name: "Planning",
    href: "/planning",
    icon: CalendarDaysIcon,
    permissions: ["planning_read"],
  },

  // ================= Événements + Opportunités =================
  {
    name: "Événements",
    href: "/evenements",
    icon: MegaphoneIcon,
    permissions: ["event_read"],
  },
  {
    name: "Opportunités",
    href: "/opportunites",
    icon: BriefcaseIcon,
    permissions: ["opportunite_read"],
  },
  {
    name: "Ressources",
    href: "/ressources",
    icon: FolderIcon,
    permissions: ["ressources_read"],
  },
];

export default MAIN_NAVIGATION;
