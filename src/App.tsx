import { useState } from "react";
import SingleSelect, {
  SelectOption,
} from "./components/singleselect/SingleSelect";
import { options } from "./data";
import styles from "./styles/app.module.css";

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <div>
      <div className={styles.app}>
        <div className={styles.select}>
          <h1>Multi Tab Select</h1>
          <SingleSelect
            multiple
            options={options}
            value={value1}
            onChange={(o) => setValue1(o)}
          />
        </div>
        <br />
        <div className={styles.select}>
          <h1>Single Select</h1>
          <SingleSelect
            options={options}
            value={value2}
            onChange={(o) => setValue2(o)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
