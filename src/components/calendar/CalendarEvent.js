import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { title } = event;
    return (
        <div style={{textAlign: 'center'}}>
            <strong >{title}</strong>
            
        </div>
    )
}
