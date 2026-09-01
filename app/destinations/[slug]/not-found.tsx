import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DestinationNotFound() {
  return (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Destination not found</h1>
      <p className="lead mt-3">This destination is not available.</p>
      <Button asChild variant="cta" className="mt-6">
        <Link href="/destinations">Back to destinations</Link>
      </Button>
    </div>
  );
}
