import { SearchPanel } from "@/components/rides/search-panel";

const rides = [
  { from: "Indiranagar", to: "Mysuru", price: 650, rating: 4.9, seats: 3 },
  { from: "Whitefield", to: "Electronic City", price: 180, rating: 4.7, seats: 2 }
];

export default function RideSearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">Search rides</h1>
      <div className="mt-6"><SearchPanel /></div>
      <div className="mt-8 grid gap-4">
        {rides.map((ride) => (
          <article className="card" key={`${ride.from}-${ride.to}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">{ride.from} to {ride.to}</h2>
                <p className="text-slate-600 dark:text-slate-300">Verified driver. {ride.rating} rating. {ride.seats} seats.</p>
              </div>
              <div className="text-2xl font-black">Rs {ride.price}</div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
