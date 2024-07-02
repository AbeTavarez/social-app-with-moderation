import { Metadata } from "next";
import { fetchPosts } from "@/actions";
import CreatePostForm from "@/components/create-post-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Feed",
  description: "See posts from all over the world!",
};

export default async function Feed() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Feed Page</h1>

      <CreatePostForm />

      {posts &&
        posts.map((post) => (
          <Link className="block hover:bg-gray-800" href={`/posts/${post.id}`} key={post.id}>
            {post.text}
          </Link>
        ))}
    </div>
  );
}
