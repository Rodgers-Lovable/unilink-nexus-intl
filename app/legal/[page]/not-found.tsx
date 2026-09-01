import Link from "next/link";

export default function LegalPageNotFound() {
  return (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Page not found</h1>
      <Link href="/" className="mt-4 inline-block text-sm font-semibold text-blue hover:underline">
        Back to home
      </Link>
    </div>
  );
}
