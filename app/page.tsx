import Image from "next/image";
import Link from "next/link";
import { prisma } from "./utils/db";

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 6
  });
  return data;
}

interface BlogPostCardProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
}

function BlogPostCard({
  id,
  title,
  imageUrl,
  authorName,
  authorImage,
  createdAt,
  content
}: BlogPostCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <Link href={`/post/${id}`} className="block w-full h-full">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
              Technology
            </span>
            <span className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-2">{title}</h3>
          <p className="text-gray-600 line-clamp-2 mb-4">{content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white shadow-sm">
                <Image 
                  src={authorImage}
                  alt={authorName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <p className="ml-2 text-sm font-medium text-gray-700">{authorName}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default async function Home() {
  const data = await getData();
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/hero-bg.jpg"
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Amazing Content</h1>
            <p className="text-xl text-gray-300 mb-8">Explore our latest articles on technology, design, and more.</p>
            <div className="flex justify-center gap-4">
              <Link href="/explore" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                Explore Posts
              </Link>
              <Link href="/about" className="px-6 py-3 bg-transparent hover:bg-white/10 border border-white rounded-lg font-medium transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
            <Link href="/posts" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((post) => (
              <BlogPostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to get the latest posts delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}