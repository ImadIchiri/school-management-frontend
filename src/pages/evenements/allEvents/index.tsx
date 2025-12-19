import { FaEdit, FaList } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { format as formatDate } from "date-fns";
import { useState } from "react";

type TEMP_EVENTS_DATA_TYPE = {
  id: number;
  titre: string;
  date: Date;
  employeId: number;
  employe: {
    idEmploye: number;
    poste: string;
    salaire: number;
    user: {
      id: number;
      nom: string;
      prenom: string;
      email: string;
    };
  };
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  deletedAt: Date | null;
  etudiants: any[];
};

export const TEMP_EVENTS_DATA: TEMP_EVENTS_DATA_TYPE[] = [
  {
    id: 1,
    titre: "Rentrée académique 2025–2026",
    date: new Date("2025-09-15T09:00:00"),
    employeId: 3,
    employe: {
      idEmploye: 3,
      poste: "Responsable pédagogique",
      salaire: 8500,
      user: {
        id: 12,
        nom: "El Amrani",
        prenom: "Youssef",
        email: "youssef.elamrani@school.ma",
      },
    },
    createdAt: new Date("2025-07-01T10:30:00"),
    updatedAt: new Date("2025-07-01T10:30:00"),
    isDeleted: false,
    deletedAt: null,
    etudiants: [],
  },
  {
    id: 2,
    titre: "Séminaire d’orientation – Filière Informatique",
    date: new Date("2025-10-05T14:00:00"),
    employeId: 5,
    employe: {
      idEmploye: 5,
      poste: "Chargée de communication",
      salaire: 7200,
      user: {
        id: 18,
        nom: "Bennani",
        prenom: "Sara",
        email: "sara.bennani@school.ma",
      },
    },
    createdAt: new Date("2025-07-10T11:00:00"),
    updatedAt: new Date("2025-07-12T09:15:00"),
    isDeleted: false,
    deletedAt: null,
    etudiants: [],
  },
  {
    id: 3,
    titre: "Journée portes ouvertes",
    date: new Date("2025-11-20T10:00:00"),
    employeId: 2,
    employe: {
      idEmploye: 2,
      poste: "Directeur des études",
      salaire: 12000,
      user: {
        id: 7,
        nom: "Alaoui",
        prenom: "Hassan",
        email: "hassan.alaoui@school.ma",
      },
    },
    createdAt: new Date("2025-08-01T08:45:00"),
    updatedAt: new Date("2025-08-01T08:45:00"),
    isDeleted: false,
    deletedAt: null,
    etudiants: [],
  },
  {
    id: 4,
    titre: "Conférence : Métiers du numérique",
    date: new Date("2025-12-03T16:00:00"),
    employeId: 4,
    employe: {
      idEmploye: 4,
      poste: "Enseignant",
      salaire: 9000,
      user: {
        id: 21,
        nom: "Zerhouni",
        prenom: "Mehdi",
        email: "mehdi.zerhouni@school.ma",
      },
    },
    createdAt: new Date("2025-08-15T13:20:00"),
    updatedAt: new Date("2025-08-18T10:00:00"),
    isDeleted: false,
    deletedAt: null,
    etudiants: [],
  },
  {
    id: 5,
    titre: "Cérémonie de remise des diplômes",
    date: new Date("2026-01-18T17:30:00"),
    employeId: 1,
    employe: {
      idEmploye: 1,
      poste: "Directrice générale",
      salaire: 15000,
      user: {
        id: 3,
        nom: "Rahmani",
        prenom: "Khadija",
        email: "khadija.rahmani@school.ma",
      },
    },
    createdAt: new Date("2025-09-01T09:00:00"),
    updatedAt: new Date("2025-09-01T09:00:00"),
    isDeleted: false,
    deletedAt: null,
    etudiants: [],
  },
];

const VIEW_TYPES = {
  GRID: "GRID",
  TABLE: "TABLE",
};

const EventsPage = () => {
  const [viewType, setViewType] = useState(VIEW_TYPES.TABLE);

  return (
    <section className="flex-1">
      {/* Header */}
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-medium">Evenements</h2>
        <div className="w-full flex items-center justify-between gap-2 mb-2 mt-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewType(VIEW_TYPES.GRID)}
              className={`cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg scale-85 border ${
                viewType === VIEW_TYPES.GRID
                  ? "bg-school-primaryDark text-school-surface hover:bg-school-surface hover:text-school-primaryDark border-school-primaryDark"
                  : "bg-school-surface text-school-primaryDark hover:bg-school-primaryDark hover:text-school-surface border-school-primaryDark"
              }`}
            >
              <HiOutlineSquares2X2 className="text-2xl" />
            </button>
            <button
              onClick={() => setViewType(VIEW_TYPES.TABLE)}
              className={`cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg scale-85 border ${
                viewType === VIEW_TYPES.TABLE
                  ? "bg-school-primaryDark text-school-surface hover:bg-school-surface hover:text-school-primaryDark border-school-primaryDark"
                  : "bg-school-surface text-school-primaryDark hover:bg-school-primaryDark hover:text-school-surface border-school-primaryDark"
              }`}
            >
              <FaList className="text-xl" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1 rounded-full scale-90 cursor-pointer border-2 border-school-primaryDark bg-school-primaryDark text-school-surface hover:bg-school-surface hover:text-school-primaryDark">
            <FaCirclePlus />
            <span className="text-lg">Evenement</span>
          </button>
        </div>
      </div>

      {/* Tablle container */}
      <div>
        {viewType === VIEW_TYPES.TABLE ? (
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="bg-neutral-secondary-soft border-b border-default">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Creer par
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {TEMP_EVENTS_DATA.map((eventObj) => (
                  <tr
                    key={eventObj.id}
                    className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                  >
                    <td scope="row" className="px-6 py-4">
                      {eventObj.titre}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(eventObj.date, "dd MMM yyyy")}
                    </td>
                    <td className="px-6 py-4">{`${eventObj.employe.user.nom} ${eventObj.employe.user.prenom}`}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button className="p-2 rounded-full cursor-pointer bg-school-surface text-school-primaryDark hover:bg-school-primaryDark hover:text-school-surface">
                          <FaEdit />
                        </button>
                        <button className="p-2 rounded-full cursor-pointer bg-school-surface text-school-primaryDark hover:bg-school-primaryDark hover:text-school-surface">
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2>Comming soon !</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPage;
