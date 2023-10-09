import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import TermsAndCondition from "src/views/staticPage/termsAndCondition";
import ManageCategory from "src/views/CategoryManagement/manageCategory";
import PrivacyPolicy from "src/views/staticPage/privacyPolicy";
import ManageCollection from "src/views/CollectionManagement/manageCollection";
import ManageCommunity from "src/views/CommunityManagement/manageCommunity";
import ManagePartner from "src/views/PartnerManagement/managePartner";
import AddGallery from "src/views/CollectionManagement/addCollection";
import ManageSlider from "src/views/HomeSlider2/manageSlider";
import ManageRoadmap from "src/views/Roadmap/manageRoadmap";
import GrillManagement from "src/views/GriullManagement/GrillManagement";
import ViewData from "src/views/ContactManagement/ViewData";
import ManageArtist from "src/views/ArtistManagement/manageArtist";
import EditCollection from "src/views/CollectionManagement/EditCollection";
import CSVUplopad from "src/views/CollectionManagement/csvUpload";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const SamplePage = Loadable(
  lazy(() => import("../views/sample-page/SamplePage"))
);
const Icons = Loadable(lazy(() => import("../views/icons/Icons")));
const TypographyPage = Loadable(
  lazy(() => import("../views/utilities/TypographyPage"))
);
const Shadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/category-management" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/privacy-policy", exact: true, element: <PrivacyPolicy /> },
      { path: "/terms-and-condition", exact: true, element: <TermsAndCondition /> },
      { path: "/category-management", exact: true, element: <ManageCategory /> },
      { path: "/community-management", exact: true, element: <ManageCommunity /> },
      { path: "/partner-management", exact: true, element: <ManagePartner /> },
      { path: "/collection-management", exact: true, element: <ManageCollection /> },
      { path: "/csv-upload", exact: true, element: <CSVUplopad /> },
      { path: "/artist-management", exact: true, element: <ManageArtist /> },
      { path: "/slider-management", exact: true, element: <ManageSlider /> },
      { path: "/roadmap-management", exact: true, element: <ManageRoadmap /> },
      { path: "/grill-management", exact: true, element: <GrillManagement /> },
      { path: "/contact-management", exact: true, element: <ViewData /> },
      { path: "/add-gallery", exact: true, element: <AddGallery /> },
      { path: "/edit-gallery/:id", exact: true, element: <EditCollection /> },
  
      { path: "/icons", exact: true, element: <Icons />},
      { path: "/ui/typography", exact: true, element: <TypographyPage /> },
      { path: "/ui/shadow", exact: true, element: <Shadow /> },
      { path: "*", element: <Navigate to="/auth/404" /> }
    ]
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> }
    ]
  }
];

export default Router;
