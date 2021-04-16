import React, { useState } from 'react';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/uiActions';
import { eventSetActive } from '../../actions/eventActions';
import { AddNewFab } from '../ui/AddNewFab';
moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
    title:'Cumpleaños ',
    start: moment().toDate(),
    end:moment().add(2,'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user:{
        _id: '123',
        name: 'Camilo'
    }
    
}]

export const CalendarScreen = (e) => {

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView',e) || 'month')

    const onDoubleClick = (e) => {
        // console.log(e);
        dispatch(uiOpenModal()); 

    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
        dispatch(uiOpenModal());
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    }

    const eventStyleGetter = (event,start,end,isSelected) => {
        const style = {
            backgroundColor:'#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <NavBar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAcessor='end'
                messages={messages}
                eventPropGetter= {eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab/>
            <CalendarModal/>
        </div>
    )
}
