import { ReactElement } from 'react';

export default function AboutPage(): ReactElement {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Our Blog</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sharing knowledge and ideas that matter.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            We believe in the power of thoughtful writing to educate, inspire, and connect people. 
            Our mission is to create content that's both meaningful and accessible.
          </p>
          <p>
            In a world of information overload, we focus on quality over quantity - each article is 
            carefully crafted to provide real value to our readers.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "Clarity",
              description: "We make complex ideas easy to understand without oversimplifying."
            },
            {
              title: "Integrity",
              description: "We're honest about what we know and transparent about our sources."
            },
            {
              title: "Curiosity",
              description: "We explore topics deeply and ask the questions our readers care about."
            },
            {
              title: "Community",
              description: "We write for real people, not algorithms, and value reader feedback."
            }
          ].map((value, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Team</h2>
        <p className="text-gray-700 mb-6">
          We're a small team of writers and editors committed to creating quality content.
        </p>
        <div className="flex flex-wrap gap-4">
          {['Sujan', 'Prakriti', 'Aarav', 'Nisha'].map((name) => (
            <div key={name} className="px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-gray-800">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}