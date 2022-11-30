export const FeaturesBarHeader = () => {
  const handleOnLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div>
      this is Headerbar
      <button onClick={handleOnLogout}>logout</button>
    </div>
  );
};
