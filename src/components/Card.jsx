const Card = ({ title, amount, icon }) => {
  return (
    <div className="card w-[372px] h-[176px] ml-6 my-8 rounded-xl bg-white shadow-md ">
      <div className="text-2xl font-semibold pl-10 pt-10 ">
        {title}
        <div className="float-right mr-[53px] text-primaryPressed text-2xl">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold pl-10 pt-[20px]"> {amount} </div>
    </div>
  );
};

export default Card;
