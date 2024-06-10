import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "../components/SmoothScroll/SmoothScroll";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/HomePages";
import { StaticPage } from "../pages/StaticPage";

const RouterLinks = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/404" element={<ErrorPage />}/>
            <Route path="/static-page/:slug" element={<StaticPage/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterLinks;
