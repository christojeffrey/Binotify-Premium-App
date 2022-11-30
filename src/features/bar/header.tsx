import { useUserStore } from "@features/store";

export const FeaturesBarHeader = () => {
  // username
  const username = useUserStore((state: any) => state.username);
  const handleOnLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="border-2 border-white">
      <span className="absolute right-4">hi, {username}!</span>
      <div onClick={handleOnLogout}>
        <a className="text-gray-500 hover:text-gray-200">logout</a>
      </div>
    </div>
  );
};
