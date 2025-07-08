export default function AboutPage() {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12 mt-[70px] mr-[80px]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            🧠 About <span className="text-blue-600">Second Brain</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
            Organize your thoughts. Store your links. Share your tasks. Let your second brain remember so you can focus on what truly matters.
          </p>
        </div>
  
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">🔖 Save Anything</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Store YouTube links, article URLs, images, or notes — all in one place.
            </p>
          </div>
  
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">🏷️ Add Custom Tags</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Organize your saved content using personalized tags to make it easy to find later.
            </p>
          </div>
  
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">🤝 Share Easily</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Share your list with others so they can see what tasks you’re tracking or what you’re learning.
            </p>
          </div>
  
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">🗂️ Stay Organized</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Let your second brain be your digital memory. It’s always tidy, always accessible.
            </p>
          </div>
        </div>
  
        <div className="text-center mt-16">
          <p className="text-md text-gray-600 dark:text-gray-400">
            Second Brain — because your real brain deserves a break.
          </p>
        </div>
      </div>
    );
  }
  