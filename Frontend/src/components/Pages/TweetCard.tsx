import { ClipboardCopy, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Tag = {
  _id: string;
  title: string;
};

type User = {
  _id: string;
  firstName: string;
};

type ContentItem = {
  _id: string;
  link: string;
  type: string;
  title: string;
  tags: Tag[];
  userId: User;
  description: string;
};

interface TweetCardProps {
  item: ContentItem;
}

declare global {
  interface Window {
    twttr?: any;
  }
}

const TweetCard: React.FC<TweetCardProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);
  const tweetRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(
        import.meta.env.VITE_API_URL_FETCH_CONTENT_USING_URL + textToCopy
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const extractTweetId = (url: string): string => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : "";
  };

  useEffect(() => {
    const tweetId = extractTweetId(item.link);
    const container = tweetRef.current;
    if (!tweetId || !container) return;

    // Remove existing tweet node if any
    container.innerHTML = "";

    const loadTwitterWidget = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets
          .createTweet(tweetId, container, {
            conversation: "none",
            align: "center",
            theme: "dark",
          })
          .catch((err: any) => console.error("Twitter embed error", err));
      }
    };

    // Ensure only one script is loaded
    if (!window.twttr) {
      const existingScript = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = loadTwitterWidget;
        document.body.appendChild(script);
      } else {
        existingScript.addEventListener("load", loadTwitterWidget);
      }
    } else {
      loadTwitterWidget();
    }

    // Clean up duplicates
    return () => {
      container.innerHTML = "";
    };
  }, [item.link]);

  return (
    <div className="w-[350px] flex flex-col justify-between bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4 max-w-md h-full">
      <div ref={tweetRef}></div>

      <div className="flex justify-between items-start mb-2 mt-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {item.title}
        </h2>
        <button
          onClick={() => handleCopy(item.link)}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200 transition duration-200"
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <ClipboardCopy size={16} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-2">
        {item.tags.map((tag) => (
          <span
            key={tag._id}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
          >
            {tag.title}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto">
        Uploaded by <strong>{item.userId.firstName}</strong>
      </p>
    </div>
  );
};

export default TweetCard;
