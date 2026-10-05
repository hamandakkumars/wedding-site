// Shared ICS / Google Calendar helpers for the modern countdown.
// (The South Indian Countdown.tsx keeps its own inline copy — untouched.)
import type { Reception, Wedding } from "@/data/wedding";

export const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");

export function receptionTitle(wedding: Wedding, reception: Reception) {
  return `${wedding.bride.name} & ${wedding.groom.name} Reception — ${reception.city}`;
}

export function buildIcs(wedding: Wedding, reception: Reception) {
  const title = receptionTitle(wedding, reception);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Reception//EN", "BEGIN:VEVENT",
    `UID:${reception.id}-${stamp(reception.start)}@reception`, `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(reception.start)}`, `DTEND:${stamp(reception.end)}`,
    `SUMMARY:${title}`, `LOCATION:${reception.venue}, ${reception.address}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

export function googleCalendarUrl(wedding: Wedding, reception: Reception) {
  const title = receptionTitle(wedding, reception);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(reception.start)}/${stamp(reception.end)}&location=${encodeURIComponent(`${reception.venue}, ${reception.address}`)}`;
}

export function downloadIcs(wedding: Wedding, reception: Reception) {
  const ics = buildIcs(wedding, reception);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = `reception-${reception.id}.ics`;
  a.click();
}
