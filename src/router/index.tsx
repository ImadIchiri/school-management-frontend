import type { RouteObject } from 'react-router';
import DashboardLayout from '@/layouts/DashboardLayout';

// Examens
import {
  ExamListPage,
  ExamCreatePage,
  ExamEditPage,
} from '@/features/examens';

// Notes
import { NotesPage } from '@/features/notes';

// Absences
import { AbsencePage } from '@/features/absences';

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <div>
            <h3>Hello Again !</h3>
            <h3>Hello Dashboard !</h3>
          </div>
        ),
      },
      // Examens
      {
        path: 'exams',
        children: [
          {
            index: true,
            element: <ExamListPage />,
          },
          {
            path: 'create',
            element: <ExamCreatePage />,
          },
          {
            path: ':id/edit',
            element: <ExamEditPage />,
          },
          {
            path: ':examenId/notes',
            element: <NotesPage />,
          },
        ],
      },
      // Absences
      {
        path: 'absences',
        element: <AbsencePage />,
      },
    ],
  },
];
