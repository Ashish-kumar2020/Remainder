import classNames from "classnames";

interface CustomButtonProps{
  text: string;
  onClick : () => void;
  variant?: "primary" | "secondary" | "danger";
  size: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  tooltip?: string;

  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    text,
    onClick,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    icon,
    fullWidth = false,
    rounded = false,
    tooltip,
    bgColor,
    textColor,
    hoverColor,
  } = props;
  const baseStyle = "flex items-center justify-center font-semibold focus:outline-none transition-transform duration-150 ease-in-out transform hover:scale-105";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary : "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600"
  }

  const sizeStyles = {
    sm : "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg"
  }

  const customStyles = `${bgColor || ""} ${textColor || ""} ${hoverColor ? `hover:${hoverColor}`: ""}`;
  return (
   <button onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={classNames(
        baseStyle,
        !bgColor ? variantStyles[variant] : "",
        sizeStyles[size],
        customStyles,
        {
          "w-full": fullWidth,
          "opacity-50 cursor-not-allowed": disabled || loading,
          "rounded-full": rounded,
          "rounded-md": !rounded,
        }
      )} 
   
   >
    {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
   </button>
  )
}

export default CustomButton