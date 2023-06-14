import React from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonOutline from '../../ButtonOutline';
import ButtonSecondary from '../../ButtonSecondary';

const ArticleCard = ({ image, title, name, date, totalView, totalComment, openEdit, openComment, openDelete }) => {
  return (
    <div className="bg-white w-full p-[16px] border border-solid mb-4">
      <div className="flex flex-row">
        <img src={image} className="w-[210px] h-[210px] " />

        <div className="flex flex-col w-full gap-y-2 ml-[32px]">
          <div className="text-2xl font-semibold ">{title}</div>
          <div className=''>{name}</div>
          <div className=''>{date}</div>
          <div className="flex flex-row justify-start ">
            <div className="mr-[391px]">
              <VisibilityIcon /> {totalView}
            </div>
            <div className="">
              <CommentIcon /> {totalComment}
            </div>
          </div>
          <div className="flex flex-row h-[72px] py-[8px] gap-x-4 justify-end">
            <div className="columns">
              <ButtonSecondary onClick={openComment}>
                <CommentIcon /> Comment
              </ButtonSecondary>
            </div>
            <div className="columns">
              <ButtonPrimary className="h-full w-[100px] flex justify-center items-center" onClick={openEdit}>
                <EditIcon /> Edit
              </ButtonPrimary>
            </div>
            <div className="columns">
              <ButtonOutline className="h-full w-[119px] flex justify-center items-center" onClick={openDelete}>
                <DeleteIcon /> Delete
              </ButtonOutline>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
