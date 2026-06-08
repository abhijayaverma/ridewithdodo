import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-black">RideShareX</Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/rides/search">Search</Link>
          <Link href="/dashboard/passenger">Passenger</Link>
          <Link href="/dashboard/driver">Drive</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <Link href="/login"><Button>Login</Button></Link>
      </div>
    </header>
  );
}
