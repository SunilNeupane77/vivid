import { BlogPostCard } from "@/components/general/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { prisma } from "../utils/db";

// Define the type for your blog post data, matching Prisma schema
type BlogPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

// Define props expected by BlogPostCard
interface BlogPostCardProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  createdAt?: string; // Formatted date string
  updatedAt?: string; // Formatted date string
  // authorId omitted unless explicitly needed by BlogPostCard
}

async function getData(userId: string): Promise<BlogPost[]> {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      authorName: true,
      authorImage: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function CreateBlogRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return <div>Please sign in to view your blog posts</div>;
  }

  const data = await getData(user.id);

  if (!data || data.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Your Blog Articles</h2>
          <Link className={buttonVariants()} href={"/dashboard/create"}>
            Create Post
          </Link>
        </div>
        <p>No blog posts found. Create your first post!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link className={buttonVariants()} href={"/dashboard/create"}>
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item: BlogPost) => {
          // Explicitly type the props object to satisfy BlogPostCardProps
          const blogPostCardProps: BlogPostCardProps = {
            id: item.id,
            title: item.title,
            content: item.content,
            imageUrl: item.imageUrl || "/default-cover.jpg",
            authorName: item.authorName || "Unknown Author",
            authorImage: item.authorImage || "/default-avatar.jpg",
            createdAt: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : undefined,
            updatedAt: item.updatedAt
              ? new Date(item.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : undefined,
          };
          return <BlogPostCard key={item.id} {...blogPostCardProps} />;
        })}
      </div>
    </div>
  );
}

// Configure runtime for server-side rendering
export const dynamic = "force-dynamic"; // Ensures the page is always server-rendered