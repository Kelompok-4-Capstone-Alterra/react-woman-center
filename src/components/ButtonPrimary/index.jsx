const ButtonPrimary = ({
  type = "submit",
  className = "",
  processing,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={`box-border min-h-[45px] bg-primaryMain hover:bg-primaryHover active:bg-primaryPressed py-3 px-3 rounded-[3px] text-white text-xs transition ${className}`}
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
