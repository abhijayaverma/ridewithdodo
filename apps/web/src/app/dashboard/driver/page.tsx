const metrics = ["Total rides", "Total earnings", "Monthly earnings", "Ratings", "Reviews", "Occupancy rate"];

export default function DriverDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Driver dashboard</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Create rides after verification, manage bookings, and track earnings.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => <section className="card" key={metric}><h2 className="font-bold">{metric}</h2><div className="mt-4 h-24 rounded-xl bg-slate-100 dark:bg-slate-800" /></section>)}
      </div>
    </main>
  );
}
