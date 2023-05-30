import styles from "./skills.module.scss";

export default function SkillsAndTools() {
  const skills = {
    Frontend: [
      "HTML, CSS, Sass",
      "JavaScript, JSX",
      "React",
      "Next.Js",
      "JSON",
      "Redux",
      "Framer Motion",

      "Chart.js",
    ],
    Backend: [
      "Node",
      "Express.JS",
      "Python",
      "Django, DRF",
      "Anaconda",
      "postgresql",
      "SQL",
    ],
    "CLI & Version Control": ["Git", "GitHub", "GitLab", "Docker", "WSL"],
    DevOps: ["Azure", "AWS", "Docker", "Firebase", "Netlify", "Github Pages"],
    "Design & Tools": [
      "Photoshop",
      "Illustrator",
      "Figma",
      "Premiere Pro",
      "VS Code",
      "Trello",
    ],
    "Data Modeling": ["UML/ERDs", "Datagrip", "MongoDB Atlas"],
    "Project Management": [
      "Scrum",
      "Agile",
      "Asana",
      "User Stories",
      "Stakeholder Management",
      "Sprint Planning",
    ],
  };

  const tableHeaders = Object.keys(skills);
  const tableRows = Object.values(skills);

  const TableBody = () => {
    const maxRows = tableRows.reduce(
      (max, arr) => Math.max(max, arr.length),
      0
    );

    return (
      <tbody>
        {Array.from({ length: maxRows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {tableRows.map((column, columnIndex) => (
              <td key={columnIndex}>
                {column[rowIndex] ? column[rowIndex] : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const Table = () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <TableBody />
      </table>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔧 Skills and recent tools</h1>
      <Table />
    </div>
  );
}
