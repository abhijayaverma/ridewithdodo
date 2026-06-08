import { SearchPanel } from "@/components/rides/search-panel";

const stats = ["100K+ user-ready architecture", "Verified driver workflow", "Escrow-ready payments", "Live chat and ride status"];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="font-semibold text-brand-700">Scheduled shared rides</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-7xl">Travel smarter with trusted co-riders.</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            RideShareX helps verified drivers publish planned trips and passengers book affordable seats with payments, chat, live status, reviews, and safety tooling.
          </p>
          <div className="mt-8"><SearchPanel /></div>
        </div>
        <div className="card bg-gradient-to-br from-slate-950 to-brand-700 text-white">
          <h2 className="text-2xl font-bold">Tonight's Bengaluru to Mysuru pool</h2>
          <p className="mt-2 text-slate-200">3 seats left. Verified driver. AC sedan. 4.9 rating.</p>
          <div className="mt-8 grid gap-4">
            {stats.map((stat) => <div key={stat} className="rounded-2xl bg-white/10 p-4">{stat}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
