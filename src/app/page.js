import styles from "./page.module.scss";
import Introduction from "../components/sections/Introduction";
import SkillsAndTools from "../components/sections/SkillsAndTools";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";

export default function Home() {
  return (
    <main className={styles.main}>
      <Introduction />
      {/* <SkillsAndTools /> */}
      <Experience />
      <Education />
    </main>
  );
}
