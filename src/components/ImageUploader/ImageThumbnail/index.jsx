const ImageThumbnail = ({ src }) => {
  return (
    <img className="absolute w-full h-full object-cover" src={src} alt="" />
  );
};

export default ImageThumbnail;
