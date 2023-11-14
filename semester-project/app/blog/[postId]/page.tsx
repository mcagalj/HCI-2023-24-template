import { getPost } from "@/app/blog/lib/api";

type Params = {
  postId: string;
};

export async function generateMetadata({ params }: { params: Params }) {
  return {
    title: `Post ${params.postId}`,
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPost(params.postId);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10 capitalize">
        <span className="text-neutral-400">Post {post.id}:</span> {post.title}
      </h1>
      <p className="text-xl p-10">{post.body}</p>
    </main>
  );
}
