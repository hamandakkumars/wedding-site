import Invitation from "@/components/Invitation";

export default async function Home({ searchParams }: { searchParams: Promise<{ to?: string | string[] }> }) {
  const { to } = await searchParams;
  const raw = Array.isArray(to) ? to[0] : to;
  // Personalised greeting: /?to=Ravi%20%26%20Family
  const guest = raw?.trim().slice(0, 60) || undefined;
  return <Invitation guest={guest} />;
}
