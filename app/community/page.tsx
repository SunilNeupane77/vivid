import { Calendar, Construction, Mail, Users } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Construction className="h-10 w-10 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Community Coming Soon</h1>
        <p className="text-gray-600 mb-6">
          We're building an amazing community space for you to connect with others. 
          Stay tuned for updates!
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <Users className="h-5 w-5 text-blue-500" />
            <span>Connect with other members</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>Join upcoming events</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Get notified when we launch</h3>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Mail className="mr-2 h-4 w-4" />
              Notify Me
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}