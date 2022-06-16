import React, { useState } from "react";

import { Calendar } from "./Calendar/Calendar";
import { Selector } from "./Selector/Selector";

import "./DatePicker.css";

export const DatePicker = ({type, selectedDate, onChange }) => {
    const [shownDate, setShownDate] = useState(selectedDate[0].clone());

    return (
        <div className={"DatePicker"}>
            <Selector
                shownDate={shownDate}
                setShownDate={setShownDate}
            />

            <Calendar
                type={type}
                selectedDate={selectedDate}
                shownDate={shownDate}
                onChange={onChange}
            />
        </div>
    );
};
