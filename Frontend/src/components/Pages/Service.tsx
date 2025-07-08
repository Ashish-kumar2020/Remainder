const Service = () => {
    const services = [
      {
        title: "Store Media",
        description: "Easily save YouTube videos, image URLs, tweets, or article links to your second brain for future reference.",
        icon: "🧠",
      },
      {
        title: "Add Custom Tags",
        description: "Organize your saved content with your own tags for quick search and smart categorization.",
        icon: "🏷️",
      },
      {
        title: "Link Sharing",
        description: "Generate a shareable link to give others a view into your stored tasks and references.",
        icon: "🔗",
      },
      {
        title: "Access Anytime",
        description: "Your saved content is always available from any device, securely synced and backed up.",
        icon: "🌐",
      },
    ];
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 px-6 md:px-12 text-gray-900 dark:text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
            Explore how your second brain helps you stay organized and productive.
          </p>
  
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Service;
  