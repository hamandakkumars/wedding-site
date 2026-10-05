import type { Metadata } from "next";
import ModernInvitation from "@/components/modern/ModernInvitation";
import { wedding } from "@/data/wedding";

const title = `${wedding.bride.name} & ${wedding.groom.name} — Reception Invitation`;
export const metadata: Metadata = {
  title,
  description: `You are invited to the wedding reception of ${wedding.bride.name} & ${wedding.groom.name}. ${wedding.hashtag}`,
  openGraph: { title, description: "Join us in celebrating our wedding receptions.", type: "website" },
};

export default async function ModernPage({ searchParams }: { searchParams: Promise<{ to?: string | string[] }> }) {
  const { to } = await searchParams;
  const raw = Array.isArray(to) ? to[0] : to;
  const guest = raw?.trim().slice(0, 60) || undefined;
  return <ModernInvitation guest={guest} />;
}
