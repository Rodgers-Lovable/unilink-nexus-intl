import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ArticleNotFound() {
  return (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Article not found</h1>
      <Button asChild variant="cta" className="mt-6">
        <Link href="/resources">Back to resources</Link>
      </Button>
    </div>
  );
}
