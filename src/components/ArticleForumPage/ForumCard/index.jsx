import React, { useEffect, useState } from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonOutline from '../../ButtonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../ModalConfirm';
import axios from 'axios';
import { getAuthCookie } from '../../../utils/cookies';

const { VITE_API_BASE_URL } = import.meta.env;

const ForumCard = ({ openEdit, openModalComment, payloads, deleteForum }) => {
  const backgroundStyle = {
    background: 'conic-gradient(from 180deg at 50% 50%, #DAD29C -120deg, #F9DAD9 33.75deg, #DAD29C 240deg, #F9DAD9 393.75deg)',
  };

  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const dispatch = useDispatch();
  const { user_id, category, link, topic, member, created_at } = payloads;

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserById();
  }, []);

  const fetchUserById = async () => {
    const token = getAuthCookie();

    try {
      const response = await axios.get(`${VITE_API_BASE_URL}/admin/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user)
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div className="bg-white w-full p-[16px] border border-solid mb-4">
      <div className="flex flex-row w-full">
        <div className="flex justify-between w-full mb-4">
          <div className="flex flex-row items-center">
            <img src={user?.profile_picture} className="w-[40px] h-[40px] rounded-full" />

            <div className="flex flex-col ml-1">
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="font-medium text-xs text-slate-500">{category}</p>
            </div>
          </div>
          <div className="flex flex-row justify-end items-center">
            <p className="font-normal text-xs flex items-center gap-x-1">
              {member} <PeopleAltOutlinedIcon />
            </p>
            <p className="font-normal text-xs ml-1">{created_at} days ago</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-[36px] mb-4 gap-x-4 justify-end">
        <div className="columns">
          <ButtonPrimary className="h-full w-[100px] flex justify-center items-center">
            <VisibilityIcon /> View
          </ButtonPrimary>
        </div>
        <div className="columns">
          <ButtonOutline className="h-full w-[119px] flex justify-center items-center">
            <DeleteIcon /> Delete
          </ButtonOutline>
          {isShowModalConfirm && <ModalConfirm onSure={handleDeleteArticle} onClose={handleShowModalConfirm} isConfirm={isShowModalConfirm} messages="Are you sure want to delete this item?" />}
        </div>
      </div>
      <div className="flex justify-center items-center font-medium text-2xl h-[320px]" style={backgroundStyle}>
        {topic}
      </div>
    </div>
  );
};

export default ForumCard;
