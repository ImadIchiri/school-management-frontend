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
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const NAVIGATIONS = {
  /* ===================== ADMIN ===================== */
  ADMIN: [
    // Dashboard
    { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },

    // Utilisateurs
    { name: "Utilisateurs", href: "/admin/users", icon: UsersIcon },

    // Filières + Niveaux + Groupes
    { name: "Filières", href: "/admin/filieres", icon: AcademicCapIcon },
    { name: "Niveaux", href: "/admin/niveaux", icon: RectangleGroupIcon },
    { name: "Groupes", href: "/admin/groupes", icon: Squares2X2Icon },

    // Modules + Cours
    { name: "Modules", href: "/admin/modules", icon: BookOpenIcon },
    { name: "Cours", href: "/admin/cours", icon: BookOpenIcon },

    // Examens + Notes
    {
      name: "Examens",
      href: "/admin/examens",
      icon: ClipboardDocumentCheckIcon,
    },
    { name: "Notes", href: "/admin/notes", icon: PencilSquareIcon },

    // Absences + Planning
    { name: "Absences", href: "/admin/absences", icon: ClockIcon },
    { name: "Planning", href: "/admin/planning", icon: CalendarDaysIcon },

    // Événements + Opportunités
    { name: "Événements", href: "/admin/evenements", icon: MegaphoneIcon },
    { name: "Opportunités", href: "/admin/opportunites", icon: BriefcaseIcon },
  ],

  /* ===================== STAFF (Employé administratif) ===================== */
  STAFF: [
    // Dashboard
    { name: "Dashboard", href: "/staff/dashboard", icon: HomeIcon },

    // Gestion académique: Étudiants + Enseignants
    { name: "Étudiants", href: "/staff/etudiants", icon: AcademicCapIcon },
    { name: "Enseignants", href: "/staff/enseignants", icon: UsersIcon },

    // Filières + Niveaux + Groupes
    { name: "Filières", href: "/staff/filieres", icon: AcademicCapIcon },
    { name: "Niveaux", href: "/staff/niveaux", icon: RectangleGroupIcon },
    { name: "Groupes", href: "/staff/groupes", icon: Squares2X2Icon },

    // Planning + Événements
    { name: "Planning", href: "/staff/planning", icon: CalendarDaysIcon },
    { name: "Événements", href: "/staff/evenements", icon: MegaphoneIcon },

    // Opportunités
    { name: "Opportunités", href: "/staff/opportunites", icon: BriefcaseIcon },
  ],

  /* ===================== ENSEIGNANT ===================== */
  ENSEIGNANT: [
    // Dashboard
    { name: "Dashboard", href: "/enseignant/dashboard", icon: HomeIcon },

    // Cours + Modules
    { name: "Mes Modules", href: "/enseignant/modules", icon: BookOpenIcon },
    { name: "Mes Cours", href: "/enseignant/cours", icon: BookOpenIcon },

    // Suivi pédagogique: Notes + Absences
    { name: "Notes", href: "/enseignant/notes", icon: ChartBarIcon },
    { name: "Absences", href: "/enseignant/absences", icon: ClockIcon },

    // Planning
    { name: "Planning", href: "/enseignant/planning", icon: CalendarDaysIcon },
  ],

  /* ===================== ETUDIANT ===================== */
  ETUDIANT: [
    // Dashboard
    { name: "Dashboard", href: "/etudiant/dashboard", icon: HomeIcon },

    // Scolarité: Cours + Notes + Absence
    { name: "Mes Cours", href: "/etudiant/cours", icon: BookOpenIcon },
    { name: "Mes Notes", href: "/etudiant/notes", icon: ChartBarIcon },
    { name: "Mes Absences", href: "/etudiant/absences", icon: ClockIcon },

    // Planning + Événements
    { name: "Planning", href: "/etudiant/planning", icon: CalendarDaysIcon },
    { name: "Événements", href: "/etudiant/evenements", icon: MegaphoneIcon },

    // Opportunités
    {
      name: "Opportunités",
      href: "/etudiant/opportunites",
      icon: BriefcaseIcon,
    },
  ],

  /* ===================== PARENT ===================== */
  PARENT: [
    // Dashboard
    { name: "Dashboard", href: "/parent/dashboard", icon: HomeIcon },

    // Suivi enfant: Notes + Absence
    { name: "Notes", href: "/parent/notes", icon: ChartBarIcon },
    { name: "Absences", href: "/parent/absences", icon: ClockIcon },

    // Planning + Événements
    { name: "Planning", href: "/parent/planning", icon: CalendarDaysIcon },
    { name: "Événements", href: "/parent/evenements", icon: MegaphoneIcon },
  ],

  /* ===================== CANDIDAT ===================== */
  CANDIDAT: [
    // Dashboard
    { name: "Dashboard", href: "/candidat/dashboard", icon: HomeIcon },

    // Candidature
    {
      name: "Ma Candidature",
      href: "/candidat/dossier",
      icon: ClipboardDocumentCheckIcon,
    },
  ],
};

export default NAVIGATIONS;
