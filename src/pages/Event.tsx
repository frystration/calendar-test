import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const [modalVisible, setModalVisible] = useState(false)
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }

    return (
        <div>
            <EventCalendar events={events}/>
            <Row justify={"center"}>
                <Button
                    onClick={() => setModalVisible(true)}
                >Добавить событие</Button>
            </Row>
            <Modal
                title="Добавить событие"
                open={modalVisible}
                footer={null}
                onOk={() => {
                    setModalVisible(false)
                }}
                onCancel={() => {
                    setModalVisible(false)
                }}
            >
                <EventForm submit={addNewEvent} guests={guests}/>

            </Modal>
        </div>
    );
};

export default Event;