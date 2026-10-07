import Invitation from "@/components/Invitation";

// Static export (GitHub Pages has no server): the ?to= guest personalisation
// is now read client-side inside <Invitation>, so this page itself needs no
// per-request data and can be fully prerendered.
export default function Home() {
  return <Invitation />;
}
