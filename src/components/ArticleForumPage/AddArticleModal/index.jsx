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

const AddArticleModal = ({ modalState, closeModal }) => {
  const [topics, setTopics] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  const getProducts = async () => {
    const { data } = await axios.get(`https://13.210.163.192:8080/topics`);
    setTopics(data.data.topics);
    console.log(data.data.topics);
    console.log(topics);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSelectTopic = () => {
    const formData = getValues();
    const dropdownValue = formData.topic;

    console.log('Value: ', dropdownValue.label);
  };

  const onSubmit = (data) => {
    console.log(data);

  };

  return (
    <Modal isOpen={modalState} type={'addArticle'}>
      <Modal.Title title={'Add Article'} />
      <div>
        <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <ImageUploader icon={<AddIcon />}>
            <ImageThumbnail />
          </ImageUploader>
          </div>
          
         <InputField name="title" label="Title" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
          <InputField name="author" label="Author" type="text" placeholder="Ex : Ruby Jane" errors={errors} register={register} />
          <TextEditor label={'Description'} name={'description'} register={register} control={control} />
          <Dropdown control={control} name={'topic'} label={'Topic'} placeholder={'Choose article`s Topics'} handleSelect={handleSelectTopic}>
            {topics.map((topic) => (
              <option label={topic.name} key={topic.id} />
            ))}
          </Dropdown>
          <ButtonPrimary className="w-full">Save</ButtonPrimary>
        </form>

        <ButtonOutline className="w-full" onClick={closeModal}>
          close
        </ButtonOutline>
      </div>
    </Modal>
  );
};

export default AddArticleModal;
