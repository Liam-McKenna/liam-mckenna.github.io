import styles from "./page.module.scss";
import Introduction from "../components/sections/Introduction";
import Expertise from "../components/sections/Expertise";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";

export default function Home() {
  return (
    <main className={styles.main}>
      <Introduction />
      <Expertise />
      <Experience />
      <Education />
    </main>
  );
}
