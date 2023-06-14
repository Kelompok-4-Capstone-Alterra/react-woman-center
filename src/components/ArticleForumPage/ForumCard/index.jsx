import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonOutline from '../../ButtonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const ForumCard = ({ image, name, topic, totalUser, time, title, openLink, openDelete }) => {
  const backgroundStyle = {
    background: 'conic-gradient(from 180deg at 50% 50%, #DAD29C -120deg, #F9DAD9 33.75deg, #DAD29C 240deg, #F9DAD9 393.75deg)',
  };

  
  return (
    <div className="bg-white w-full p-[16px] border border-solid mb-4">
      <div className="flex flex-row w-full">
        <div className="flex justify-between w-full mb-4">
          <div className="flex flex-row items-center">
            <img src={image} className="w-[40px] h-[40px] rounded-full" />

            <div className="flex flex-col ml-1">
              <p className="font-medium text-sm">{name}</p>
              <p className="font-medium text-xs text-slate-500">{topic}</p>
            </div>
          </div>
          <div className="flex flex-row justify-end items-center">
            <p className="font-normal text-xs flex items-center gap-x-1">
              {totalUser} <PeopleAltOutlinedIcon />
            </p>
            <p className="font-normal text-xs ml-1">{time} days ago</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-[36px] mb-4 gap-x-4 justify-end">
        <div className="columns">
          <ButtonPrimary className="h-full w-[100px] flex justify-center items-center" onClick={openLink}>
            <VisibilityIcon /> View
          </ButtonPrimary>
        </div>
        <div className="columns">
          <ButtonOutline className="h-full w-[119px] flex justify-center items-center" onClick={openDelete}>
            <DeleteIcon /> Delete
          </ButtonOutline>
        </div>
      </div>
      <div className="flex justify-center items-center font-medium text-2xl h-[320px]" style={backgroundStyle}>
        {title}
      </div>
    </div>
  );
};

export default ForumCard;
