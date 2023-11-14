import Image from "next/image";
import { Post } from "@/app/blog/page";

const BlogPostCard = ({ post }: { post: Post }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg mb-4 h-full">
      <Image
        className="w-full h-56 object-cover object-center"
        src="https://via.placeholder.com/400x300"
        width={400}
        height={300}
        alt="Blog Post"
      />
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2 capitalize text-purple-500">
          {post.title}
        </h2>
      </div>
    </div>
  );
};

export default BlogPostCard;
