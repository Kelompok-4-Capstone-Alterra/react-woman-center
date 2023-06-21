import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonPrimary from '../../ButtonPrimary';
import ModalConfirm from '../../ModalConfirm';

const CommentCard = ({ payloads, deleteComment}) => {
  const { profile_pricture, username, created_at, comment } = payloads;
  const dispatch = useDispatch();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
 
  const handleOpenModalConfirm = () => {
    setIsShowModalConfirm(true);
  };

  const handleShowModalConfirm = (showModal) => {
    setIsShowModalConfirm(showModal);
  };

  const handleDeleteComment = () => {
    deleteComment(payloads.id);
    handleShowModalConfirm(false);
  };

  return (
    <div className="flex flex-row w-full mb-2">
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-row items-center mb-4">
          <img src={profile_pricture} className="w-[40px] h-[40px] rounded-full" />

          <div className="flex flex-col ml-1 gap-y-1">
            <p className="font-medium text-sm">{username}</p>
            <p className="font-medium text-xs text-slate-500">{created_at}</p>
          </div>
        </div>
        <div>
          <p>{comment}</p>
        </div>
      </div>
      <div>
        <ButtonPrimary onClick={handleOpenModalConfirm}>Delete</ButtonPrimary>
        {isShowModalConfirm && (
            <ModalConfirm
              onSure={handleDeleteComment}
              onClose={handleShowModalConfirm}
              isConfirm={isShowModalConfirm}
              messages="Are you sure want to delete this item?"
            />
          )}
      </div>
    </div>
  );
};

export default CommentCard;
