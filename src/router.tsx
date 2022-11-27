import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScreensLogin } from "@screens/login";
import { ScreensRegister } from "@screens/register";
import { useNavigate } from "react-router-dom";
import { ScreensSongs } from "@screens/songs";
import { ScreensSubscribers } from "@screens/subscribers";
import { useUserStore } from "@features/store";
import { config } from "@config";
// for routing path to scren
const ScreensRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageRedirectorAndUserStoreSetter />} />
        <Route path="/login" element={<ScreensLogin />} />
        <Route path="/register" element={<ScreensRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

const PageRedirectorAndUserStoreSetter = () => {
  let navigate = useNavigate();
  // redirect to login screen if not logged in
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("no token");
    navigate("/login");
    return <>redirect</>;
  } else {
    console.log("token");
  }

  // set user store
  fetch(config.REST_API_URL + "/userInfo", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // set store
      let setUsername = useUserStore.getState().setUsername;
      let setIsAdmin = useUserStore.getState().setIsAdmin;
      setUsername(data.username);
      setIsAdmin(data.isAdmin);

      if (data.isAdmin) {
        return <ScreensSubscribers />;
      } else {
        return <ScreensSongs />;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return <div>asdf</div>;
};

export default ScreensRouter;
