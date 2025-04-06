
const AboutLoading = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 animate-pulse">
      {/* Header Loading */}
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-200 rounded-full w-3/4 mx-auto mb-6"></div>
        <div className="w-20 h-1 bg-gray-200 mx-auto mb-6"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>

      {/* Mission Section Loading */}
      <div className="mb-16">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>

      {/* Values Section Loading */}
      <div className="mb-16">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-l-4 border-gray-200 pl-4 py-2">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section Loading */}
      <div className="mb-16">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="flex flex-wrap gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutLoading;