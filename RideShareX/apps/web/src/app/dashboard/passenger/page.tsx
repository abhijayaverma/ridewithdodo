const cards = ["Upcoming rides", "Completed rides", "Saved locations", "Wallet balance", "Favorite drivers", "Reviews"];

export default function PassengerDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Passenger dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => <section className="card" key={card}><h2 className="font-bold">{card}</h2><p className="mt-3 text-3xl font-black">--</p></section>)}
      </div>
    </main>
  );
}
