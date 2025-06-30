import classNames from "classnames";

interface CustomButtonProps {
    text: string;
    onClick: ()=> void;
    variant : "primary" | "secondary" | "danger";
    size : "xs" |"sm" | "md" | "lg";
    loading?: boolean;
    icon: React.ReactNode;
    disabled?: boolean
   
}

const CustomButton = (props: CustomButtonProps)=>{
    const {text,onClick, variant="primary" , size="md", loading = false, icon,disabled= false } = props;
    const variantStyles = {
        primary:
          "bg-primaryBlue text-white hover:bg-primaryBlueHover focus:ring-primaryFocusRing",
        secondary:
          "bg-white text-primaryBlue border border-primaryBlue hover:bg-primaryBlue hover:text-white focus:ring-primaryFocusRing",
        danger:
          "bg-dangerRed text-white hover:bg-dangerRedHover focus:ring-dangerFocusRing",
      };

      const sizeStyles = {
        xs: "px-1 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      };

      const baseStyles ="font-medium rounded-customRadiusPrimaryLg focus:outline-none focus:ring-4 me-2 mb-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

      return(
        <button 
            onClick={onClick}
            className={classNames(
                baseStyles,
               variantStyles[variant],
               sizeStyles[size]
            )}
            disabled={disabled || loading}
        >
        {loading ? (
                <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>
            ) : (
                <>
                {icon && <span>{icon}</span>}
                <span>{text}</span>
                </>
            )}
        </button>
      )
}

export default CustomButton