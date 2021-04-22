import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal, uiOpenSuccesM } from '../../actions/uiActions';
import { cleanActiveNote, eventStartAddNew, eventDeleted, eventStartUpdate } from '../../actions/eventActions';

moment.locale("es-ES");

//recomendado colocarlo en un componente aparte e importarlo
const customStyles = {
    content: {
        position: 'fixed',
        top: '50%',
        left: '49%',
        right: 'auto',
        bottom: '20%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); //
const endDate = now.clone().add(1, 'hours') //

const initEvent = {
    title: '',
    start: now.toDate(),
    end: endDate.toDate(),
    notes: '',
}

export const CalendarModal = () => {

    const [locale] = useState("es");

    const { modalOpen } = useSelector(state => state.root.ui)
    const { activeEvent } = useSelector(state => state.root.calendar)
    const { uid } = useSelector(state => state.root.auth)
    const dispatch = useDispatch();
    const [validateUser, setvalidateUser] = useState(false)

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [disabledButton, setDisabledButton] = useState(true)
    const [validTitle, setValidTitle] = useState(true)
    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setDateStart(activeEvent.start);
            setDateEnd(activeEvent.end)
            setFormValues(activeEvent)
            setDisabledButton(false)
            if (activeEvent.user._id === uid) {
                setvalidateUser(true)
            }
        } else {
            setFormValues(initEvent)
            setDateStart(now.toDate());
            setDateEnd(endDate.toDate())
            setDisabledButton(true)
        }
    }, [activeEvent, uid])
    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        if (modalOpen) { //para que no se repita dos veces el dispatch
            dispatch(uiCloseModal());
            dispatch(cleanActiveNote());
            setFormValues(initEvent);
            setValidTitle(true)
        }
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e.toDate()
        });
    }
    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e.toDate()
        });
    }

    const handleDeleteEvent = () => {

        Swal.fire({
            title: '¿Estas seguro que deseas eliminar este evento?',
            text: "¡Esta acción es irreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar este evento!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eventDeleted(activeEvent.id));
                setFormValues(initEvent);
                dispatch(uiCloseModal());

                Swal.fire(
                    'Eliminado!',
                    'Este Evento ha sido eliminado  ',
                    'success'
                )
            }
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La Fecha final debe ser mayor a la fecha de inicio', 'error')
            return;
        }
        if (title.trim().length < 2) {
            return setValidTitle(false)
        }
        //toDo Realizar grabacion en bdd
        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {
            dispatch(eventStartAddNew(formValues));
        }
        dispatch(uiOpenSuccesM());
        setValidTitle(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={sa}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal '
            overlayClassName='modal-fondo'
        >

            {
                (activeEvent && validateUser)
                && <h1 className="text-center"> {activeEvent ? 'Editar Evento' : 'Nuevo Evento'} </h1>
            }
            {
                (activeEvent && !validateUser) && <h1 className="text-center"> {`Evento de ${activeEvent.user.name}`}</h1>
            }
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
                        <DateTimePicker
                            autoOk
                            _locale={"es"}
                            value={dateStart}
                            onChange={handleStartDateChange}
                            className="form-control in"
                            format="y-MM-DD - ddd - h:mm:ss a"
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
                        <DateTimePicker
                            autoOk
                            value={dateEnd}
                            onChange={handleEndDateChange}
                            className="form-control"
                            minDate={dateStart}
                            format="y-MM-DD - ddd - h:mm:ss a"
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!validTitle && 'is-invalid '}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>
                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="3"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <div className="row justify-content-between ml-1 mr-1">
                    {
                        validateUser &&
                        <>
                            <button
                                type="submit"
                                className="btn btn-outline-primary  col-5 p-2"
                            >
                                <i className="far fa-save mr-1"></i>
                                <span> Guardar</span>
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger col-5"
                                onClick={handleDeleteEvent}
                                disabled={disabledButton}
                            >
                                <i className="far fa-trash-alt mr-1"></i>
                                <span> Eliminar</span>
                            </button>
                        </>
                    }
                </div>
            </form>
            {
                !validateUser &&
                <div className="row justify-content-center">
                    <button
                        type="button"
                        className="btn btn-outline-danger col-10  "
                        onClick={closeModal}
                    >
                        <span>X Cerrar Evento</span>
                    </button>
                </div>
            }
        </Modal>
    )
}
