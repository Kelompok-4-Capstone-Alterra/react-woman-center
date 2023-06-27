import React, { useState } from 'react';
import ModalConfirm from '../../ModalConfirm';
import avatarDefault from '../../../assets/forum/avatar-default.png';
import ButtonOutline from '../../ButtonOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

const CommentCard = ({ payloads, deleteComment }) => {
  const { profile_pricture, username, created_at, comment } = payloads;
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const differenceDay = moment(new Date(created_at)).from(moment());

  const [isHidden, setIsHidden] = useState(true);

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

  const handleHiddenComment = () => {
    setIsHidden(!isHidden);
  };

  const handleImageError = (event) => {
    event.currentTarget.src = avatarDefault;
  };

  return (
    <div className="flex flex-row w-full mb-10">
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-row items-center mb-4">
          {!profile_pricture ? <img src={avatarDefault} className="w-[40px] h-[40px] rounded-full" onError={handleImageError} /> : <img src={profile_pricture} className="w-[40px] h-[40px] rounded-full" onError={handleImageError} />}

          <div className="flex flex-col ml-1 gap-y-1">
            <p className="font-medium text-sm">{username}</p>
            <p className="font-medium text-xs text-slate-500">{differenceDay}</p>
          </div>
        </div>
        <div>
          <p className={`w-[450px] mb-2 transition-all ${isHidden ? 'truncate' : ''}`}>
            {' '}
            <span className="mr-3">{comment}</span>{' '}
          </p>
          {/* {isHidden ? <span className="text-primaryMain cursor-pointer" onClick={handleHiddenComment}>Lihat Selengkapnya..</span> : <span className="text-primaryMain" onClick={handleHiddenComment}>Sembunyikan</span>} */}
          <span className="text-primaryMain cursor-pointer" onClick={handleHiddenComment}>
            {isHidden ? 'Lihat Selengkapnya..' : 'Sembunyikan..'}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <ButtonOutline className="flex justify-center items-center" onClick={handleOpenModalConfirm}>
          <DeleteIcon /> Delete
        </ButtonOutline>
        {isShowModalConfirm && <ModalConfirm onSure={handleDeleteComment} onClose={handleShowModalConfirm} isConfirm={isShowModalConfirm} messages="Are you sure want to delete this item?" />}
      </div>
    </div>
  );
};

export default CommentCard;
