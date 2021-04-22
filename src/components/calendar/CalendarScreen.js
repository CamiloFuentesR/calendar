import React, { useEffect, useState } from 'react';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch,useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/uiActions';
import { eventSetActive, eventStartLoading } from '../../actions/eventActions';
import { AddNewFab } from '../ui/AddNewFab';

import { SuccessMessage } from '../ui/SuccessMessage';

import './style.css'
import Cargando from '../ui/Cargando';

moment.locale('es');

const localizer = momentLocalizer(moment);

/* const events = [{
    title:'Cumpleaños ',
    start: moment().toDate(),
    end:moment().add(2,'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user:{
        _id: '123',
        name: 'Camilo'
    }
    
}] */

export const CalendarScreen = (e) => {
    const dispatch = useDispatch();
    const {uid} = useSelector(state => state.root.auth)
    //leer eventos desde el store
    const {events} = useSelector(state => state.root.calendar)

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView',e) || 'month')
    // const {loading} = useSelector(state => state.root.ui)
    const {checking} = useSelector(state => state.root.auth);


  /*   const onDoubleClick = (e) => {
        // console.log(e);
        dispatch(uiOpenModal()); 

    }
 */
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
        dispatch(uiOpenModal());
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    }

    const eventStyleGetter = (event,start,end,isSelected) => {
        /* console.log(uid)
        console.log(event.user._id) */
            if (event.user._id){

                const style = {
                backgroundColor: (uid === event.user._id) ?  '#367CF7': '#DEA20E' ,
                borderRadius: '5px',
                opacity: 0.8,
                display: 'block',
                color: 'white'
            }
            return {
                style
            }
            }  

    };

    return (
        <>
        {
            checking && <Cargando/>
        }
        <div className="calendar-screen">
            <NavBar/>

            <Calendar
                // className="animate__animated animate__fadeIn"
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAcessor='end'
                messages={messages}
                eventPropGetter= {eventStyleGetter}
                // onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab/>
            <CalendarModal/>
           <SuccessMessage/>
        </div>
        </>
    )
}
