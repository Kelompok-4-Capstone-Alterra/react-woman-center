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
    getValues,
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
    }, 1500);
  };

  const getTopics = async () => {
    const token = getAuthCookie();
    const response = await axios.get(`${VITE_API_BASE_URL}/topics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTopics(response.data.data.topics);
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
    reset();
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
            <TextEditor label={'Description'} name={'description'} register={register} control={control} errors={errors}/>
            <Dropdown control={control} name={'topic'} label={'Topic'} placeholder={'Choose article`s Topics'} handleSelect={handleSelectTopic}>
              {topics?.map((topic) => (
                <option label={topic.name} value={topic.id} key={topic.id} />
              ))}
            </Dropdown>
            <ButtonPrimary className="w-full flex justify-center items-center">Save</ButtonPrimary>
          </form>

          <ButtonOutline className="w-full flex justify-center items-center" onClick={handleClose}>
            Discard
          </ButtonOutline>
        </div>
      </Modal>
    </>
  );
};

export default AddArticleModal;
