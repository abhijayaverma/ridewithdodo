const analytics = ["Total users", "Total drivers", "Active rides", "Revenue", "Cancellation rate", "Verification requests"];

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Admin command center</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {analytics.map((item) => <section className="card" key={item}><h2 className="font-bold">{item}</h2><p className="mt-3 text-3xl font-black">0</p></section>)}
      </div>
    </main>
  );
}
