import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {formDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Dayjs} from "dayjs";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: "",
        description: "",
        guest: ''
    } as IEvent)
    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Dayjs | any) => {
        if (date) {
            setEvent({...event, date: formDate(date?.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form
            onFinish={submitForm}
        >
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required(), rules.isDateAfter()]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Выберите гостя"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    onChange={(guest: string) => setEvent({...event, guest})}
                    options={props.guests.map(guest => {
                            return {value: guest.username, label: guest.username}
                        }
                    )}
                />
            </Form.Item>
            <Form.Item>
                <Row justify="end">
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default EventForm;