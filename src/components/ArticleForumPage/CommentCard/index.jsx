import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../ModalConfirm';
import avatarDefault from '../../../assets/forum/avatar-default.png';
import ButtonOutline from '../../ButtonOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";

const CommentCard = ({ payloads, deleteComment }) => {
  const { profile_pricture, username, created_at, comment } = payloads;
  const dispatch = useDispatch();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const differenceDay = moment(new Date(created_at)).from(moment());

  const [isHidden, setIsHidden] = useState(true)

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

  const handleHiddenComment =()=>{
    setIsHidden(!isHidden)
  }

  const handleImageError = (event) => {
    event.currentTarget.src = avatarDefault;
  };

  return (
    <div className="flex flex-row w-full mb-2">
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-row items-center mb-4">
          {!profile_pricture ? <img src={avatarDefault} className="w-[40px] h-[40px] rounded-full" /> : <img src={profile_pricture} className="w-[40px] h-[40px] rounded-full" onError={handleImageError} />}

          <div className="flex flex-col ml-1 gap-y-1">
            <p className="font-medium text-sm">{username}</p>
            <p className="font-medium text-xs text-slate-500">{differenceDay}</p>
          </div>
        </div>
        <div>
          <p className={isHidden? 'truncate cursor-pointer':'cursor-pointer'} onClick={handleHiddenComment}>{comment}</p>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <ButtonOutline className='flex justify-center items-center' onClick={handleOpenModalConfirm}><DeleteIcon /> Delete</ButtonOutline>
        {isShowModalConfirm && <ModalConfirm onSure={handleDeleteComment} onClose={handleShowModalConfirm} isConfirm={isShowModalConfirm} messages="Are you sure want to delete this item?" />}
      </div>
    </div>
  );
};

export default CommentCard;
