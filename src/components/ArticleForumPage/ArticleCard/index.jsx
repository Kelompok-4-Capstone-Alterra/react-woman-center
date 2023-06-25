import React, { useEffect, useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonOutline from '../../ButtonOutline';
import ButtonSecondary from '../../ButtonSecondary';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../ModalConfirm';
import moment from 'moment';
import 'moment/locale/id';
import NoImage from '../../../assets/article/no-image.jpg';
const ArticleCard = ({ openModalEdit, openModalComment, payloads, deleteArticle }) => {
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const dispatch = useDispatch();
  const { image, title, author, date, view_count, comment_count } = payloads;

  const formatDate = moment(date).locale('id').format('D MMMM YYYY');

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

  const handleImageError = (event) => {
    event.currentTarget.src = NoImage;
  };

  return (
    <div className="bg-white w-full p-[16px] border border-solid mb-4">
      <div className="flex flex-row">
        <img src={image} className="w-[210px] h-[210px]" onError={handleImageError} />

        <div className="flex flex-col w-full gap-y-2 ml-[32px]">
          <div className="text-2xl font-semibold capitalize">{title}</div>
          <div className="capitalize">{author}</div>
          <div className="">{formatDate}</div>
          <div className="flex justify-start">
            <div className="flex justify-center items-center gap-2 lg:mr-[370px] md:mr-[180px] sm:mr-5">
              <VisibilityIcon style={{ fontSize: '1.125rem' }} /> {view_count}
            </div>
            <div className="flex justify-center items-center gap-2">
              <CommentIcon style={{ fontSize: '1.125rem' }} /> {comment_count}
            </div>
          </div>
          <div className="flex flex-row h-[72px] py-[8px] gap-x-4 justify-end">
            <div className="columns">
              <ButtonSecondary className="w-[152px] h-14 rounded-sm border border-pink-700 justify-center items-center flex gap-x-2" onClick={openModalComment}>
                <CommentIcon style={{ fontSize: '1.125rem' }} />
                <span className="text-[1rem]">Comment</span>
              </ButtonSecondary>
            </div>
            <div className="columns">
              <ButtonPrimary className="h-full w-[100px] flex justify-center items-center gap-x-2" onClick={openModalEdit}>
                <EditIcon style={{ fontSize: '1.125rem' }} />
                <span className="text-[1rem]">Edit</span>
              </ButtonPrimary>
            </div>
            <div className="columns">
              <ButtonOutline className="h-full w-[119px] flex justify-center items-center gap-x-2" onClick={handleOpenModalConfirm}>
                <DeleteIcon style={{ fontSize: '1.125rem' }} />
                <span className="text-[1rem]">Delete</span>
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
