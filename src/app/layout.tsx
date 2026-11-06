import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter, Noto_Serif_Tamil, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { wedding } from "@/data/wedding";
import ImageGuard from "@/components/ImageGuard";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const script = Great_Vibes({ variable: "--font-script", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const tamil = Noto_Serif_Tamil({ variable: "--font-tamil", subsets: ["tamil", "latin"], weight: ["400", "600"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["500", "600", "700"] });

const cities = wedding.receptions.map((r) => r.city).join(" & ");
const title = "Sri Harini and Sudharshan Wedding & Reception Invite";
// Link previews (WhatsApp, Instagram, etc.) need absolute URLs, so share
// tags resolve against the live GitHub Pages address (base path included).
const siteUrl = `https://hamandakkumars.github.io${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;
const shareImage = { url: "/images/share-preview.jpg", width: 1200, height: 630, alt: `${wedding.bride.name} & ${wedding.groom.name}` };
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: `You are invited to the wedding celebrations of ${wedding.bride.name} & ${wedding.groom.name} in ${cities}. ${wedding.hashtag}`,
  openGraph: { title, description: "Join us in celebrating our wedding.", type: "website", url: "/", images: [shareImage] },
  twitter: { card: "summary_large_image", title, description: "Join us in celebrating our wedding.", images: [shareImage.url] },
};
export const viewport: Viewport = { themeColor: "#fbf7f0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${script.variable} ${inter.variable} ${tamil.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ImageGuard />
        {children}
      </body>
    </html>
  );
}
