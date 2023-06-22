import React, { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonOutline from '../../ButtonOutline';
import ButtonSecondary from '../../ButtonSecondary';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../ModalConfirm';

const ArticleCard = ({ openModalEdit, openModalComment, payloads, deleteArticle }) => {
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const dispatch = useDispatch();
  const { image, title, author, date, view_count, comment_count } = payloads;

  const handleOpenModalConfirm = () => {
    setIsShowModalConfirm(true);
  };

  const handleShowModalConfirm = (showModal) => {
    setIsShowModalConfirm(showModal);
  };

  const handleDeleteArticle = () => {
    deleteArticle(payloads.id);
    handleShowModalConfirm(false);
  };

  return (
    <div className="bg-white w-full p-[16px] border border-solid mb-4">
      <div className="flex flex-row">
        <img src={`${image}`} className="w-[210px] h-[210px]" />

        <div className="flex flex-col w-full gap-y-2 ml-[32px]">
          <div className="text-2xl font-semibold ">{title}</div>
          <div className="">{author}</div>
          <div className="">{date}</div>
          <div className="flex flex-row justify-start ">
            <div className="mr-[391px]">
              <VisibilityIcon /> {view_count}
            </div>
            <div className="">
              <CommentIcon /> {comment_count}
            </div>
          </div>
          <div className="flex flex-row h-[72px] py-[8px] gap-x-4 justify-end">
            <div className="columns">
              <ButtonSecondary onClick={openModalComment}>
                <CommentIcon /> Comment
              </ButtonSecondary>
            </div>
            <div className="columns">
              <ButtonPrimary className="h-full w-[100px] flex justify-center items-center" onClick={openModalEdit}>
                <EditIcon /> Edit
              </ButtonPrimary>
            </div>
            <div className="columns">
              <ButtonOutline className="h-full w-[119px] flex justify-center items-center" onClick={handleOpenModalConfirm}>
                <DeleteIcon /> Delete
              </ButtonOutline>
              {isShowModalConfirm && <ModalConfirm onSure={handleDeleteArticle} onClose={handleShowModalConfirm} isConfirm={isShowModalConfirm} messages="Are you sure want to delete this item?" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
