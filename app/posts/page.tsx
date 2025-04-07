import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiSearch } from "react-icons/fi";

// Define the props type with searchParams as a Promise
type PostsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getPosts(searchTerm?: string) {
  return await prisma.blogPost.findMany({
    where: searchTerm
      ? {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { content: { contains: searchTerm, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  // Await the searchParams Promise to get the actual values
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams.search
    ? String(resolvedSearchParams.search)
    : undefined;
  const posts = await getPosts(searchTerm);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our latest articles and insights
        </p>
      </div>

      {/* Search Bar */}
      <form className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            placeholder="Search posts..."
            defaultValue={searchTerm}
            className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/posts/${post.id}`} className="block h-full">
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.imageUrl || "/default-cover.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {(post.content ?? "").substring(0, 150)}...
                  </p>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                        <Image
                          src={post.authorImage || "/default-avatar.jpg"}
                          alt={post.authorName || "Unknown Author"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {post.authorName || "Unknown Author"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-1" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <FiSearch className="w-full h-full" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? `No results for "${searchTerm}". Try a different search term.`
              : "There are currently no posts available."}
          </p>
          {searchTerm && (
            <Link
              href="/posts"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Clear search
            </Link>
          )}
        </div>
      )}
    </main>
  );
}

// Configure runtime for server-side rendering
export const dynamic = "force-dynamic"; // Ensures the page is always server-rendered