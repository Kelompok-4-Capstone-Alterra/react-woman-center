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
import AddIcon from '@mui/icons-material/Add';
import { TextEditor } from '../../TextEditor';
import { getArticleById } from '../../../api/article';
import { getAuthCookie } from '../../../utils/cookies';
import { useSelector } from 'react-redux';

const { VITE_API_BASE_URL } = import.meta.env;

const EditArticleModal = ({ openModal, onClose, articleId, updateData }) => {
  const [topics, setTopics] = useState([]);
  const [article, setArticle] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState({});



  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (article) {
      setValue('id', article.id);
      setValue('title', article.title);
      setValue('author', article.author);
      setValue('description', article.description);
      setValue('image', article.image);
      setImagePreview(article.image);
      // setValue('topic', article.topic);

      // const selectedTopic = topics.find((topic) => topic.id === article.topicId);
      // console.log(selectedTopic)
      // setValue('topic', selectedTopic);
    }
  }, [article, setValue, topics]);

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
        console.log(response.data);
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
    formData.append('title', articleData.title);
    formData.append('author', articleData.author);
    formData.append('description', articleData.description);

    if (!articleData.topic) {
      const selectTopic = topics?.topics?.find((topic) => topic.name === article.topic);
      console.log(selectTopic);
      if (selectTopic) {
        formData.append('topic', selectTopic.id);
      }
    } else {

      formData.append('topic', articleData.topic.value);
    }

    formData.append('image', selectedImage[articleId]);

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

      // return response.data.data
      console.log('Response:', response.data);
    } catch (error) {
      throw error.response.data.meta;
    }
    reset();
    setImagePreview('');
    updateData()
    handleClose();
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Modal isOpen={openModal} onClose={onClose} type={'addArticle'}>
      <Modal.Title title={'Add Article'} />
      <div>
        <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader icon={<AddIcon />} handleChange={(file) => handleImageChange(file)}>
            <ImageThumbnail src={imagePreview} />
          </ImageUploader>
          <InputField name="id" label="ID" type="text" placeholder="12345" errors={errors} register={register} disabled={true} />
          <InputField name="title" label="Title" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
          <InputField name="author" label="Author" type="text" placeholder="Ex : Ruby Jane" errors={errors} register={register} />
          <TextEditor label={'Description'} name={'description'} register={register} control={control} />
          <Dropdown control={control} type="edit" name={'topic'} label={'Topic'} placeholder={article?.topic} handleSelect={handleSelectTopic}>
            {topics?.topics?.map((topic) => (
              <option label={topic.name} value={topic.id} key={topic.id} />
            ))}
          </Dropdown>
          <ButtonPrimary className="w-full">Save</ButtonPrimary>
        </form>

        <ButtonOutline className="w-full" onClick={handleClose}>
          close
        </ButtonOutline>
      </div>
    </Modal>
  );
};

export default EditArticleModal;
