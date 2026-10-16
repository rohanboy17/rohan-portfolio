import Link from "next/link";
import Clip3D from "@/components/ui/Clip3D";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pt-24 text-center">
      <div>
        <Clip3D name="rocket" size={140} float priority className="mx-auto" />
        <h1 className="mt-6 font-display text-5xl font-semibold">Lost in space</h1>
        <p className="mt-3 text-muted">This page doesn&apos;t exist — but my projects do.</p>
        <Link href="/" className="btn-clay mt-8 inline-flex rounded-full bg-lilac px-6 py-3 font-semibold text-ink">
          Back home
        </Link>
      </div>
    </section>
  );
}
