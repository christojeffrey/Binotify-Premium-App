import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScreensLogin } from "@screens/login";
import { ScreensRegister } from "@screens/register";
import { useNavigate } from "react-router-dom";
import { ScreensSongs } from "@screens/songs";
import { ScreensSubscribers } from "@screens/subscribers";
import { useUserStore } from "@features/store";
import { config } from "@config";
import { useEffect, useState } from "react";
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
  const [isChecked, setIsChecked] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    // redirect to login screen if not logged in
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("no token");
      navigate("/login");
    } else {
      // set user store
      fetch(config.REST_API_URL + "/userInfo", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // clear token in localstorage
            localStorage.removeItem("token");
            navigate("/login");
          }
          // set user store
          let setIsAdmin = useUserStore.getState().setIsAdmin;
          let setUsername = useUserStore.getState().setUsername;
          let setName = useUserStore.getState().setName;
          setIsAdmin(data.is_admin);
          setUsername(data.username);
          setName(data.name);

          // set isCehcked
          setIsChecked(true);
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    }
  }, []);
  if (!isChecked) {
    return <>loading</>;
  }
  if (useUserStore.getState().isAdmin) {
    return <ScreensSubscribers />;
  } else {
    return <ScreensSongs />;
  }
};

export default ScreensRouter;
