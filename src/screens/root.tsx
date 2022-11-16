import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScreensHome } from "@screens/home";
import { ScreensLogin } from "@screens/login";
const ScreensRoot = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScreensHome />} />
        <Route path="/login" element={<ScreensLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ScreensRoot;
