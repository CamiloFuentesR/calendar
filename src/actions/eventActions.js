import Swal from "sweetalert2";
import { clienteAxiosToken } from "../config/axios";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";
import { fetchConToken } from '../helpers/fetch';
import { token } from '../config/axios'
import { startLogout } from "./authActions";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().root.auth;
        try {
            await clienteAxiosToken.post('/events', event, {
                headers: {
                    'x-token': token()
                }
            })
                .then(({ data }) => {
                    event.id = data.event.id;
                    event.user = {
                        _id: uid,
                        name
                    }
                    dispatch(eventAddNew(event))
                })
                .catch(({ response }) => {
                    if (response.data.msg === 'Token no válido') {
                        dispatch(startLogout())
                        Swal.fire('Error', 'El tiempo de sesión ha expirado', 'error');
                    }
                    console.log(response)
                });
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error, 'error');
        }
    }
}

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const { data } = await clienteAxiosToken.put(`/events/${event.id}`, event, {
                headers: {
                    'x-token': token()
                }
            })
            if (data.ok) {
                dispatch(eventUpdated(event))
            }
            else {
                Swal.fire('Error', data.msg, 'error')
            }
        } catch (error) {
            console.log(error)
            if (error.response.data.msg === 'Token no válido') {
                Swal.fire('Error', 'El tiempo de sesión ha expirado', 'error')
                dispatch(startLogout());
            }
        }
    }
}

export const eventStartDelete = (id) => {
    return async (dispatch) => {
        
        try {
            
            clienteAxiosToken.delete(`/events/${id}`,{
                headers: {
                    'x-token': token()
                }
            })
            dispatch(eventDeleted())
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            
            const events = prepareEvents(body.events);
            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error.response)
        }
    }
}
export const eventLogout = () => ({
    type: types.eventLogout
})
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const cleanActiveNote = () => ({
    type: types.cleanActiveNote,

});

const eventDeleted = () => ({
   type: types.eventDeleted
});

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})
const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});