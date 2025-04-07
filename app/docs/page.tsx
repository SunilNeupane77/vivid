import { prisma } from "@/app/utils/db";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export default async function DocumentationPage() {
  // Fetch blog posts as documentation items
  const docsItems = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group items into categories (since we're using BlogPost model)
  const docsCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      documents: docsItems.filter(item => item.content.includes("getting started") || item.title.includes("Introduction")),
    },
    {
      id: "guides",
      name: "Guides",
      documents: docsItems.filter(item => !item.content.includes("getting started")),
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="sticky top-20">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <nav className="space-y-1">
            {docsCategories.map((category) => (
              <div key={category.id} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.documents.map((doc) => (
                    <li key={doc.id}>
                      <Link
                        href={`/docs/${doc.id}`}  // Using id since we don't have slug
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <BookOpen className="flex-shrink-0 h-4 w-4 text-gray-400 mr-3" />
                        <span>{doc.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="prose prose-blue max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Documentation
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to our documentation. Find guides, API references, and tutorials to help you get started.
          </p>

          {/* Getting Started Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Getting Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docsCategories[0]?.documents.slice(0, 4).map((doc) => (
                <Link
                  key={doc.id}
                  href={`/docs/${doc.id}`}
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors group"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {doc.content.substring(0, 150)}...
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Guides Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Guides
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {docsCategories[1]?.documents.slice(0, 4).map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/docs/${doc.id}`}
                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors group"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 line-clamp-2">
                      {doc.content.substring(0, 150)}...
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}