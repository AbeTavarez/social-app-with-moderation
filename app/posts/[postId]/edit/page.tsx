"use client";
import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import { getPost, updatePost } from "@/actions";

export default function EditPost() {
  const { postId } = useParams();
  const [newPostText, setNewPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(postId as string);
      setNewPostText(post.text);
    };

    fetchPost();
  }, [postId]);



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        if (!postId || newPostText.length < 1) {
            setError('Error, please try again');
            // set loading to false if there is an error
            setLoading(false);
            return;
        }

        await updatePost(postId as string, newPostText);
        
    } catch (e) {
        console.log(e);
        
    }
  }

  return (
    <div className="my-5 border p-3 rounded">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="post_text">
          <input
            type="text"
            name="post_text"
            id="post_text"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          />
        </label>

        <div>
          <input type="submit" value={loading ? "Updating..." : "Save"} />
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
