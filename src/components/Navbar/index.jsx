const Navbar = ({ page }) => {
  return (
    <div className="flex flex-col justify-center h-24 bg-primaryPressed ps-12 py-14 -z-10 gap-1">
      <h1 className="text-2xl text-white">Dashboard</h1>
      <h2 className="text-white pt-1">{page}</h2>
    </div>
  );
};

export default Navbar;
