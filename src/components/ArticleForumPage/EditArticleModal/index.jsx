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

const { VITE_API_BASE_URL } = import.meta.env;

const EditArticleModal = ({ openModal, onClose, articleId }) => {
  const [topics, setTopics] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    fetchArticleById();
  }, [articleId]);

  useEffect(() => {
    getTopics();
  }, []);

  const fetchArticleById = async () => {
    if (articleId) {
      try {
        const response = await getArticleById(articleId);
        const articleData = response.data;

        setValue('id', articleData.id);
        setValue('title', articleData.title);
        setValue('author', articleData.author);
        setValue('description', articleData.description);
        setValue('image', articleData.image);

        setImagePreview(articleData.image);

        const selectedTopic = topics?.find((topic) => topic.id === articleData.topicId);
        setValue('topic', selectedTopic);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTopics = async () => {
    const token = getAuthCookie();
    const response = await axios.get(`${VITE_API_BASE_URL}/topics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTopics(response.data.data);
  };

  

  const handleSelectTopic = () => {
    const formData = getValues();
    const dropdownValue = formData.topic;

    console.log('Value: ', dropdownValue.label);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Modal isOpen={openModal} onClose={onClose} type={'addArticle'}>
      <Modal.Title title={'Add Article'} />
      <div>
        <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader icon={<AddIcon />}>
            <ImageThumbnail src={imagePreview} />
          </ImageUploader>
          <InputField name="id" label="ID" type="text" placeholder="12345" errors={errors} register={register} />
          <InputField name="title" label="Title" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
          <InputField name="author" label="Author" type="text" placeholder="Ex : Ruby Jane" errors={errors} register={register} />
          <TextEditor label={'Description'} name={'description'} register={register} control={control} />
          <Dropdown control={control} name={'topic'} label={'Topic'} placeholder={'Choose article`s Topics'} handleSelect={handleSelectTopic}>
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
