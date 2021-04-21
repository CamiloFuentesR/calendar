import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { title, user } = event;
    return (
        <div>
            <strong>{user.name}</strong>
            <span> - {title}</span>
        </div>
    )
}
