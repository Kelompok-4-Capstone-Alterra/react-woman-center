import React from 'react';

export default function Button({
  type = 'submit',
  className = '',
  processing,
  children,
}) {
  return (
    <button
      type={type}
      className={
        `bg-primaryMain border-primaryBorder hover:bg-[#954E80] active:bg-[#9A8A23] hover:outline-[#954E80] 
        focus:outline-none h-9 w-[130.4px] rounded-[3px] text-white text-xs transition ${
          processing && 'opacity-25'
        } ` + className
      }
      disabled={processing}
    >
      {children}
    </button>
  );
}