"use client";
import { FormEvent, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { moderate } from "@/actions";


export default function CreatePostForm() {
    const [postText, setPostText] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const result = await moderate(postText);
        console.log(result);

        if (result?.flagged) {
            setError(result.msg);
            setLoading(false);
            setPostText('');
        } else {
            setLoading(false);
            setPostText('')
        }
        
    } catch (e) {
        console.log(e);
        setError('Error, please try again!')
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
            placeholder="what's happing?"
            value={postText}
            onChange={e => setPostText(e.target.value)}
          />
        </label>


        <div className="flex items-center justify-between">
            <FaPhotoVideo />
            <input type="submit" className="link border rounded"
            value={loading ? 'Posting...' : 'Post'}
            disabled={loading}
            />
        </div>
        {error && <div className="">{error}</div>}
      </form>
    </div>
  );
}
