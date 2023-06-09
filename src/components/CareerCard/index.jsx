const CareerCard = () => {
  return (
    <div className="flex gap-8 p-4 m-10 border rounded-md">
      <div className="w-52 h-52">
        <img
          src="https://i.pinimg.com/564x/ce/98/e6/ce98e62c9b274797d47200bdd1ab8fc5.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">Beauty Musician</h3>
        <p>PT Somethink Indonesia</p>
        <p>Kemang, Jakarta Selatan </p>
        <h6 className="font-semibold">Rp. 5.000.000</h6>
      </div>
      <div></div>
    </div>
  );
};

export default CareerCard;
