import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScreensLogin } from "@screens/login";
import { redirect } from "react-router-dom";
import { ScreensSongs } from "@screens/songs";
import { ScreensSubscribers } from "@screens/subscribers";

// for routing path to scren
const ScreensRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComponentRedirector />} />
        <Route path="/login" element={<ScreensLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

const ComponentRedirector = () => {
  // redirect to login screen if not logged in
  const token = localStorage.getItem("token");
  if (!token) {
    redirect("/login");
  }
  let isAdmin = false;

  if (isAdmin) {
    return <ScreensSubscribers />;
  } else {
    return <ScreensSongs />;
  }
};

export default ScreensRouter;
