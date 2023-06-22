"use client";

import React, { useState, useEffect } from "react";
import styles from "./experience.module.scss";
import Card from "../card/Card";

export default function Experience() {
  const [openPopupIndex, setOpenPopupIndex] = useState(null);

  const handleCardClick = (index) => {
    if (openPopupIndex === index) {
      setOpenPopupIndex(null);
    } else {
      setOpenPopupIndex(index);
    }
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest("#experience .card") &&
      !event.target.closest(".popup")
    ) {
      setOpenPopupIndex(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const jobs = [
    {
      title: "Software Engineer",
      company: "Nuritas",
      time: "1 Year  8 Months  -  Oct 2021 -> Now",
      description:
        "Developed and maintained an internal data warehouse and user interface Collaborated with Data Science teams to build APIs and logic functions Championed UI/UX design, improving and implementing new designs into React",
    },
    {
      title: "Web Developer",
      company: "Freelance",
      time: " 5 Months  -  May 2021 -> Oct 2021",
      description:
        "Working directly with Clients to design and develope full stack website aplications. Focus on the MERN stack with React frontend and Node/Express backend. Data bases focused on SQL or MongoDB. Designwork in photoshop and Figma",
    },
    {
      title: "Web Support Intern",
      company: "Glowfox",
      time: " 5 Months  -  May 2021 -> Oct 2021",
      description:
        "Worked Closely with B2B the integration of the Glofox Web plaform into the clients dedicated websites. First line of support of all web Developement quieres both internally and externally.",
    },
    {
      title: "Software Developer Intern",
      company: "Cloudtech Ltd",
      time: " 5 Months  -  May 2021 -> Oct 2021",
      description:
        "Custom Software Solutions. CRM Setup & Management. Native & Web development. Project Management & Documentation.",
    },
    {
      title: "1st & 2nd Tech Support",
      company: "Hewlett Packard",
      time: " 5 Months  -  May 2021 -> Oct 2021",
      description:
        "Specialist IT support to first level agents. resolving major issues with clients software and hardware. Active Directory provisioning. Coaching & mentorship of peers. Control of Knowledge Base.",
    },
    {
      title: "Audio Visual Technician",
      company: "Sonics AVI",
      time: " 5 Months  -  May 2021 -> Oct 2021",
      description:
        "Provide IT support to engineers. First line of IT support to client. Building comms racks. Hardware install & setup. face to face client support. Cable crimping & running.",
    },
    {
      title: "Graphic Designer & Media Manager",
      company: "Sin Nightclub",
      time: "5 Years 3 Months -  May 2021 -> Oct 2021",
      description:
        "Full creative control of the company. Full Adobe Suite competence. Start-to-finish design projects. Budget setting and cash flow. Club and event creation. Promotion and marketing.",
    },
  ];

  return (
    <div id="experience">
      <h1 className="flex justify-center">Experience</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map((job, i) => {
          return (
            <Card
              content={job}
              key={i}
              index={i}
              onClick={handleCardClick}
              isOpen={openPopupIndex === i}
            />
          );
        })}
      </div>
    </div>
  );
}
