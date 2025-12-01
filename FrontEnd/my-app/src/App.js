import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ReviewPage from "./Pages/ReviewPage";
import NotFoundPage from "./Pages/PageNotFound";
import CoursePage from "./Pages/CoursePage";
import DescriptionPage from "./Pages/DescriptionPage";
// import Card from "./Components/Card";
// import Card22 from "./Components/Card22";
import CreateCoursePage from "./Pages/CreateCoursePage";
import RequireAuth from "./Components/Auth/RequireAuth";
import CreateCourse from "./CreateCourse";
import AccessDeniedPage from "./Pages/AccessDeniedPage";
import UserInfoPage from "./Pages/UserInfoPage";
import UserProfileUpdation from "./Pages/UserProfileUpdation";
import NewLeacture from "./Pages/NewLeacture";
import GetAllTheCourseLeactures from "./Pages/GetAllTheCourseLeactures";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/course/description" element={<DescriptionPage />} />
        <Route path="/denied" element={<AccessDeniedPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/course/leacture" element={<NewLeacture/>}/>
        <Route path="/course/leactures" element={<GetAllTheCourseLeactures/>}/>


        {/* <Route path="/Profile" element={<UserInfoPage />} />
        <Route path="/user/profileUpdate" element={<UserProfileUpdation />} /> */}


        {/* only ADMIN can access this page */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCoursePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
        <Route path="/Profile" element={<UserInfoPage />} />
        <Route path="/user/profileUpdate" element={<UserProfileUpdation />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
