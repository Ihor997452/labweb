import React, {useState} from "react";
import clsx from "clsx";

import { getCalendarRows } from "../util";

import "./Calendar.css";
import dayjs from "dayjs";

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export const Calendar = ({type, shownDate, selectedDate, onChange}) => {
    const forceUpdate = useForceUpdate();

    const contains = (value) => {
        for (let i = 0; i < selectedDate.length; i++) {
            if (selectedDate[i].toString() === value.toString()) {
                return true;
            }
        }

        return false;
    }

    const remove = (value) => {
        if (selectedDate.length === 1) {
            return;
        }

        if (type === 'range') {
            for (let i = 0; i < selectedDate.length; i++) {
                if (selectedDate[i].toString() === value.toString()) {
                    selectedDate.splice(i + 1, selectedDate.length - i);
                }
            }
        } else {
            for (let i = 0; i < selectedDate.length; i++) {
                if (selectedDate[i].toString() === value.toString()) {
                    selectedDate.splice(i, 1);
                }
            }
        }
    }

    const add = (value) => {
        if (type === 'single')
            selectedDate = [value]
        if (type === 'multiple')
            selectedDate.push(value);
        if (type === 'range') {
            selectedDate = [selectedDate[0]]
            if (value > selectedDate[0]) {
                let pushValue = selectedDate[0].add(1, "day");
                while (value >= pushValue) {
                    selectedDate.push(pushValue);
                    pushValue = pushValue.add(1, "day");
                }
            }

            if (value < selectedDate[0]) {
                let pushValue = selectedDate[0].add(-1, "day");
                while (value <= pushValue) {
                    selectedDate.push(pushValue);
                    pushValue = pushValue.add(-1, "day");
                }
            }
        }
    }

    const handleSelectDate = (value) => {
        return () => {
            if (contains(value))
                remove(value);
            else {
                add(value);
            }
            onChange(selectedDate);
            forceUpdate();
        }
    };

    const check = (value) => {
        for (let i = 0; i < selectedDate.length; i++) {
            if (value.toString() === selectedDate[i].toString()) {
                return true;
            }
        }
        //return value.toString() === selectedDate.toString()
    }

    const rows = getCalendarRows(shownDate);

    return (
        <div>
            <div className={"Calendar__header"}>
                {rows[0].map(({ value }) => (
                    <div className={"Calendar__cell"}>
                        {value.format("dd")}
                    </div>
                ))}
            </div>

            {rows.map((cells, rowIndex) => (
                <div key={rowIndex} className={"Calendar__row"}>
                    {cells.map(({ text, value }) => (
                        <div
                            className={clsx(
                                "Calendar__cell",
                                "Calendar__dayCell",
                                {
                                    Calendar__dayCell_selected:
                                        check(value)
                                }
                            )}
                            onClick={handleSelectDate(value)}>
                            {text}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
