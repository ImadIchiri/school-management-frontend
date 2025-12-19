import axiosInstance from "@/api";

type EventAttributesTypes = {
  id?: number;
  titre: string;
  date: Date;
  employeId: number;
};

export const getEvents = () => axiosInstance.get("/events");
export const getEventById = (eventId: number) =>
  axiosInstance.get(`/events/${eventId}`);
export const createEvent = (event: EventAttributesTypes) =>
  axiosInstance.post("/events", event);
export const updateEvent = (event: EventAttributesTypes) =>
  axiosInstance.put("/events", event);
export const deleteEvent = () => axiosInstance.delete("/events");
