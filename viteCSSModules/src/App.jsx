import { Child } from "./Child";
import styles from "./parent.module.css";

export default function App() {
  return (
    <div>
      <h1 className={styles.header}>App</h1>
      <Child />
    </div>
  );
}
