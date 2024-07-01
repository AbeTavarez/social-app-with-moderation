import { Metadata } from "next";
import { fetchPosts } from "@/actions";
import CreatePostForm from "@/components/create-post-form";

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

      {posts && posts.map(post => <div key={post.id}>{post.text}</div>)}
    </div>
  );
}
