import { PersonRounded } from "@mui/icons-material";

const SubNavbar = () => {
  return (
    <div className="flex gap-3 ps-12 py-4 border-b">
      <PersonRounded className="text-primaryMain" />
      <p className="text-primaryMain font-semibold">Admin</p>
    </div>
  );
};

export default SubNavbar;
