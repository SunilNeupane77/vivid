// app/explore/page.tsx

import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { FiArrowRight, FiCalendar, FiSearch } from "react-icons/fi";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorImage: string;
  authorName: string;
  createdAt: Date;
}

// FIXED: Correct typing for PageProps in Next.js App Router
type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

async function getPosts(searchParams?: PageProps["searchParams"]): Promise<Post[]> {
  const searchQuery =
    typeof searchParams?.search === "string" ? searchParams.search : undefined;

  return await prisma.blogPost.findMany({
    where: {
      title: searchQuery ? { contains: searchQuery, mode: "insensitive" } : undefined,
    },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function ExplorePage({
  searchParams,
}: PageProps): Promise<ReactElement> {
  const posts = await getPosts(searchParams);
  const searchTerm =
    typeof searchParams?.search === "string" ? searchParams.search : "";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore Our Content
            </h1>
            <form className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search posts..."
                  defaultValue={searchTerm}
                  className="block w-full pl-10 pr-12 py-4 border border-transparent rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-r-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm ? `Search: "${searchTerm}"` : "All Posts"}
          </h2>
          <div className="text-sm text-gray-500">
            {posts.length} {posts.length === 1 ? "post" : "posts"} found
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/post/${post.id}`} className="block h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                          <Image
                            src={post.authorImage}
                            alt={post.authorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {post.authorName}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto mb-6 text-gray-300">
              <FiSearch className="h-20 w-20 inline-block" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different search term.`
                : "There are currently no posts available."}
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Clear search
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
