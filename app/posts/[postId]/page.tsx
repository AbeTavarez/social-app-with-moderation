import { getPost, deletePost } from "@/actions";
import Button from "@/components/button";

type Props = {
  params: {
    postId: string;
  };
  searchParams: string[];
};

export default async function Post({ params, searchParams }: Props) {
  const { postId } = params;
  const post = await getPost(postId);

  const { text, likes, reposts } = post;

  return (
    <div>
      <div>{text}</div>

      <div className="flex space-x-4 mt-2">
        <div>Likes: {likes}</div>
        <div>Reposts: {reposts}</div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button btnText="Delete" postId={postId} handler={deletePost} />
        <button>update</button>
      </div>
    </div>
  );
}
