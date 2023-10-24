import Link from "next/link";

export const metadata = {
  title: "Blog",
};

const posts = [12, 3, 56, 7, 89];

export default function Blog() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-3xl font-bold p-10">Blog Page</h1>
      <ul className="flex flex-col gap-8">
        {posts.map((postId) => (
          <li key={postId}>
            <Link href={`blog/${postId}`}>Post {postId}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
