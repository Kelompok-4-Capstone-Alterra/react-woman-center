import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../components/ButtonPrimary";
import DropdownPage from "../components/DropdownPage";
import AddArticleModal from "../components/ArticleForumPage/AddArticleModal";
import ArticleCard from "../components/ArticleForumPage/ArticleCard";
import ForumCard from "../components/ArticleForumPage/ForumCard";
import EditArticleModal from "../components/ArticleForumPage/EditArticleModal";
import CommentModal from "../components/ArticleForumPage/CommentModal";
import { MenuItem, Select, Skeleton } from "@mui/material";
import { deleteArticleById, getAllArticles } from "../api/article";
import { updateArticle } from "../features/article/articleSlice";
import SearchBar from "../components/SearchBar";
import { deleteForumById, getAllForums } from "../api/forum";
import { updateForum } from "../features/forum/forumSlice";
import Popup from "../components/Dashboard/Popup";
import PaginationTable from "../components/PaginationTable";

const ArticleForumPage = () => {
  const articles = useSelector((store) => store.articleReducer.articles);
  const forums = useSelector((store) => store.forumReducer.forums);

  const dispatch = useDispatch();
  const [isArticle, setIsArticle] = useState(true);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalComment, setIsShowModalComment] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [articleId, setArticleId] = useState("");
  const [notFoundMsg, setNotFoundMsg] = useState("");

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  useEffect(() => {
    fetchAllArticles({ sort_by: sortBy });
  }, [isArticle]);

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

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
        handlePopup(false, error.message);
        setIsLoading(false);
      }
    } else {
      try {
        const response = await getAllForums(params);
        dispatch(updateForum(response));
        setIsLoading(false);

        if (response.forums.length < 1) {
          setNotFoundMsg("What you are looking for doesn't exist");
        }
      } catch (error) {
        handlePopup(false, error.message);
        setIsLoading(false);
      }
    }
  };

  const deleteArticle = async (articleId) => {
    try {
      const response = await deleteArticleById(articleId);
      handlePopup(true, response.data.message);
      fetchAllArticles({ sort_by: sortBy });
    } catch (error) {
      handlePopup(false, "Failed");
    }
  };

  const handleSearchArticle = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    if (isArticle) {
      fetchAllArticles({ search: keyword, sort_by: sortBy });
    } else {
      fetchAllArticles({ topic: keyword, sort_by: sortBy, page });
    }
  };

  const handleSortBy = (event) => {
    const sortByValue = event.target.value;

    setSortBy(sortByValue);

    if (isArticle) {
      fetchAllArticles({ sort_by: sortByValue, search: searchKeyword });
    } else {
      fetchAllArticles({ sort_by: sortByValue, topic: searchKeyword, page });
    }
  };

  const deleteForum = async (forumId) => {
    try {
      const response = await deleteForumById(forumId);

      handlePopup(true, response.message);
      fetchAllArticles({ sort_by: sortBy, page: 1 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectPage = () => {
    const formData = getValues();
    const dropdownValue = formData.pageStatus;
    setIsArticle(dropdownValue.value);
    setSearchKeyword("");
  };

  const handleOpenModalComment = (articleId) => {
    setIsShowModalComment(true);
    setArticleId(articleId);
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
    setArticleId("");
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />
      <div className="">
        <div className="flex justify-between items-center">
          <form className="w-[360px]">
            <DropdownPage
              control={control}
              name={"pageStatus"}
              label={"Choose Sub Menu : "}
              placeholder={"Article"}
              handleSelect={handleSelectPage}
            >
              <option value={true} label="Article" />
              <option value={false} label="Forum Discussion" />
            </DropdownPage>
          </form>
          {isArticle && (
            <ButtonPrimary
              className="flex items-center justify-center text-sm"
              onClick={() => {
                setIsShowModalAdd(true);
              }}
            >
              <AddRounded className="mr-1" style={{ fontSize: "1.125rem" }} />
              <span className="text-[1rem]">New Article</span>
            </ButtonPrimary>
          )}
        </div>
        <div className="h-14 relative rounded-[3px] flex flex-row justify-between overflow-hidden mb-4">
          <SearchBar
            className="focus:outline-none w-72 text-neutralMediumLow"
            placeholder="Find something here ..."
            onChange={handleSearchArticle}
          />
          <div className="flex justify-end items-center gap-4">
            <span className="text-base">Sort By</span>
            <Select
              value={sortBy}
              // label="Age"
              onChange={handleSortBy}
              sx={{
                ".MuiSelect-select": {
                  padding: "0.325rem 0.75rem",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9E9494 !important",
                  borderWidth: "1px",
                },
              }}
              MenuProps={{
                sx: {
                  "&& .Mui-selected": {
                    backgroundColor: "#AF1582 !important",
                    color: "#FFF",
                  },
                  "&& .Mui-selected:hover": {
                    backgroundColor: "#954E80 !important",
                  },
                },
              }}
            >
              <MenuItem
                value="newest"
                sx={{
                  "&:checked": {
                    backgroundColor: "#AF1582 !important",
                    color: "#FFF",
                  },
                }}
              >
                Newest
              </MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-4 min-h-[10rem]">
          {isArticle ? (
            <div>
              {articles.length >= 1 ? (
                articles.map((article) =>
                  isLoading ? (
                    <Skeleton
                      key={article.id}
                      animation="wave"
                      variant="rounded"
                      width="100%"
                      height={150}
                    />
                  ) : (
                    <ArticleCard
                      key={article.id}
                      payloads={article}
                      openModalComment={() =>
                        handleOpenModalComment(article.id)
                      }
                      openModalEdit={() => handleOpenModalEdit(article.id)}
                      deleteArticle={deleteArticle}
                    />
                  )
                )
              ) : (
                <h3 className="flex justify-center items-center font-semibold">
                  {notFoundMsg}
                </h3>
              )}
            </div>
          ) : (
            <div>
              {forums.forums?.length >= 1 ? (
                forums.forums.map((forum) =>
                  isLoading ? (
                    <Skeleton
                      key={forum.id}
                      animation="wave"
                      variant="rounded"
                      width="100%"
                      height={150}
                    />
                  ) : (
                    <ForumCard
                      key={forum.id}
                      payloads={forum}
                      openModalComment={() => handleOpenModalComment(forum.id)}
                      // openModal={handleShowModal}
                      deleteForum={deleteForum}
                    />
                  )
                )
              ) : (
                <h3 className="flex justify-center items-center font-semibold">
                  {notFoundMsg}
                </h3>
              )}
              <PaginationTable
                page={page}
                rows={forums.total_pages}
                rowsPerPage={rowsPerPage}
                handleChangePage={(event, page) => {
                  setPage(page);
                  setIsArticle(false);
                  fetchAllArticles({ sort_by: sortBy, page });
                }}
                handleChangeRowsPerPage={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(1);
                  setIsArticle(false);
                  fetchAllArticles({
                    limit: parseInt(event.target.value, 10),
                    page,
                    sort_by: sortBy,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>

      <CommentModal
        openModal={isShowModalComment}
        onClose={handleShowModalComment}
        articleId={articleId}
        updateData={fetchAllArticles}
      />

      <AddArticleModal
        openModal={isShowModalAdd}
        onClose={() => {
          setIsShowModalAdd(false);
        }}
        updateData={fetchAllArticles}
      />

      <EditArticleModal
        openModal={isShowModalEdit}
        onClose={handleShowModalEdit}
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
    </>
  );
};

export default ArticleForumPage;
