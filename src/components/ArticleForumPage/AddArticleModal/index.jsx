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
import { AddRounded } from '@mui/icons-material';
import { TextEditor } from '../../TextEditor';
import { getAuthCookie } from '../../../utils/cookies';
import Popup from '../../Dashboard/Popup';

const { VITE_API_BASE_URL } = import.meta.env;

const AddArticleModal = ({ openModal, onClose, updateData }) => {
  const [topics, setTopics] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState('success');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    getTopics();
  }, []);

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

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

  const handleImageChange = (file) => {
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleSelectTopic = () => {};

  const onSubmit = async (articleData) => {
    try {
      const formData = new FormData();
      formData.append('title', articleData.title);
      formData.append('author', articleData.author);
      formData.append('description', articleData.description);
      formData.append('topic', articleData.topic.value);
      formData.append('image', selectedImage);

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

      handlePopup(true, response.data.meta.message);

      reset();
      setSelectedImage(null)
      setImagePreview('');
      updateData();
      onClose(false);
    } catch (error) {
      handlePopup(false, error.message);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedImage(null)
    setImagePreview('');
    onClose(false);
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      <Modal isOpen={openModal} onClose={handleClose} type={'addArticle'}>
        <Modal.Title title={'New Article'} />
        <div>
          <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <ImageUploader className="mb-4" icon={<AddRounded />} handleChange={(file) => handleImageChange(file)}>
                {!imagePreview ? <AddRounded /> : <ImageThumbnail src={imagePreview} />}
              </ImageUploader>
            </div>

            <InputField name="title" label="Title" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
            <InputField name="author" label="Author" type="text" placeholder="Ex : Ruby Jane" errors={errors} register={register} />
            <TextEditor label={'Description'} name={'description'} register={register} control={control} errors={errors} />
            <Dropdown control={control} name={'topic'} label={'Topic'} placeholder={'Choose article`s Topics'} handleSelect={handleSelectTopic} errors={errors}>
              {topics?.map((topic) => (
                <option label={topic.name} value={topic.id} key={topic.id} />
              ))}
            </Dropdown>
            <ButtonPrimary className="w-full flex justify-center items-center">
              {' '}
              <span className="text-[16px] font-medium">Save</span>
            </ButtonPrimary>
          </form>

          <ButtonOutline className="w-full flex justify-center items-center" onClick={handleClose}>
            <span className="text-[16px] font-medium">Discard</span>
          </ButtonOutline>
        </div>
      </Modal>
    </>
  );
};

export default AddArticleModal;
