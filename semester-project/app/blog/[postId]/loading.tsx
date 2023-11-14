export default async function Loading() {
  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10 animate-pulse">
      <h1 className="text-3xl font-bold p-10 capitalize">
        <span className="text-neutral-400">Post ID:</span> Blog Post Title
      </h1>
      <p className="text-xl p-10">Loading ...</p>
    </main>
  );
}
