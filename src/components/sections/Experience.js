"use client";

import React, { useState } from "react";
import styles from "./experience.module.scss";
import Card from "./Card";

export default function Experience() {
  const jobs = [
    {
      title: "Software Engineer",
      location: "Nuritas",
      time: "Current - 1y 8mos",
      description:
        "Developed and maintained an internal data warehouse and user interface Collaborated with Data Science teams to build APIs and logic functions Championed UI/UX design, improving and implementing new designs into React",
    },
    {
      title: "Full Stack Web Developer",
      location: "Freelance",
      time: "5mos",
      description:
        "Working directly with Clients to design and develope full stack website aplications. Focus on the MERN stack with React frontend and Node/Express backend. Data bases focused on SQL or MongoDB. Designwork in photoshop and Figma",
    },
    {
      title: "Web Support Intern",
      location: "Glowfox",
      time: "5mos",
      description:
        "Worked Closely with B2B the integration of the Glofox Web plaform into the clients dedicated websites. First line of support of all web Developement quieres both internally and externally.",
    },
    {
      title: "Software Developer Intern",
      location: "Cloudtech Ltd",
      time: "8mos",
      description:
        "Custom Software Solutions. CRM Setup & Management. Native & Web development. Project Management & Documentation.",
    },
    {
      title: "1st & 2nd Tech Support.",
      location: "Hewlett Packard Enterprise",
      time: "1y 6mos",
      description:
        "Specialist IT support to first level agents. resolving major issues with clients software and hardware. Active Directory provisioning. Coaching & mentorship of peers. Control of Knowledge Base.",
    },
    {
      title: "Audio Visual Technician",
      location: "Sonics AVI",
      time: "10mos",
      description:
        "Provide IT support to engineers. First line of IT support to client. Building comms racks. Hardware install & setup. face to face client support. Cable crimping & running.",
    },
    {
      title: "Graphic Designer & Media Manager.",
      location: "Sin Nightclub",
      time: "5y 3m",
      description:
        "Full creative control of the company. Full Adobe Suite competence. Start-to-finish design projects. Budget setting and cash flow. Club and event creation. Promotion and marketing.",
    },
  ];

  return (
    <div id="experience">
      <h1 className="flex justify-center">Experience</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map((job, i) => {
          return <Card content={job} key={i} />;
        })}
      </div>
    </div>
  );
}
