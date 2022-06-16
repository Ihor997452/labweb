import React, { useState } from "react";
import dayjs from "dayjs";
import {DatePicker} from "./components/DatePicker/DatePicker";

function App() {
  const [date, setDate] = useState([dayjs()]);

  // possible types 'single', 'multiple', 'range'

  return (
      <div className="app__container">
        <div>
            <DatePicker type={'range'} selectedDate={date} onChange={setDate} />
        </div>
      </div>
  );
}

export default App;
