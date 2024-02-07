

import Accordion from "../accordion/Accordion";
export default function Education() {


  const educationData = [
    {
      title: "Information tech & information Systems",
      company: "TU Dublin",
      location: "Dublin",
      websiteText: 'Course Details',
      websiteLink: 'https://www.tudublin.ie/study/part-time/courses/information-systems-and-information-technology/',
      award: "Honours Bachelors Degree",
      time: "2018 - 2024",
      description:
        [<p key='1' > Y1 - 1: 1(Web Applications, Adv Mathamatics, Comp Tech, Data Analytics)</p >,
        <p key='2'>Y2 - 1:1 (Native Software Dev, Networking, Databases)</p>,
        <p key='3'>Y3 - 1:1 (Full stack dev, Software Engineering, Adv Database, Adv Networking)</p>,
        <p key='4'>Y4 - 1:1 (Distributed Systems, Ethical hacking, Machine learning, Security Sys)</p>,
        <p key='5'>Y4 - (Pending) Dissertation Project </p>],
      skills: [
        "Fundamental Computer Skills",
        "Information Systems Concepts",
        "Basic Programming & Algorithms",
        "Web Interface Design",
        "Computer Technology Basics",
        "Data Structures & Algorithms",
        "Object-Oriented Programming Principles",
        "Advanced Database Systems",
        "Computer Communication & Networking",
        "Software Engineering Processes",
        "IT Law & Ethics",
        "Cloud Computing Platforms",
        "International App Development",
        "IT Project Management",
        "Advanced Cryptography",
        "Geographic Information Systems",
        "Distributed Systems Understanding",
        "Machine Learning for Analysis",
        "Information Security Protocols",
        "Bioinformatics Techniques"
      ],
    },
    {
      title: "Software Developement pre-degree",
      company: 'Crumlin College',
      location: "Dublin",
      websiteText: 'Course Details',
      websiteLink: 'https://www.crumlincollege.ie/full-time-courses/information-technology#tab_content_2',
      award: "Certificate",
      time: "2017 - 2018",
      description: "",
      skills: ['Java Development', 'Mathamatics', 'Web Design']
    },
  ];

  return (
    <div id="education">
      <div>
        <h1 className="flex justify-center">🎓 Education</h1>
        <Accordion data={educationData} />
      </div>
    </div>
  );
}
