import React, { useEffect, useState } from 'react';
import CommentCard from '../CommentCard';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../../Modal';
import { deleteCommentByArticleIdCommentId, getAllCommentByArticleId } from '../../../api/comment';
import { updateComments } from '../../../features/article/commentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import Popup from '../../Dashboard/Popup';

const CommentModal = ({ openModal, onClose, articleId, updateData }) => {
  const comments = useSelector((store) => store.commentReducer.comments);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [notFoundMsg, setNotFoundMsg] = useState('');

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState('success');

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 1500);
  };

  useEffect(() => {
    fetchAllComment();
  }, [articleId, openModal]);

  const fetchAllComment = async () => {
    setIsLoading(true);
    if (articleId) {
      try {
        const response = await getAllCommentByArticleId(articleId);
        dispatch(updateComments(response));
        setIsLoading(false);
        if (response.comments.length < 1) {
          setNotFoundMsg("What you are looking for doesn't exist");
        }
      } catch (error) {
        setIsLoading(false);
      }
      
    }
    
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await deleteCommentByArticleIdCommentId(articleId, commentId);
      handlePopup(true, response.message);
      fetchAllComment();
    } catch (error) {
      handlePopup(false, 'Failed');
    }

    updateData();
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      <Modal isOpen={openModal} onClose={onClose}>
        <div className="p-[32px] flex flex-col w-full">
          <div className="py-2">
            <div className="flex justify-between w-full mb-[44px]">
              <div className='font-medium flex flex-row'>
                <CommentIcon className="text-primaryMain ml-1" /> 
                {isLoading ? (
                    <Skeleton animation="wave" variant="rounded" width={20} height={20} />
                  ) : (
                    comments.comment_count
                  )
                } 
                <span className='ml-1'>Comments</span>
              </div>
              <button onClick={() => onClose(false)}>
                <CloseIcon className="bg-black text-white w-[18px] h-[18px]" />
              </button>
            </div>

            <div className='flex flex-col gap-y-4'>
            {comments?.comments?.length >= 1 ? (
                comments.comments.map((comment) =>
                  isLoading ? (
                    <Skeleton key={comment.id} animation="wave" variant="rounded" width="100%" height={100} />
                  ) : (
                    <CommentCard
                      key={comment.id}
                      payloads={comment}
                      deleteComment={deleteComment}
                    />
                  )
                )
              ) : (
                <h3 className="flex justify-center items-center font-semibold">{notFoundMsg}</h3>
              )}
              
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommentModal;
