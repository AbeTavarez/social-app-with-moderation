"use server";
import OpenAI from "openai";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Moderation API
 * @param text
 * @returns
 */
export async function moderate(text: string) {
  console.log(text);
  const supabase = createClient();

  if (!text) {
    return {
      error: "Text is required!",
    };
  }

  try {
    const moderationResult = await openAI.moderations.create({
      input: text,
    });

    console.log(moderationResult);
    console.log(moderationResult.results[0].category_scores);
    console.log(moderationResult.results[0].categories);

    if (moderationResult.results[0].flagged) {
      return {
        flagged: true,
        msg: "Your post contains inappropriate content",
      };
    } else {
      await supabase.from("posts").insert({ text });
      revalidatePath("/feed");
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * Fetch posts
 * @returns posts from posts table
 */
export async function fetchPosts() {
  const supabase = createServerClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error("Error fetching posts...");

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Fetch post by id
 * @param postId
 * @returns
 */
export async function getPost(postId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId);

    if (error) throw new Error(error.message);

    return data[0];
  } catch (e) {
    console.log(e);
  }
}

/**
 * Deletes a post by the id
 * @param postId
 */
export async function deletePost(postId: string) {
  const supabase = createServerClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    console.log(data);
    console.log(error);

    if (error) throw new Error(`Error deleting post ${postId}`);
  } catch (e) {
    console.log(e);
  } finally {
    redirect("/feed");
  }
}


/**
 * Updates post by id
 * @param postId 
 * @param newPostText 
 */
export async function updatePost(postId: string, newPostText: string) {
  const supabase = createServerClient();

  try {
    const { error } = await supabase
      .from("posts")
      .update({ text: newPostText })
      .eq("id", postId);

      if (error) throw new Error(`Error updating post ${postId}`)
  } catch (e) {
    console.log(e);
  } finally {
    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
  }
}

/**
 *
 * @param postId
 */
export async function navigateToEditPage(postId: string) {
  redirect(`/posts/${postId}/edit`);
}
