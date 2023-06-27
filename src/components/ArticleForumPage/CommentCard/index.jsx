import React, { useState } from 'react';
import ModalConfirm from '../../ModalConfirm';
import avatarDefault from '../../../assets/forum/avatar-default.png';
import ButtonOutline from '../../ButtonOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

const MAX_COMMENT_LENGTH = 25;

const CommentCard = ({ payloads, deleteComment }) => {
  const { profile_pricture, username, created_at } = payloads;
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const differenceDay = moment(new Date(created_at)).from(moment());

  const comment = 'halo aku disini. iniasdasdaskdjkjashdkjakjshdkjahskdhasdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaakajsdkjashiniasdasdaskdjkjashdkjakjshdkjahskdhasdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakajsdkjash '
  const isCommentLong = comment.length > MAX_COMMENT_LENGTH;
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
    <div className="flex flex-row w-full mb-8">
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-row items-center mb-4">
          {!profile_pricture ? <img src={avatarDefault} className="w-[40px] h-[40px] rounded-full" onError={handleImageError} /> : <img src={profile_pricture} className="w-[40px] h-[40px] rounded-full" onError={handleImageError} />}

          <div className="flex flex-col ml-1 gap-y-1">
            <p className="font-medium text-sm">{username}</p>
            <p className="font-medium text-xs text-slate-500">{differenceDay}</p>
          </div>
        </div>
        <div>
          <p className={`transition-all ${isHidden ? 'truncate' : ''}`}>
            {' '}
            <span className="mr-3">{isCommentLong && isHidden ? comment.slice(0, MAX_COMMENT_LENGTH) + '...' : comment}</span>{' '}
          </p>
          {isCommentLong && (
            <span className="text-primaryMain hover:text-primaryHover cursor-pointer text-[0.75rem]" onClick={handleHiddenComment}>
              {isHidden ? 'Lihat Selengkapnya..' : 'Sembunyikan..'}
            </span>
          )}
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
