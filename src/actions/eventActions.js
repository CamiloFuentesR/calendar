import Swal from "sweetalert2";
import { clienteAxiosToken } from "../config/axios";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().root.auth;
        try {
            await clienteAxiosToken.post('/events', event)
                .then(({ data }) => {
                    event.id = data.event.id;
                    event.user = {
                        _id: uid,
                        name
                    }
                    console.log(event)
                    dispatch(eventAddNew(event))

                })
                .catch(({ response }) => console.log(response));

        } catch (error) {
            console.log(error);
            Swal.fire('Error', error, 'error');
        }



    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const cleanActiveNote = () => ({
    type: types.cleanActiveNote,

});

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = (id) => ({
    type: types.eventDeleted,
    payload: id
});

export const eventStartLoading = () => {
    return async (dispatch) => {

        try {
            /* await clienteAxiosToken.get('/events')
                .then(({data})=> {
                        const event =  dispatch(prepareEvents(data.events));
                      dispatch(eventLoaded(event));
                })
                .catch(e=>{
                    console.log(e)
                }) */

            const { data } = await clienteAxiosToken.get('events');
            const events = prepareEvents(data.events);
            dispatch(eventLoaded(events));



            /*      const resp = await fetchConToken( 'events' );
                 const body = await resp.json();
     
                 const events = prepareEvents( body.events );
                 dispatch( eventLoaded( events ) ); */
        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})