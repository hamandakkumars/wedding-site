import type { Metadata } from "next";
import ModernInvitation from "@/components/modern/ModernInvitation";
import { wedding } from "@/data/wedding";

const title = `${wedding.bride.name} & ${wedding.groom.name} — Wedding Invitation`;
export const metadata: Metadata = {
  title,
  description: `You are invited to the wedding celebrations of ${wedding.bride.name} & ${wedding.groom.name}. ${wedding.hashtag}`,
  openGraph: { title, description: "Join us in celebrating our wedding.", type: "website" },
};

// Static export (GitHub Pages has no server): the ?to= guest personalisation
// is now read client-side inside <ModernInvitation>, so this page itself
// needs no per-request data and can be fully prerendered.
export default function ModernPage() {
  return <ModernInvitation />;
}
