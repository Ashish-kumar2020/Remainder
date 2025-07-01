import classNames from "classnames";

interface CustomCardComponet {
  imageURL: string;
  title: string;
  tag: string;
  loading?: boolean;
  size: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const CustomCard = (props: CustomCardComponet) => {
  const { imageURL, title, tag, loading = false, size, icon } = props;

  const sizeStyles = {
    sm: "max-w-xs text-sm",
    md: "max-w-sm text-base",
    lg: "max-w-md text-lg",
  };

  return (
    <div
      className={classNames(
        "relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700",
        sizeStyles[size]
      )}
    >
      {icon && <div className="cursor-pointer absolute top-2 right-2 z-40">{icon}</div>}
      {loading ? (
        <div className="w-full h-[200px] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <img
          className="rounded-t-lg object-cover w-full aspect-[4/3] "
          src={imageURL}
          alt={title}
        />
      )}

      <div className="p-5">
        <span className="text-xs font-semibold text-gray-400 uppercase">
          {tag}
        </span>
        <h5 className="mt-1 mb-2 font-bold text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="text-gray-700 dark:text-gray-400 text-sm">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
};

export default CustomCard;
