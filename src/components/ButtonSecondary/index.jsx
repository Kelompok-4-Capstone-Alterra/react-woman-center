const ButtonSecondary = ({
  type = "submit",
  className = "",
  processing,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={
        `box-border min-h-[45px] bg-secondaryMain border-secondaryBorder hover:bg-secondaryHover active:bg-secondaryPressed hover:border-secondaryHover py-3 px-3 rounded-[3px] text-white text-base transition ${
          processing ? "opacity-25" : ""
        }` + className
      }
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
