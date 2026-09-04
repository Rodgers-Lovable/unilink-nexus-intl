import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServiceNotFound() {
  return (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Service not found</h1>
      <Button asChild variant="cta" className="mt-6">
        <Link href="/services">Back to services</Link>
      </Button>
    </div>
  );
}
