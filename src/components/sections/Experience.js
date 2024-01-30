"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image'
import styles from "./experience.module.scss";
import Accordion from "../accordion/Accordion";
//images
import nuritasLogo from '/public/images/NuritasLogo.png'
import glofoxLogo from '/public/images/glofox.svg'
import cloudtechLogo from '/public/images/cloudtechLogo.png'
import sinLogo from '/public/images/sinLogo.png'


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
      time: "Oct 2021 - Oct 2023",
      duration: '2 yrs',
      location: "Dublin",
      websiteText: 'Nuritas.com',
      websiteLink: 'https://Nuritas.com',
      logo: <Image src={nuritasLogo} alt="Nuritas Logo" />,
      description:
        "Developed and maintained an internal data warehouse and user interface Collaborated with Data Science teams to build APIs and logic functions Championed UI/UX design, improving and implementing new designs into React",
      skills: ["JavaScript", "CSS/Sass", "Ui Design", "Python", "React", "Next.js", "Django", "MySql", "gitlab", "API Dev",],
    },
    {
      title: "Web Developer",
      company: "Freelance",
      time: "May 2021 - Oct 2021",
      duration: '6 mos',
      location: "Dublin",
      websiteText: 'NA',
      websiteLink: '',
      logo: '',
      description:
        "Working directly with Clients to design and develope full stack website aplications. Focus on the MERN stack with React frontend and Node/Express backend. Data bases focused on SQL or MongoDB. Designwork in photoshop and Figma",
      skills: ["JavaScript", "React", "Express.js", "MongoDB"],
    },
    {
      title: "Web Support Intern",
      company: "Glo fox",
      time: "Aug 2020 - Feb 2021",
      duration: '7 mos',
      location: "Dublin",
      websiteText: 'Glofox.com',
      websiteLink: 'https://glofox.com',
      logo: <Image src={glofoxLogo} alt="Glofox Logo" />,
      description:
        "Worked Closely with B2B the integration of the Glofox Web plaform into the clients dedicated websites. First line of support of all web Developement quieres both internally and externally.",
      skills: ["JavaScript", "HTML", "Angular", "CSS", 'Wordpress',],
    },
    {
      title: "Software Developer Intern",
      company: "Cloudtech Ltd",
      time: "Jan 2020 - Aug 2020",
      duration: '8 mos',
      location: "Kildare",
      websiteText: 'Cloudtech.ie',
      websiteLink: 'https://Cloudtech.ie',
      logo: <Image src={cloudtechLogo} alt="Cloudtech Logo" />,
      description:
        "Custom Software Solutions. CRM Setup & Management. Native & Web development. Project Management & Documentation.",
      skills: ["JavaScript", "CMS", "REST API", "ZOHO", "Salesforce"],
    },
    {
      title: "1st & 2nd Tech Support",
      company: "Hewlett Packard",
      time: "Jun 2018 - Jan 2020",
      duration: '1 yr 8 mos',
      location: "Dublin",
      websiteText: 'HPE',
      websiteLink: 'https://hpe.com/ie/en/home.html',
      logo: '',
      description:
        "Specialist IT support to first level agents. resolving major issues with clients software and hardware. Active Directory provisioning. Coaching & mentorship of peers. Control of Knowledge Base.",
      skills: ["ServiceNow", "Windows Support", "System Directory", "Customer Tech Support"],
    },
    {
      title: "Audio Visual Technician",
      company: "Sonics AVI",
      time: "Aug 2018 - Jun 2018",
      duration: '5 mos',
      location: "Dublin",
      websiteText: 'Sonics AVI / AVISPL',
      websiteLink: 'https://avispl.co.uk/locations/dublin/',
      logo: '',
      description:
        "Provide IT support to engineers. First line of IT support to client. Building comms racks. Hardware install & setup. face to face client support. Cable crimping & running.",
      skills: ["Customer Support", "On-site Installation", "Server Hardware", "Network install", "Audio & visual Hardware"],
    },
    {
      title: "Graphic Designer & Media Manager",
      company: "Sin Nightclub",
      time: "May 2012 - Aug 2017",
      duration: '5 yrs 4 mos',
      location: "Dublin",
      websiteText: 'Sin Nightclub',
      websiteLink: 'https://facebook.com/DublinSin/',
      logo: <Image src={sinLogo} alt="Sin Logo" />,
      description:
        "Full creative control of the company. Full Adobe Suite competence. Start-to-finish design projects. Budget setting and cash flow. Club and event creation. Promotion and marketing.",
      skills: ["Graphic Design", "Event Management", "Customer Support", "Budget & Cashflow", "Marketing", "Videography"],
    },
  ];

  return (
    <div id="experience" className={styles.sectionContainer}>
      <h1 className="flex justify-center">Experience</h1>

      <Accordion data={jobs} />

    </div>
  );
}
