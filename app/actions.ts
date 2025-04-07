"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("url") as string;

  try {
    await prisma.blogPost.create({
      data: {
        title,
        content,
        imageUrl,
        authorId: user.id,
        authorImage: user.picture ?? "/default-avatar.png",
        authorName: user.given_name ?? "Anonymous",
      }
    });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    throw new Error("Failed to create blog post");
  }

  return redirect("/dashboard");
}