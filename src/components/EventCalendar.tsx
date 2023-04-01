import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {formDate} from "../utils/date";
import {Dayjs} from "dayjs";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    const dateCellRender = (value: Dayjs) => {
        const formatedDate = formDate(value.toDate());
        const currentDayEvents = props.events.filter(event => event.date === formatedDate)

        return (
            <div>
                {currentDayEvents.map((event, index) =>
                    <div key={index}>{event.description}</div>
                )}
            </div>
        );
    };

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    )
};

export default EventCalendar;