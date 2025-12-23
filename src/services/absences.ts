import axiosInstance from "@/api";

export type AbsenceAttributesTypes = {
  id?: number;
  date: Date;
  motif?: string | null;
  statut?: "PRESENT" | "ABSENT" | "JUSTIFIÉ";
  etudiantId: number;
  coursId: number;
  isDeleted?: boolean;
  deletedAt?: Date | null;
};

export const getAbsences = () => axiosInstance.get("/absences");
export const getAbsenceById = (absenceId: number) =>
  axiosInstance.get(`/absences/${absenceId}`);
export const createAbsence = (absence: AbsenceAttributesTypes) =>
  axiosInstance.post("/absences", absence);
export const updateAbsence = (absence: AbsenceAttributesTypes) =>
  axiosInstance.put("/absences", absence);
export const deleteAbsence = (absenceId: number) => axiosInstance.delete(`/absences/${absenceId}`);
