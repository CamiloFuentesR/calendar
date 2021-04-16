import React from 'react'

export const DeleteButton = (handleDeleteEvent) => {
    return (
        <button
            type="button"
            className="btn btn-outline-danger col-5"
            onClick={handleDeleteEvent}

        >
            <i className="far fa-trash-alt mr-1"></i>
            <span> Eliminar</span>
        </button>
    )
}
