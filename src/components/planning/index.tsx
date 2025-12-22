import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, LayoutList } from 'lucide-react';
import { getPlannings } from '@/api/planning.api';
import type { ExistingPlanning } from '@/api/planning.api';
import { useToast } from '@/shared/components/Toast';

interface CourseBlock extends ExistingPlanning {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  dayOfWeek: number;
}

const Planning: React.FC = () => {
  const [plannings, setPlannings] = useState<CourseBlock[]>([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { showToast } = useToast();

  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 08:00 - 20:00

  useEffect(() => {
    fetchPlannings();
  }, []);

  const fetchPlannings = async () => {
    try {
      const data = await getPlannings();
      const coursesWithTime = data.map((planning) => {
        const start = new Date(planning.dateDebut);
        const end = new Date(planning.dateFin);
        return {
          ...planning,
          startHour: start.getHours(),
          startMinute: start.getMinutes(),
          endHour: end.getHours(),
          endMinute: end.getMinutes(),
          dayOfWeek: start.getDay() === 0 ? 6 : start.getDay() - 1,
        };
      });
      setPlannings(coursesWithTime);
    } catch (error: any) {
      showToast('error', 'Erreur lors du chargement du planning');
      // Mock data for demo
      setPlannings([
        {
          id: '1',
          dateDebut: '2025-01-06T08:00:00',
          dateFin: '2025-01-06T10:00:00',
          description: 'Algorithmes Avancés',
          coursId: '1',
          enseignantId: '1',
          salleId: 'A1',
          startHour: 8,
          startMinute: 0,
          endHour: 10,
          endMinute: 0,
          dayOfWeek: 0,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          dateDebut: '2025-01-06T10:00:00',
          dateFin: '2025-01-06T12:00:00',
          description: 'Base de Données',
          coursId: '2',
          enseignantId: '2',
          salleId: 'B1',
          startHour: 10,
          startMinute: 0,
          endHour: 12,
          endMinute: 0,
          dayOfWeek: 0,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '3',
          dateDebut: '2025-01-08T08:00:00',
          dateFin: '2025-01-08T10:00:00',
          description: 'Programmation Web',
          coursId: '3',
          enseignantId: '3',
          salleId: 'Labo Info',
          startHour: 8,
          startMinute: 0,
          endHour: 10,
          endMinute: 0,
          dayOfWeek: 2,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '4',
          dateDebut: '2025-01-09T14:00:00',
          dateFin: '2025-01-09T16:00:00',
          description: 'Réseaux Informatiques',
          coursId: '4',
          enseignantId: '4',
          salleId: 'Amphi 1',
          startHour: 14,
          startMinute: 0,
          endHour: 16,
          endMinute: 0,
          dayOfWeek: 1,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '5',
          dateDebut: '2025-01-10T14:00:00',
          dateFin: '2025-01-10T16:00:00',
          description: 'Architecture Logicielle',
          coursId: '5',
          enseignantId: '5',
          salleId: 'C3',
          startHour: 14,
          startMinute: 0,
          endHour: 16,
          endMinute: 0,
          dayOfWeek: 3,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '6',
          dateDebut: '2025-01-10T10:00:00',
          dateFin: '2025-01-10T12:00:00',
          description: 'Cybersécurité',
          coursId: '6',
          enseignantId: '6',
          salleId: 'D1',
          startHour: 10,
          startMinute: 0,
          endHour: 12,
          endMinute: 0,
          dayOfWeek: 4,
          createdAt: '',
          updatedAt: '',
        },
      ]);
    } finally {
    }
  };

  const getWeekDates = () => {
    const curr = new Date(currentWeek);
    const first = curr.getDate() - curr.getDay() + 1;
    return daysOfWeek.map((_, i) => {
      const date = new Date(curr.setDate(first + i));
      return date;
    });
  };

  const formatWeekRange = () => {
    const dates = getWeekDates();
    const start = dates[0];
    return `Semaine ${start.getDate()}, ${start.toLocaleDateString('fr-FR', { year: 'numeric' })}`;
  };

  const getCourseStyle = (course: CourseBlock) => {
    const duration = (course.endHour - course.startHour) * 60 + (course.endMinute - course.startMinute);
    const height = (duration / 60) * 80; // 80px per hour
    const top = ((course.startHour - 8) * 80) + (course.startMinute / 60 * 80);
    
    return {
      position: 'absolute' as const,
      top: `${top}px`,
      height: `${height}px`,
      left: '4px',
      right: '4px',
    };
  };

  const getCoursesForDay = (dayIndex: number) => {
    return plannings.filter(p => p.dayOfWeek === dayIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-700 mb-6">Planning</h1>
          
          <div className="flex justify-between items-center">
            {/* Week Navigation */}
            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm">
              <button
                onClick={() => {
                  const prev = new Date(currentWeek);
                  prev.setDate(prev.getDate() - 7);
                  setCurrentWeek(prev);
                }}
                className="p-1 hover:bg-teal-50 rounded transition"
              >
                <ChevronLeft size={20} className="text-teal-600" />
              </button>
              
              <span className="font-medium text-gray-700 min-w-[200px] text-center">
                {formatWeekRange()}
              </span>
              
              <button
                onClick={() => {
                  const next = new Date(currentWeek);
                  next.setDate(next.getDate() + 7);
                  setCurrentWeek(next);
                }}
                className="p-1 hover:bg-teal-50 rounded transition"
              >
                <ChevronRight size={20} className="text-teal-600" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="p-2 bg-white border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition">
                <LayoutList size={20} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                <Plus size={20} />
                Ajouter Cours
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-[80px_repeat(6,1fr)]">
            {/* Header Row */}
            <div className="bg-teal-600 text-white p-4 font-semibold"></div>
            {daysOfWeek.map((day) => (
              <div key={day} className="bg-teal-600 text-white p-4 font-semibold text-center border-l border-teal-500">
                {day}
              </div>
            ))}

            {/* Time Slots */}
            {hours.map((hour) => (
              <React.Fragment key={hour}>
                {/* Hour Label */}
                <div className="border-t border-gray-200 p-2 text-sm text-gray-600 text-right pr-4">
                  {hour.toString().padStart(2, '0')}:00
                </div>

                {/* Day Columns */}
                {daysOfWeek.map((_, dayIndex) => (
                  <div
                    key={`${hour}-${dayIndex}`}
                    className="border-t border-l border-gray-200 relative"
                    style={{ height: '80px' }}
                  >
                    {/* Render courses for this time slot */}
                    {hour === 8 && getCoursesForDay(dayIndex).map((course) => (
                      <div
                        key={course.id}
                        style={getCourseStyle(course)}
                        className="bg-teal-400 rounded-lg p-3 text-white shadow-md hover:shadow-lg transition cursor-pointer"
                      >
                        <div className="font-semibold text-sm mb-1">{course.description}</div>
                        <div className="text-xs opacity-90">Salle {course.salleId}</div>
                        <div className="text-xs opacity-90">Groupe A</div>
                      </div>
                    ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planning;
