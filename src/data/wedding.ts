// Single source of truth: edit this file with the real reception details.
export const wedding = {
  bride: { name: "Priya", full: "Priya Lakshmi", father: "Mr. Ramesh Kumar", mother: "Mrs. Lakshmi Ramesh" },
  groom: { name: "Arjun", full: "Arjun Krishnan", father: "Mr. Suresh Krishnan", mother: "Mrs. Meena Suresh" },
  hashtag: "#PriyaWedsArjun",
  // Tamil accents (edit or clear for another language)
  tamilTitle: "வரவேற்பு அழைப்பிதழ்",
  blessing:
    "Two hearts, one journey. With the blessings of our elders, we begin this beautiful new chapter together — and we'd love for you to celebrate with us.",
  // Two reception events, each with its own date, venue and map.
  receptions: [
    {
      id: "chennai",
      city: "Chennai",
      icon: "glass",
      date: "12 Dec 2026",
      time: "7:00 PM onwards",
      // ISO with timezone (IST). Used for this reception's countdown + calendar.
      start: "2026-12-12T19:00:00+05:30",
      end: "2026-12-12T22:00:00+05:30",
      venue: "The Grand Palace",
      address: "88, Beach Road, Chennai",
      mapUrl: "https://maps.google.com/?q=Chennai",
      mapEmbed: "https://www.google.com/maps?q=Chennai&output=embed",
    },
    {
      id: "bengaluru",
      city: "Bengaluru",
      icon: "glass",
      date: "19 Dec 2026",
      time: "7:00 PM onwards",
      start: "2026-12-19T19:00:00+05:30",
      end: "2026-12-19T22:00:00+05:30",
      venue: "Taj West End",
      address: "Race Course Road, Bengaluru",
      mapUrl: "https://maps.google.com/?q=Bengaluru",
      mapEmbed: "https://www.google.com/maps?q=Bengaluru&output=embed",
    },
  ],
  story: [
    { year: "2019", title: "We Met", text: "A chance meeting at a friend's gathering turned into hours of conversation." },
    { year: "11 Dec 2026", title: "Engagement", text: "Surrounded by family and friends, we exchanged rings and began our journey together." },
    { year: "2026", title: "Tying the Knot", text: "With our families beside us, we begin our beautiful life together." },
  ],
  // Put photos in /public/images and list them here. Placeholders use gradients.
  gallery: [] as string[],
  contacts: [
    { name: "Ramesh Kumar", relation: "Bride's father", phone: "+91 90000 00001" },
    { name: "Suresh Krishnan", relation: "Groom's father", phone: "+91 90000 00002" },
  ],
  music: "/music/wedding.mp3", // drop an mp3 here
};
export type Wedding = typeof wedding;
export type Reception = Wedding["receptions"][number];
