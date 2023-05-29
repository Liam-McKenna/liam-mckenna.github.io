import styles from "./skills.module.scss";

export default function SkillsAndTools() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔧 Skills and recent tools</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Frontend</th>
            <th>Backend</th>
            <th>CLI & Version Control</th>
            <th>DevOps</th>
            <th>Design & Tools</th>
            <th>Data Modeling</th>
            <th>Project Management</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HTML, CSS</td>
            <td>Node</td>
            <td>Git</td>
            <td>Azure</td>
            <td>Photoshop</td>
            <td>UML/ERDs</td>
            <td>Scrum</td>
          </tr>
          <tr>
            <td>JavaScript</td>
            <td>Express.JS</td>
            <td>GitHub</td>
            <td>AWS</td>
            <td>Illustrator</td>
            <td></td>
            <td>Agile</td>
          </tr>
          <tr>
            <td>JSX</td>
            <td>Python</td>
            <td>GitLab</td>
            <td>Docker</td>
            <td>Figma</td>
            <td></td>
            <td>Asana</td>
          </tr>
          <tr>
            <td>JSON</td>
            <td>Django, DRF</td>
            <td>Docker</td>
            <td>Firebase</td>
            <td>Premiere Pro</td>
            <td></td>
            <td>User Stories</td>
          </tr>
          <tr>
            <td>React</td>
            <td>Anaconda</td>
            <td>WSL</td>
            <td>Netlify</td>
            <td>VS Code</td>
            <td></td>
            <td>Stakeholder Management</td>
          </tr>
          <tr>
            <td>Redux</td>
            <td>postgresql</td>
            <td></td>
            <td></td>
            <td>Trello</td>
            <td></td>
            <td>Sprint Planning</td>
          </tr>
          <tr>
            <td>Framer Motion</td>
            <td>SQL</td>
            <td></td>
            <td></td>
            <td>Datagrip</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Next.Js</td>
            <td></td>
            <td></td>
            <td></td>
            <td>MongoDB Atlas</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Chart.js</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
