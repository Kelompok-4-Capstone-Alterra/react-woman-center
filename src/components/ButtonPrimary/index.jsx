import React from 'react';

function ButtonPrimary({
  type = 'submit',
  className = '',
  processing,
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      className={
        `bg-primaryMain border-primaryBorder hover:bg-primaryHover active:bg-primaryPressed hover:outline-primaryHover 
        focus:outline-none h-9 w-[130.4px] rounded-[3px] text-white text-xs transition ${
          processing && 'opacity-25'
        } ` + className
      }
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary