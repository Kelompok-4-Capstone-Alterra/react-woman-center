import React from 'react';
import Modal from '../../Modal';
import InputField from '../../InputField';
import ButtonPrimary from '../../ButtonPrimary';
import { useForm } from 'react-hook-form';

const LinkModal = ({ modalState, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm();
  return (
    <Modal isOpen={modalState} type={'link'}>
      <Modal.Title title={'Bad Experience'} />
      <InputField name="link" label="Forum Link" type="text" placeholder="Ex : How to get women's right?" errors={errors} register={register} />
      <ButtonPrimary className="w-full" onClick={closeModal}>
        Close
      </ButtonPrimary>
    </Modal>
  );
};

export default LinkModal;
