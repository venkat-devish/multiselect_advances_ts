import { useState } from "react";
import SingleSelect, {
  SelectOption,
} from "./components/singleselect/SingleSelect";
import { options } from "./data";

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <div className="App">
      <SingleSelect
        multiple
        options={options}
        value={value1}
        onChange={(o) => setValue1(o)}
      />
      <br />
      <SingleSelect
        options={options}
        value={value2}
        onChange={(o) => setValue2(o)}
      />
    </div>
  );
}

export default App;
