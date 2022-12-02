import { useUserStore } from "@features/store";
import AppBar from '@mui/material/AppBar';

export const FeaturesBarHeader = () => {
  // username
  const username = useUserStore((state: any) => state.username);
  const handleOnLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AppBar position="static" sx={{backgroundImage: "none", backgroundColor: "transparent", padding: "1rem"}}>
      <div className="flex justify-end">
        <span className="">hi, {username}!</span>
        <div onClick={handleOnLogout}>
          <a className="text-gray-500 hover:text-green-500 text-gray-200 rounded-full bg-black p-4 mx-4 cursor-pointer">logout</a>
        </div>
      </div>

    </AppBar>
  );
};
