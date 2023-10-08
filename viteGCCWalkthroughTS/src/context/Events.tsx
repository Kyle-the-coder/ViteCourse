import React, { useContext } from "react";
import { createContext, ReactNode, useState } from "react";
import { UnionOmit } from "../utils/types";

const EVENT_COLORS = ["red", "green", "blue"] as const;

type Event = {
  id: string;
  name: string;
  color: (typeof EVENT_COLORS)[number];
  date: Date;
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime?: never; endTime?: never }
);

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
};

const Context = createContext<EventsContext | null>(null);

type EventsProviderProps = {
  children: ReactNode;
};

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(event: UnionOmit<Event, "id">) {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  }
  return (
    <Context.Provider value={{ events, addEvent }}>{children}</Context.Provider>
  );
}

export function useEvents() {
  const value = useContext(Context);
  if (value == null) {
    throw new Error("useEvents must be used within the EventsProvider");
  }
  return value;
}
