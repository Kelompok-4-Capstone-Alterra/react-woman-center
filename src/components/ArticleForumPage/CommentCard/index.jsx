import React from 'react';


const CommentCard = ({image, name, time, comment}) => {
  return (
    <div className="flex flex-row w-full mb-2">
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-row items-center mb-4">
          <img src={image} className="w-[40px] h-[40px] rounded-full" />

          <div className="flex flex-col ml-1 gap-y-1">
            <p className="font-medium text-sm">{name}</p>
            <p className="font-medium text-xs text-slate-500">{time}</p>
          </div>
        </div>
        <div>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
