import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from 'react';

const GuidesPage = async (): Promise<ReactElement> => {
  const guides = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Helpful Guides</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Step-by-step tutorials and comprehensive resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>

      {guides.length === 0 && <EmptyState />}
    </div>
  );
};

const GuideCard = ({ guide }: { guide: any }): ReactElement => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
    <Link href={`/guides/${guide.id}`} className="block h-full">
      <div className="relative h-48 w-full bg-gray-50">
        {guide.imageUrl && (
          <Image
            src={guide.imageUrl}
            alt={guide.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {guide.category || 'General'}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(guide.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-3">{guide.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {guide.description || guide.content.substring(0, 150)}...
          </p>
        </div>
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          <div className="relative w-8 h-8 mr-3">
            <Image
              src={guide.authorImage}
              alt={guide.authorName}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">{guide.authorName}</span>
        </div>
      </div>
    </Link>
  </div>
);

const EmptyState = (): ReactElement => (
  <div className="text-center py-20">
    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    </div>
    <h3 className="text-xl font-medium mb-2">No guides available</h3>
    <p className="text-gray-500 max-w-md mx-auto">Check back later for new guides</p>
  </div>
);

export default GuidesPage;