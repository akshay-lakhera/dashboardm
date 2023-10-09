import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus
} from "@tabler/icons";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home"
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard"
  },
  {
    navlabel: true,
    subheader: "Utilities"
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/ui/typography"
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/ui/shadow"
  },
  {
    navlabel: true,
    subheader: "Auth"
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/auth/login"
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/auth/register"
  },
  {
    navlabel: true,
    subheader: "Extra"
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons"
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page"
  }
];

export const Menuitems2 = [
  

  {
    navlabel: true,
    subheader: "Home"
  },
  {
    id: uniqueId(),
    title: "Home Slider",
    icon: IconLayoutDashboard,
    href: "/slider-management"
  },
  {
    id: uniqueId(),
    title: "Grills",
    icon: IconLayoutDashboard,
    href: "/grill-management"
  },

  {
    navlabel: true,
    subheader: "Gallery"
  },

   {
    id: uniqueId(),
    title: "Gallery Attribute",
    icon: IconLayoutDashboard,
    href: "/category-management"
  },
   
   {
    id: uniqueId(),
    title: "Gallery",
    icon: IconLayoutDashboard,
    href: "/collection-management"
  },
  {
    navlabel: true,
    subheader: "Other Pages"
  },

   {
    id: uniqueId(),
    title: "Roadmap",
    icon: IconLayoutDashboard,
    href: "/roadmap-management"
  },
   {
    id: uniqueId(),
    title: "Artist",
    icon: IconLayoutDashboard,
    href: "/artist-management"
  },
   
   {
    id: uniqueId(),
    title: "Communities",
    icon: IconLayoutDashboard,
    href: "/community-management"
  },
   {
    id: uniqueId(),
    title: "Partners",
    icon: IconLayoutDashboard,
    href: "/partner-management"
  },
  
  {
    navlabel: true,
    subheader: "Static Pages"
  },
    {
    id: uniqueId(),
    title: "Messages",
    icon: IconLayoutDashboard,
    href: "/contact-management"
  },
  {
    id: uniqueId(),
    title: "Privacy Policy",
    icon: IconLayoutDashboard,
    href: "/privacy-policy"
  },
  {
    id: uniqueId(),
    title: "Terms & Condition",
    icon: IconLayoutDashboard,
    href: "/terms-and-condition"
  },
  // {
  //   id: uniqueId(),
  //   title: "Manage Session",
  //   icon: IconLayoutDashboard,
  //   href: "/manage-session"
  // }
];

export default Menuitems;
