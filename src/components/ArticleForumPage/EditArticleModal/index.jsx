import React from 'react';
import Modal from '../../Modal';
import ImageUploader from '../../ImageUploader';
import ImageThumbnail from '../../ImageUploader/ImageThumbnail';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonOutline from '../../ButtonOutline';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { TextEditor } from '../../TextEditor';
import { getArticleById } from '../../../api/article';
import { getAuthCookie } from '../../../utils/cookies';

import { AddRounded } from '@mui/icons-material';
import NoImage from '../../../assets/article/no-image.jpg';
import Popup from '../../Dashboard/Popup';
import { Skeleton } from '@mui/material';

const { VITE_API_BASE_URL } = import.meta.env;

const EditArticleModal = ({ openModal, onClose, articleId, updateData }) => {
  const [topics, setTopics] = useState([]);
  const [article, setArticle] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm();

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

  useEffect(() => {
    if (article) {
      setValue('id', article?.id);
      setValue('title', article?.title);
      setValue('author', article?.author);
      setValue('description', article?.description);
      setValue('image', article?.image);
      setImagePreview(article?.image);
      setValue('topic', article?.topic);
    }
  }, [article, setValue]);

  useEffect(() => {
    getTopics();
  }, [openModal]);

  useEffect(() => {
    if (openModal) {
      fetchArticleById();
    }
  }, [articleId, openModal]);

  const getTopics = async () => {
    const token = getAuthCookie();

    try {
      const response = await axios.get(`${VITE_API_BASE_URL}/users/public/topics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTopics(response.data.data.topics);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArticleById = async () => {
    if (articleId) {
      setIsLoading(true);
      try {
        const response = await getArticleById(articleId);

        setArticle(response.data);

      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  const handleImageChange = (file) => {
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };
  
  const onSubmit = async (articleData) => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('title', articleData.title);
    formData.append('author', articleData.author);
    formData.append('description', articleData.description);
    if (articleData.topic !== article.topic) {
      formData.append('topic', articleData.topic.value);
    }
    
    try {
      const token = getAuthCookie();

      const config = {
        method: 'PUT',
        baseURL: VITE_API_BASE_URL,
        url: `/admin/articles/${articleId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      const response = await axios(config);

      handlePopup(true, response.data.meta.message);

      reset();
      setImagePreview('');
      updateData();
      onClose(false);
    } catch (error) {
      handlePopup(false, error.message);
    }
  };


  const handleClose = () => {
    reset();
    onClose(false);
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      <Modal isOpen={openModal} onClose={handleClose} type={'addArticle'}>
        <Modal.Title title={'Edit Article'} />

        <form className="mb-3 gap-x-4" onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader className="mb-4" icon={<AddRounded />} handleChange={(file) => handleImageChange(file)}>
            {imagePreview ? <>{isLoading ? <Skeleton variant="circular" width={100 + '%'} height={100 + '%'} /> : <ImageThumbnail src={imagePreview} />}</> : <ImageThumbnail src={NoImage} />}
          </ImageUploader>
          <InputField name="id" label="Article Id" type="text" placeholder="12345" errors={errors} register={register} disabled={true}/>
          
          <InputField name="title" label="Title" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
          <InputField name="author" label="Author" type="text" placeholder="Ex : Ruby Jane" errors={errors} register={register} />
          <TextEditor label={'Description'} name={'description'} register={register} control={control} errors={errors} />
          <Dropdown control={control} type="edit" name={'topic'} label={'Topic'} placeholder={article?.topic} errors={errors}>
            {topics.map((topic) => (
              <option label={topic.name} value={topic.id} key={topic.id}>
                {topic.name}
              </option>
            ))}
          </Dropdown>
          <ButtonPrimary className="w-full">
            <span className="text-[16px] font-medium">Save</span>
          </ButtonPrimary>
        </form>

        <ButtonOutline className="w-full" onClick={handleClose}>
          <span className="text-[16px] font-medium">Discard</span>
        </ButtonOutline>
      </Modal>
    </>
  );
};

export default EditArticleModal;
