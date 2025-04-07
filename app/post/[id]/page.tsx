import { prisma } from "@/app/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";

// Define the props type with params as a Promise
type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

async function getPost(id: string) {
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    return notFound();
  }

  return post;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await the params Promise to get the actual values
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src={post.authorImage || "/default-avatar.png"}
                  alt={post.authorName || "Unknown Author"}
                  fill
                  className="rounded-full object-cover"
                  sizes="50px"
                />
              </div>
              <span className="font-medium">
                {post.authorName || "Unknown Author"}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {post.imageUrl && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
        </header>

        {/* Post Content */}
        <div
          className="[&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Post Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src={post.authorImage || "/default-avatar.png"}
                alt={post.authorName || "Unknown Author"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">
                {post.authorName || "Unknown Author"}
              </p>
              <p className="text-sm text-gray-500">
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </footer>
      </article>

      {/* Comments Section */}
      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Discussion</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            Comments will be available soon. Check back later!
          </p>
        </div>
      </section>
    </div>
  );
}

// Optional: Configure runtime for server-side rendering
export const dynamic = "force-dynamic"; // Ensures the page is always server-rendered