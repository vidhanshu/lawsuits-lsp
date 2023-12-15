import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const routes = {
  HOME_ROUTE: "/",
  REQUESTS_ROUTE: "/requests",
  DUMMY_ROUTE: "/dummy",
  ONBOARDING_FORM_ROUTE: "/onboarding-form",

  AUTH_SIGNIN_ROUTE: "/sign-in",
  AUTH_SIGNUP_ROUTE: "/sign-up",
  AUTH_FORGET_PASSWORD_ROUTE: "/forget-password",
};

export const NAV_LINKS = [
  {
    name: "Home",
    path: routes.HOME_ROUTE,
  },
  {
    name: "Requests",
    path: routes.REQUESTS_ROUTE,
  },
  {
    name: "Dummy",
    path: routes.DUMMY_ROUTE,
  },
];

export const FOOTER = {
  socials: [
    {
      Icon: Facebook,
      link: "/",
    },
    {
      Icon: Linkedin,
      link: "/",
    },
    {
      Icon: Twitter,
      link: "/",
    },
    {
      Icon: Instagram,
      link: "/",
    },
  ],

  items: [
    {
      title: "Services",
      links: [
        {
          name: "Service 1",
          link: "/",
        },
        {
          name: "Service 2",
          link: "/",
        },
        {
          name: "Service 3",
          link: "/",
        },
      ],
    },
    {
      title: "About",
      links: [
        {
          name: "About Us",
          link: "/",
        },
        {
          name: "Contact Us",
          link: "/",
        },
        {
          name: "Privacy Policy",
          link: "/",
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          name: "FAQ",
          link: "/",
        },
        {
          name: "Help Desk",
          link: "/",
        },
        {
          name: "Forums",
          link: "/",
        },
      ],
    },
  ],
};

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/msword": [".doc"],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024;