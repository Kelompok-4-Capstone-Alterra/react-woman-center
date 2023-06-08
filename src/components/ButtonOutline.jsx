import React from 'react';

export default function ButtonOutline({
  type = 'submit',
  className = '',
  processing,
  children,
}) {
  return (
    <button
      type={type}
      className={
        `bg-white outline outline-primaryMain hover:bg-[#954E80] hover:text-white hover:outline-[#954E80] active:bg-[#913175] 
        focus:outline-none h-9 w-[130.4px] rounded-[3px] text-primaryMain text-xs transition
        ${
          processing && 'opacity-25'
        } ` + className
      }
      disabled={processing}
    >
      {children}
    </button>
  );
}