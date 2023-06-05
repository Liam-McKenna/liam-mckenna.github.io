import Card from "./Card";

export default function Education() {
  const educationData = [
    {
      title: "Information tech & information Systems",
      location: "Honours Bachelors Degree",
      time: "Technology University Dublin | sept 2018 - 2022",
      description:
        "Y1 - 1:1 ( Web Applications, Adv Mathamatics, Comp Tech, Data Analytics)Y2 - 1:1 ( Native Software Dev, Networking, Databases) Y3 - 1:1 ( Full stack dev, Software Engineering, Adv Database, Adv Networking) Y4 - pending ( Distributed Systems, Ethical hacking, Machine learning, Security Sys)",
    },
    {
      title: "Software Engineering",
      location: "Certificate",
      time: "Crumlin College | setp 2017 - 201",
      description: "Y1 - 1:1 (Java Development - Mathamatics - Web Design)",
    },
  ];

  return (
    <div>
      <div>
        <h1 className="flex justify-center">🎓 Education</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {educationData.map((e, i) => {
            return <Card content={e} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
