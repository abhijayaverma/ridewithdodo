"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchPanel() {
  return (
    <form className="grid gap-3 rounded-3xl bg-white p-4 shadow-xl dark:bg-slate-900 md:grid-cols-5">
      <Input placeholder="From" aria-label="Source" />
      <Input placeholder="To" aria-label="Destination" />
      <Input type="date" aria-label="Date" />
      <Input type="number" min={1} defaultValue={1} aria-label="Passengers" />
      <Button type="submit">Find rides</Button>
    </form>
  );
}
