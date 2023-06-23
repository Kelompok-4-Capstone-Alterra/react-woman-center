import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { AddRounded } from '@mui/icons-material';
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
import axios from 'axios';
import { Alert, MenuItem, Select, Skeleton, Snackbar } from '@mui/material';

import { deleteArticleById, getAllArticles } from '../api/article';
import { updateArticle } from '../features/article/articleSlice';
import SearchBar from '../components/SearchBar';
import { deleteForumById, getAllForums } from '../api/forum';
import { updateForum } from '../features/forum/forumSlice';

const ArticleForumPage = () => {
  const articles = useSelector((store) => store.articleReducer.articles);
  const forums = useSelector((store) => store.forumReducer.forums);

  const dispatch = useDispatch();
  const [isArticle, setIsArticle] = useState(true);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const [showIsViewLink, setShowIsViewLink] = useState(false);
  const [showIsDelete, setShowIsDelete] = useState(false);
  const [isShowToast, setIsShowToast] = useState({
    isOpen: false,
    variant: 'info',
    duration: 5000,
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [articleId, setArticleId] = useState('');
  const [totalComment, setTotalComment] = useState('');
  const [notFoundMsg, setNotFoundMsg] = useState('');

  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  useEffect(() => {
    fetchAllArticles();
  }, [isArticle]);

  const fetchAllArticles = async (params = {}) => {
    setIsLoading(true);

    if (isArticle) {
      try {
        const response = await getAllArticles(params);
        dispatch(updateArticle(response));
        setIsLoading(false);

        if (response.length < 1) {
          setNotFoundMsg("What you are looking for doesn't exist");
        }
      } catch (error) {
        setIsShowToast({
          ...isShowToast,
          isOpen: true,
          variant: 'error',
          message: error.message,
        });
        setIsLoading(false);
      }
    } else {
      try {
        const response = await getAllForums(params);
        dispatch(updateForum(response));
        setIsLoading(false);

        if (response.length < 1) {
          setNotFoundMsg("What you are looking for doesn't exist");
        }
      } catch (error) {
        setIsShowToast({
          ...isShowToast,
          isOpen: true,
          variant: 'error',
          message: error.message,
        });
        setIsLoading(false);
      }
    }

    setNotFoundMsg("What you are looking for doesn't exist");
  };

  const deleteArticle = async (articleId) => {
    try {
      const response = await deleteArticleById(articleId);
      setIsShowToast({
        ...isShowToast,
        isOpen: true,
        variant: 'success',
        message: response.message,
      });
      fetchAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchArticle = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    if (isArticle) {
      fetchAllArticles({ search: keyword, sort_by: sortBy });
    } else {
      fetchAllArticles({ topic: keyword, sort_by: sortBy });
    }
  };

  const handleSortBy = (event) => {
    const sortByValue = event.target.value;

    setSortBy(sortByValue);
    if (isArticle) {
      fetchAllArticles({ sort_by: sortByValue, search: searchKeyword });
    } else {
      fetchAllArticles({ sort_by: sortByValue, topic: searchKeyword });
    }
  };

  // useEffect(() => {
  //   fetchAllForums();
  // }, []);

  // const fetchAllForums = async (params = {}) => {
  //   setIsLoading(true);

  //   try {
  //     const response = await getAllArticles(params);
  //     dispatch(updateArticle(response));
  //     setIsLoading(false);

  //     if (response.length < 1) {
  //       setNotFoundMsg("What you are looking for doesn't exist");
  //     }
  //   } catch (error) {
  //     setIsShowToast({
  //       ...isShowToast,
  //       isOpen: true,
  //       variant: 'error',
  //       message: error.message,
  //     });
  //     setIsLoading(false);
  //   }

  //   setNotFoundMsg("What you are looking for doesn't exist");
  // };

  const deleteForum = async (forumId) => {
    try {
      const response = await deleteForumById(forumId);
      setIsShowToast({
        ...isShowToast,
        isOpen: true,
        variant: 'success',
        message: response.message,
      });
      fetchAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectPage = () => {
    const formData = getValues();
    const dropdownValue = formData.pageStatus;
    setIsArticle(dropdownValue.value);
    console.log('isArticle : ', isArticle);

    console.log('Value: ', dropdownValue.value);
  };

  const handleOpenModalComment = (articleId, commentCount) => {
    setIsShowModalComment(true);
    setArticleId(articleId);
    setTotalComment(commentCount);
  };

  const handleShowModalComment = (showModal) => {
    setIsShowModalComment(showModal);
  };

  const handleOpenModalEdit = (articleId) => {
    setIsShowModalEdit(true);
    setArticleId(articleId);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalEdit(showModal);
    setArticleId('')
  };

  return (
    <div>
      <Snackbar open={isShowToast.isOpen} autoHideDuration={isShowToast.duration} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setIsShowToast({ ...isShowToast, isOpen: false })}>
        <Alert onClose={() => setIsShowToast({ ...isShowToast, isOpen: false })} severity={isShowToast.variant} sx={{ width: '100%' }} className="capitalize">
          {isShowToast.message}
        </Alert>
      </Snackbar>
      <div className="">
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
                setIsShowModalAdd(true);
              }}
            >
              <AddRounded className="mr-1" style={{ fontSize: '1.125rem' }} />
              <span className="text-[1rem]">New Article</span>
            </ButtonPrimary>
          )}
        </div>
        <div className="h-14 relative rounded-[3px] flex flex-row justify-between overflow-hidden mb-4">
          <SearchBar className="focus:outline-none w-72 text-neutralMediumLow" placeholder="Find something here ..." onChange={handleSearchArticle} />
          <div className="flex justify-end items-center gap-4">
            <span className="text-base">Sort By</span>
            <Select
              value={sortBy}
              // label="Age"
              onChange={handleSortBy}
              sx={{
                '.MuiSelect-select': {
                  padding: '0.325rem 0.75rem',
                },
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#9E9494 !important',
                  borderWidth: '1px',
                },
              }}
              MenuProps={{
                sx: {
                  '&& .Mui-selected': {
                    backgroundColor: '#AF1582 !important',
                    color: '#FFF',
                  },
                  '&& .Mui-selected:hover': {
                    backgroundColor: '#954E80 !important',
                  },
                },
              }}
            >
              <MenuItem
                value="newest"
                sx={{
                  '&:checked': {
                    backgroundColor: '#AF1582 !important',
                    color: '#FFF',
                  },
                }}
              >
                Newest
              </MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
            {/* <span className="text-base">Sort By</span>
          <FilterDropdown>
            <FilterDropdown.Option>Newest</FilterDropdown.Option>
            <FilterDropdown.Option>Oldest</FilterDropdown.Option>
          </FilterDropdown> */}
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-4 min-h-[10rem]">
          {isArticle ? (
            <div>
              {articles.length >= 1 ? (
                articles.map((article) =>
                  isLoading ? (
                    <Skeleton key={article.id} animation="wave" variant="rounded" width="100%" height={150} />
                  ) : (
                    <ArticleCard key={article.id} payloads={article} openModalComment={() => handleOpenModalComment(article.id, article.comment_count)} openModalEdit={() => handleOpenModalEdit(article.id)} deleteArticle={deleteArticle} />
                  )
                )
              ) : (
                <h3 className="flex justify-center items-center font-semibold">{notFoundMsg}</h3>
              )}
            </div>
          ) : (
            <div>
              {forums.length >= 1 ? (
                forums.map((forum) =>
                  isLoading ? (
                    <Skeleton key={forum.id} animation="wave" variant="rounded" width="100%" height={150} />
                  ) : (
                    <ForumCard
                      key={forum.id}
                      payloads={forum}
                      openModalComment={() => handleOpenModalComment(forum.id)}
                      // openModal={handleShowModal}
                      deleteforum={deleteForum}
                    />
                  )
                )
              ) : (
                <h3 className="flex justify-center items-center font-semibold">{notFoundMsg}</h3>
              )}
            </div>
          )}
        </div>
      </div>

      <CommentModal openModal={isShowModalComment} onClose={handleShowModalComment} articleId={articleId} totalComment={totalComment} updateData={fetchAllArticles} />

      <AddArticleModal
        openModal={isShowModalAdd}
        onClose={() => {
          setIsShowModalAdd(false);
        }}
        updateData={fetchAllArticles}
      />

      <EditArticleModal
        openModal={isShowModalEdit}
        onClose={() => {
          setIsShowModalEdit(false);
        }}
        articleId={articleId}
        updateData={fetchAllArticles}
      />
      {/* 


      



      <LinkModal
        modalState={showIsViewLink}
        closeModal={() => {
          setShowIsViewLink(false);
        }}
      />
 */}
    </div>
  );
};

export default ArticleForumPage;
