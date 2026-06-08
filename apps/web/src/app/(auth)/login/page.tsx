import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="card">
        <h1 className="text-3xl font-black">Welcome back</h1>
        <form className="mt-6 grid gap-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Login</Button>
          <Button className="bg-brand-500 hover:bg-brand-700" type="button">Continue with Google</Button>
        </form>
      </div>
    </main>
  );
}
