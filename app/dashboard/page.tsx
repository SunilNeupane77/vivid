import { BlogPostCard } from "@/components/general/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { prisma } from "../utils/db";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

async function getData(userId: string): Promise<BlogPost[]> {
  return await prisma.blogPost.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="p-4 text-center">
        Please sign in to view your blog posts
      </div>
    );
  }

  const posts = await getData(user.id);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">No blog posts found. Create your first post!</p>
          <Link className={buttonVariants()} href="/dashboard/create">
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              imageUrl={post.imageUrl}
              authorName={post.authorName}
              authorImage={post.authorImage}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              authorId={post.authorId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";