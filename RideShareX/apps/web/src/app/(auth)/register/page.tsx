import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="card">
        <h1 className="text-3xl font-black">Create account</h1>
        <form className="mt-6 grid gap-4">
          <Input placeholder="Full name" />
          <Input type="email" placeholder="Email" />
          <Input placeholder="Phone" />
          <Input type="password" placeholder="Password" />
          <select className="rounded-xl border p-2 dark:bg-slate-950">
            <option>Passenger</option>
            <option>Driver</option>
          </select>
          <Button>Register</Button>
        </form>
      </div>
    </main>
  );
}
