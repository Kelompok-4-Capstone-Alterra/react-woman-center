import React from 'react';

function ButtonSecondary({
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
        `bg-secondaryMain border-secondaryBorder hover:bg-secondaryHover active:bg-secondaryPressed hover:outline-secondaryHover
        focus:outline-none h-14 w-[152px] rounded-[3px] text-white text-base transition ${
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

export default ButtonSecondary