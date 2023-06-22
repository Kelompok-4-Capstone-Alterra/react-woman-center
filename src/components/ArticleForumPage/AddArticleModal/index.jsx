import React from 'react';
import Modal from '../../Modal';
import ImageUploader from '../../ImageUploader';
import ImageThumbnail from '../../ImageUploader/ImageThumbnail';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonOutline from '../../ButtonOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextEditor } from '../../TextEditor';
import { getAuthCookie } from '../../../utils/cookies';

const { VITE_API_BASE_URL } = import.meta.env;

const AddArticleModal = ({ openModal, onClose }) => {
  const [topics, setTopics] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm();

  const getTopics = async (data) => {
    const token = getAuthCookie();
    const response = await axios.get(`${VITE_API_BASE_URL}/topics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTopics(response.data.data);
  };

  useEffect(() => {
    getTopics();
  }, []);

  const handleImageChange = (file) => {
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleSelectTopic = () => {
    const formData = getValues();
    const dropdownValue = formData.topic;
  };

  const onSubmit = async (articleData) => {
    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('author', articleData.author);
    formData.append('description', articleData.description);
    formData.append('topic', articleData.topic.value);
    formData.append('image', selectedImage);

    try {
      const token = getAuthCookie();

      const config = {
        method: 'POST',
        baseURL: VITE_API_BASE_URL,
        url: '/admin/articles',
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
    setImagePreview('')
    onClose(false)

  };

  const handleClose = () => {
    reset();
    setImagePreview('')
    onClose(false);
  };

  return (
    <Modal isOpen={openModal} onClose={onClose} type={'addArticle'}>
      <Modal.Title title={'Add Article'} />
      <div>
        <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <ImageUploader handleChange={(file) => handleImageChange(file)}>
              <ImageThumbnail src={imagePreview} />
            </ImageUploader>
          </div>

          <InputField name="title" label="Title" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
          <InputField name="author" label="Author" type="text" placeholder="Ex : Ruby Jane" errors={errors} register={register} />
          <TextEditor label={'Description'} name={'description'} register={register} control={control} />
          <Dropdown control={control} name={'topic'} label={'Topic'} placeholder={'Choose article`s Topics'} handleSelect={handleSelectTopic}>
            {topics?.topics?.map((topic) => (
              <option label={topic.name} value={topic.id} key={topic.id} />
            ))}
          </Dropdown>
          <ButtonPrimary className="w-full">
            <SaveAltIcon /> Save
          </ButtonPrimary>
        </form>

        <ButtonOutline className="w-full" onClick={handleClose}>
          close
        </ButtonOutline>
      </div>
    </Modal>
  );
};

export default AddArticleModal;
