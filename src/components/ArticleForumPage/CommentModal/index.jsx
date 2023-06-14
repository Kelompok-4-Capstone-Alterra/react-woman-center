import React from 'react';
import CommentCard from '../CommentCard';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../../Modal';

const CommentModal = ({ modalState, closeModal }) => {
  return (
    <Modal isOpen={modalState}>
      <div className="p-[32px] flex flex-col w-full">
        <div className="py-2">
          <div className="flex justify-between w-full mb-[44px]">
            <div>
              <CommentIcon /> 123 Commnets
            </div>
            <button onClick={closeModal}>
              <CloseIcon className="bg-black text-white w-[18px] h-[18px]" />
            </button>
          </div>
          <CommentCard />
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
