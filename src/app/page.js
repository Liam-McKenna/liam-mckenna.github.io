import Image from "next/image";
import styles from "./page.module.css";
import Contact from "../components/sections/Contact";
import Introduction from "../components/sections/Introduction";
import SkillsAndTools from "../components/sections/SkillsAndTools";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Liam McKenna | Software Engineer</h1>
      <Contact />
      <Introduction />
      <SkillsAndTools />
      <Experience />
      <Education />
    </main>
  );
}
