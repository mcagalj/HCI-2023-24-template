interface Params {
  postId: string;
}

export interface BlogPostParams {
  params: Params;
}

export default function BlogPost({ params }: BlogPostParams) {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-3xl font-bold p-10">Post #{params.postId}</h1>
    </main>
  );
}
