'use server';
import OpenAI from "openai";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
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
            error: 'Text is required!'
        }
    }

    try {
        const moderationResult = await openAI.moderations.create({
            input: text
        });

        console.log(moderationResult);
        console.log(moderationResult.results[0].category_scores);
        console.log(moderationResult.results[0].categories);

        if (moderationResult.results[0].flagged) {
            return {
                flagged: true,
                msg: 'Your post contains inappropriate content'
            }
        } else {
            await supabase.from('posts').insert({text});
            revalidatePath('/feed');
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
    return data
  } catch (e) {
    console.log(e);
  }

}
