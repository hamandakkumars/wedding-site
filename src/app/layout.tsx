import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter, Noto_Serif_Tamil, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { wedding } from "@/data/wedding";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const script = Great_Vibes({ variable: "--font-script", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const tamil = Noto_Serif_Tamil({ variable: "--font-tamil", subsets: ["tamil", "latin"], weight: ["400", "600"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["500", "600", "700"] });

const cities = wedding.receptions.map((r) => r.city).join(" & ");
const title = `${wedding.bride.name} & ${wedding.groom.name} — Reception Invitation`;
export const metadata: Metadata = {
  title,
  description: `You are invited to the wedding reception of ${wedding.bride.name} & ${wedding.groom.name} in ${cities}. ${wedding.hashtag}`,
  openGraph: { title, description: "Join us in celebrating our wedding receptions.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#fbf7f0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${script.variable} ${inter.variable} ${tamil.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
