import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10, // Limit to 10 most recent posts
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.id}`}>
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src={post.authorImage}
                      alt={post.authorName}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.authorName}</p>
                    <p className="text-sm text-gray-500">
                      Posted on {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}