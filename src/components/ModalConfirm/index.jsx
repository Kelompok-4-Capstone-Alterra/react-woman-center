import React from 'react';
import ButtonPrimary from '../ButtonPrimary';
import ButtonOutline from '../ButtonOutline';

const ModalConfirm = ({ isConfirm, onClose, messages, onSure }) => {
  if (!isConfirm) return null;

  return (
    <div className="fixed w-[100vw] h-[100vh] z-10 inset-0 flex flex-col items-center overflow-auto">
      <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0"></div>
      <div className="my-10 z-10">
        <div className="bg-white w-[372px] p-[32px] items-center flex flex-col rounded shadow-md border-solid border border-primaryBorder">
          <div className="py-[16px] px-[8px] mb-4">
            <p className="text-xl font-medium">{messages}</p>
          </div>
          <div className="flex flex-col gap-[16px] items-center w-full">
            <ButtonPrimary className="w-full" onClick={onSure}>
              Sure
            </ButtonPrimary>
            <ButtonOutline className="w-full" onClick={onClose}>
              Maybe Later
            </ButtonOutline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
