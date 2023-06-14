import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import ButtonPrimary from '../components/ButtonPrimary';
import Dropdown from '../components/Dropdown';
import AddArticleModal from '../components/ArticleForumPage/AddArticleModal';
import ArticleCard from '../components/ArticleForumPage/ArticleCard';
import ForumCard from '../components/ArticleForumPage/ForumCard';
import EditArticleModal from '../components/ArticleForumPage/EditArticleModal';
import CommentModal from '../components/ArticleForumPage/CommentModal';
import LinkModal from '../components/ArticleForumPage/LinkModal';
import DeleteModal from '../components/ArticleForumPage/DeleteModal';

const ArticleForumPage = () => {
  const [isArticle, setIsArticle] = useState(true);
  const [showIsAdd, setShowIsAdd] = useState(false);
  const [showIsEdit, setShowIsEdit] = useState(false);
  const [showIsComment, setShowIsComment] = useState(false);
  const [showIsViewLink, setShowIsViewLink] = useState(false);
  const [showIsDelete, setShowIsDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  const handleSelectPage = () => {
    const formData = getValues();
    const dropdownValue = formData.pageStatus;
    setIsArticle(dropdownValue.value);
    console.log('isArticle : ', isArticle);

    console.log('Value: ', dropdownValue.value);
  };

  return (
    <div>
      <div className="flex px-[40px] items-center py-[26px] border-b-primaryBorder border-b-[0.25px] mb-4">
        <div className="flex items-center text-primaryMain">
          <PersonIcon className="me-4" /> <p className="text-lg font-medium ">Admin</p>
        </div>
      </div>
      <div className="px-[40px]">
        <div className="flex justify-between items-center">
          <form className="w-[360px]">
            <Dropdown control={control} name={'pageStatus'} label={'Choose Sub Menu : '} placeholder={'Article'} handleSelect={handleSelectPage}>
              <option value={true} label="Article" />
              <option value={false} label="Forum Discussion" />
            </Dropdown>
          </form>
          {isArticle && (
            <ButtonPrimary
              className="flex items-center justify-center text-sm"
              onClick={() => {
                setShowIsAdd(true);
              }}
            >
              <AddIcon /> New Article
            </ButtonPrimary>
          )}
        </div>
        <div className="h-14 w-full relative rounded-[3px] overflow-hidden mb-4 border border-solid">
          <SearchIcon fontSize="large" className="absolute left-4 top-2" />
          <input className="w-full py-4 ps-16 text-[16px] tracking-[0.5px] placeholder:text-[16px] placeholder:tracking-[0.5px] placeholder:font-normal" type="text" name="" id="" placeholder="Search what you need here..." />
        </div>
        <div className="w-full max-h-[100vh] overflow-auto">
          {isArticle ? (
            <>
              <ArticleCard
                title={'How women need to empower herself?'}
                name={'Kaia Michelle'}
                date={'12 October 2022'}
                totalView={123}
                totalComment={123}
                openComment={() => {
                  setShowIsComment(true);
                }}
                openEdit={() => {
                  setShowIsEdit(true);
                }}
              />
              <ArticleCard title={'How women need to empower herself?'} name={'Kaia Michelle'} date={'12 October 2022'} totalView={123} totalComment={123} />
              <ArticleCard title={'How women need to empower herself?'} name={'Kaia Michelle'} date={'12 October 2022'} totalView={123} totalComment={123} />
              <ArticleCard title={'How women need to empower herself?'} name={'Kaia Michelle'} date={'12 October 2022'} totalView={123} totalComment={123} />
              <ArticleCard title={'How women need to empower herself?'} name={'Kaia Michelle'} date={'12 October 2022'} totalView={123} totalComment={123} />
            </>
          ) : (
            <ForumCard
              openLink={() => {
                setShowIsViewLink(true);
              }}
              openDelete={() => {
                setShowIsDelete(true);
              }}
            />
          )}
        </div>{' '}
      </div>

      <AddArticleModal
        modalState={showIsAdd}
        closeModal={() => {
          setShowIsAdd(false);
        }}
      />

      <EditArticleModal
        modalState={showIsEdit}
        closeModal={() => {
          setShowIsEdit(false);
        }}
      />

      <CommentModal
        modalState={showIsComment}
        closeModal={() => {
          setShowIsComment(false);
        }}
      />

      <LinkModal
        modalState={showIsViewLink}
        closeModal={() => {
          setShowIsViewLink(false);
        }}
      />

      <DeleteModal
        modalState={showIsDelete}
        closeModal={() => {
          setShowIsDelete(false);
        }}
      />
    </div>
  );
};

export default ArticleForumPage;
