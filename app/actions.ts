"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";

// Define expected form fields (optional but good practice)
interface BlogPostForm {
  title: string;
  content: string;
  url: string;
}

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // 🔐 Redirect unauthenticated users
  if (!user) {
    return redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }

  // 🧠 Safely extract form values
  const data: BlogPostForm = {
    title: (formData.get("title") ?? "").toString().trim(),
    content: (formData.get("content") ?? "").toString().trim(),
    url: (formData.get("url") ?? "").toString().trim(),
  };

  // ✅ Basic server-side validation (expand as needed)
  if (!data.title || !data.content || !data.url) {
    throw new Error("All fields are required");
  }

  try {
    await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.url,
        authorId: user.id,
        authorImage: user.picture || "/default-avatar.png",
        authorName: user.given_name || "Anonymous",
      },
    });
  } catch (error) {
    console.error("❌ Failed to create blog post:", error);
    throw new Error("Failed to create blog post");
  }

  // 🚀 Redirect to dashboard on success
  return redirect("/dashboard");
}
