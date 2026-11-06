import ModernInvitation from "@/components/modern/ModernInvitation";

// Title, description and share preview come from the root layout.
// Static export (GitHub Pages has no server): the ?to= guest personalisation
// is now read client-side inside <ModernInvitation>, so this page itself
// needs no per-request data and can be fully prerendered.
export default function ModernPage() {
  return <ModernInvitation />;
}
