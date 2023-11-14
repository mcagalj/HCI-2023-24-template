const CardSkeleton = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg mb-4 h-full animate-pulse">
      <div className="w-full h-56 bg-slate-300" />
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2 capitalize text-purple-500">
          Loading...
        </h2>
      </div>
    </div>
  );
};

export default function Loading() {
  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10">Loading Blog Index Page</h1>

      <ul className="grid md:grid-cols-2 gap-12 w-full">
        {[...Array(4)].map((_, index) => (
          <li key={index}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </main>
  );
}
