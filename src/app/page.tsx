import Converter from "@/components/converter";

import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <h1>Currency Converter</h1>
      </div>
      <Converter />
    </div>
  );
};
export default Home;
