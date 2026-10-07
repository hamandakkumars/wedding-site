// Single source of truth: edit this file with the real reception details.
export const wedding = {
  bride: {
    title: "Dr.",
    name: "Harini", // short first name — used in large display typography
    full: "Sri Harini S", // full given name, combined with title elsewhere as `${title} ${full}`
    // `pursuing` is shown with a line over it — still studying, not yet completed.
    qualifications: { completed: "MBBS", pursuing: "MRCP (UK)" },
    father: { name: "Sri. S Senthil Kumar", qualifications: "LL.B, M.Phil", designation: "Titan Company Ltd" },
    mother: { name: "Smt. K Sathya Nandhini", qualifications: "M.Sc. (N)", designation: "Principal, Meera Institution of Paramedical Sciences" },
  },
  groom: {
    title: "Dr.",
    name: "Sudharshan",
    full: "Sudharshan K",
    qualifications: { completed: "MBBS", pursuing: "MRCS (UK)" },
    father: {
      name: "Dr. R. Kannan",
      qualifications: "MBBS, DTCD, DNB, MD, DM",
      designation: "Associate Professor of Cardiology, Govt. Tiruvannamalai Medical College",
    },
    mother: {
      name: "Dr. T. Malarkodi",
      qualifications: "MBBS, DGO",
      designation: "Obstetrician & Gynaecologist, Sri Balakandhan Hospital",
    },
    brother: { name: "Mr. K. Shreecharan", qualifications: { pursuing: "B.E" } },
  },
  // Shown as a blessing line above both families.
  grandparents: {
    heading: "With Blessings of Grandparents",
    lines: ["Mr. M. Subburaju & Mrs. S. Gowrammal", "(Late) Mr. N. Kasinathan & Mrs. T. Parvathi"],
  },
  hashtag: "#HariniWedsSudharshan",
  // Tamil accents (edit or clear for another language)
  tamilTitle: "வரவேற்பு அழைப்பிதழ்",
  blessing:
    "Two hearts, one journey. With the blessings of our elders, we begin this beautiful new chapter together — and we'd love for you to celebrate with us.",
  // Two reception events, each with its own date, venue and map, listed in
  // the order a guest would attend them (chronological).
  receptions: [
    {
      id: "tiruvannamalai",
      city: "Tiruvannamalai",
      icon: "glass",
      date: "20 Nov 2026",
      time: "6:30 PM onwards",
      // ISO with timezone (IST). Used for this reception's countdown + calendar.
      start: "2026-11-20T18:30:00+05:30",
      end: "2026-11-20T21:30:00+05:30",
      venue: "Andal Singaravelu Thirumana Mahal",
      address: "Vengikkal, Tiruvannamalai",
      mapUrl: "https://maps.app.goo.gl/HyzTCP1gKWpxZMTw7",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7797.6049327328!2d79.05833269357912!3d12.26164290000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacc0fe57aaaaab%3A0x5ee610624419a92c!2sAndal%20Singaravelu%20Thirumana%20Mahal!5e0!3m2!1sen!2sin!4v1791312733126!5m2!1sen!2sin",
    },
    {
      id: "hosur",
      city: "Hosur",
      icon: "glass",
      date: "22 Nov 2026",
      time: "11:30 AM onwards",
      start: "2026-11-22T11:30:00+05:30",
      end: "2026-11-22T14:30:00+05:30",
      venue: "Chili Pili Resort",
      address: "Kelamangalam, Hosur",
      mapUrl: "https://maps.app.goo.gl/8eQTcaSExmzK16pX7",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776151.120692316!2d76.00843166442388!3d12.59967399393948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae7f003c7fe0c9%3A0x3ab5f8085ff28951!2sCHILI%20PILI%20RESORT!5e0!3m2!1sen!2sin!4v1791312511194!5m2!1sen!2sin",
    },
  ],
  // Kept as-is at the user's request (placeholder narrative, not real info).
  story: [
    { year: "", title: "We Met", text: "" },
    { year: "8 Feb 2026", title: "Engagement", text: "Surrounded by family and friends, we exchanged rings and began our journey together." },
    { year: "2026", title: "Tying the Knot", text: "With our families beside us, we begin our beautiful life together." },
  ],
  // Put photos in /public/images and list them here. Placeholders use gradients.
  gallery: [] as string[],
  music: "/music/wedding.mp3", // drop an mp3 here
};
export type Wedding = typeof wedding;
export type Reception = Wedding["receptions"][number];
