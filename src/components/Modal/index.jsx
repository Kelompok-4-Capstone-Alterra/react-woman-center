import React, { useState } from "react";
import ButtonOutline from "../ButtonOutline";

const Modal = ({ isOpen, onClose, children, type }) => {
  if (!isOpen) return null;

  let paddingModal = "";
  let paddingContent = "";
  let layoutContent = "";

  if (
    type === "addCounselor" ||
    type === "viewUpdateCounselor" ||
    type === "viewUser" ||
    type === "addCareer" ||
    type === "editCareer" ||
    type === "addArticle" ||
    type === "editArticle"
  ) {
    paddingModal = "px-[32px] py-[16px]";
    paddingContent = "p-[32px]";
    layoutContent = "flex-col";
  } else if (type === "link" || type == "addSchedule") {
    paddingModal = "px-[56px]";
    paddingContent = "px-[16px] py-[32px]";
    layoutContent = "flex-col";
  } else {
    paddingModal = "p-0";
  }

  return (
    <div className="fixed w-[100vw] h-[100vh] z-10 inset-0 flex flex-col items-center overflow-auto">
      <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0"></div>
      <div className="z-10 my-10">
        <div
          className={`bg-white w-[664px] ${paddingModal} z-10 rounded-md shadow border-solid border-[1px] border-primaryBorder`}
        >
          <div className={`flex ${layoutContent} ${paddingContent}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalTitle = ({ title }) => {
  return <h2 className="text-xl font-bold mb-4 mt-[8px]">{title}</h2>;
};

const ModalLeftSide = ({ children }) => {
  return <div className={`flex flex-col px-[16px] pt-[32px]`}>{children}</div>;
};

const ModalRightSide = ({ children }) => {
  return (
    <div className={`flex flex-col px-[16px] pt-[32px] w-full`}>{children}</div>
  );
};

Modal.Title = ModalTitle;
Modal.LeftSide = ModalLeftSide;
Modal.RightSide = ModalRightSide;

export default Modal;
