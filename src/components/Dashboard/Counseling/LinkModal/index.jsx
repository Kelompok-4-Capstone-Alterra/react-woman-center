import React from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../../Dropdown";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import InputField from "../../../InputField";
import { sendTransactionLink } from "../../../../api/transaction";

const LinkModal = ({
  modalState,
  closeModal,
  transactionId,
  onSubmit,
  counselor,
  consultationMethod,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={modalState} type={"link"} onClose={closeModal}>
      <p className="text-[16px] font-medium text-neutralMedium">
        {counselor.id}
      </p>
      <h2 className="font-medium text-[22px] text-neutralHigh">
        {counselor.name}
      </h2>
      <p className="font-medium text-[16px] text-neutralHigh mb-6">
        {consultationMethod}
      </p>
      <form
        onSubmit={handleSubmit(({ link }) => {
          console.log(link);
          sendTransactionLink(transactionId, link)
            .then((data) => {
              onSubmit(true, "success");
            })
            .catch((error) => {
              onSubmit(false, "failed");
            });
          closeModal();
        })}
      >
        <InputField
          name={"link"}
          label={"Insert Counseling's Link"}
          placeholder={"Your Link"}
          register={register}
          errors={errors}
        />
        <ButtonPrimary
          onClick={() => {}}
          className="flex items-center justify-center w-full h-[56px] mb-4 text-[17px]"
        >
          Send Link
        </ButtonPrimary>
        <ButtonOutline
          type="button"
          onClick={closeModal}
          className="flex items-center justify-center h-[56px] w-full text-[17px]"
        >
          Not Now
        </ButtonOutline>
      </form>
    </Modal>
  );
};

export default LinkModal;
