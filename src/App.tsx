import { useState } from "react";
import SingleSelect from "./components/singleselect/SingleSelect";
import { options } from "./data";

function App() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0]);
  return (
    <div className="App">
      <SingleSelect
        options={options}
        value={value}
        onChange={(o) => setValue(o)}
      />
    </div>
  );
}

export default App;
