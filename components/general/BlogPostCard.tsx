import Image from "next/image";
import Link from "next/link";

interface BlogPostCardProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export function BlogPostCard({
  id,
  title,
  imageUrl,
  authorName,
  authorImage,
  createdAt,
  content
}: BlogPostCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/post/${id}`} className="block w-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{content}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image 
                  src={authorImage}
                  alt={authorName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <p className="ml-2 text-sm font-medium">{authorName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}