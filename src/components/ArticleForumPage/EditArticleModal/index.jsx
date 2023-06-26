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

import { AddRounded} from '@mui/icons-material';
import NoImage from '../../../assets/article/no-image.jpg';
import Popup from '../../Dashboard/Popup';

const { VITE_API_BASE_URL } = import.meta.env;

const EditArticleModal = ({ openModal, onClose, articleId, updateData }) => {
  const [topics, setTopics] = useState([]);
  const [article, setArticle] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState({});

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState('success');

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
    }, 1500);
  };

  useEffect(() => {
    if (article) {
      setValue('id', article.id);
      setValue('title', article.title);
      setValue('author', article.author);
      setValue('description', article.description);
      setValue('image', article.image);
      setImagePreview(article.image);
    }
  }, [article, setValue]);

  useEffect(() => {
    getTopics();
  }, []);

  useEffect(() => {
    if (openModal) {
      fetchArticleById();
    }
  }, [openModal]);

  useEffect(() => {
    setArticle((prev) => ({ ...prev, ...article }));
  }, []);

  const getTopics = async () => {
    const token = getAuthCookie();
    const response = await axios.get(`${VITE_API_BASE_URL}/topics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTopics(response.data.data);
  };

  const fetchArticleById = async () => {
    if (articleId) {
      try {
        const response = await getArticleById(articleId);
        setArticle(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = (file) => {
    setSelectedImage({ ...selectedImage, [articleId]: file });
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleSelectTopic = (event) => {};

  const onSubmit = async (articleData) => {
    const formData = new FormData();
    formData.append('image', selectedImage[articleId]);
    formData.append('title', articleData.title);
    formData.append('author', articleData.author);
    formData.append('description', articleData.description);

    if (!articleData.topic) {
      const selectTopic = topics?.topics?.find((topic) => topic.name === article.topic);
      if (selectTopic) {
        formData.append('topic', selectTopic.id);
      }
    } else {
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

      handlePopup(true, 'succes');

      reset();
      setImagePreview('');
      updateData();
      onClose(false);
    } catch (error) {
      handlePopup(false, 'false');
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      <Modal isOpen={openModal} onClose={handleClose} type={'addArticle'}>
        <Modal.Title title={'Edit Article'} />
        <div>
          <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
            <ImageUploader className="mb-4" icon={<AddRounded />} handleChange={(file) => handleImageChange(file)}>
              {!imagePreview ? <ImageThumbnail src={NoImage} /> : <ImageThumbnail src={imagePreview} />}
            </ImageUploader>
            <InputField name="id" label="ID" type="text" placeholder="12345" errors={errors} register={register} disabled={true} />
            <InputField name="title" label="Title" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
            <InputField name="author" label="Author" type="text" placeholder="Ex : Ruby Jane" errors={errors} register={register} />
            <TextEditor label={'Description'} name={'description'} register={register} control={control} errors={errors}/>
            <Dropdown control={control} type="edit" name={'topic'} label={'Topic'} placeholder={article?.topic} handleSelect={handleSelectTopic}>
              {topics?.topics?.map((topic) => (
                <option label={topic.name} value={topic.id} key={topic.id} />
              ))}
            </Dropdown>
            <ButtonPrimary className="w-full">Save</ButtonPrimary>
          </form>

          <ButtonOutline className="w-full" onClick={handleClose}>
            Discard
          </ButtonOutline>
        </div>
      </Modal>
    </>
  );
};

export default EditArticleModal;
