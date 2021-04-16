import React, { useState } from 'react'
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
import { uiCloseModal } from '../../actions/uiActions';


moment.locale("es");
  
//recomendado colocarlo en un componente aparte e importarlo
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: '40%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); //
const endDate = now.clone().add(1, 'hours') //

export const CalendarModal = () => {

    const {modalOpen} = useSelector(state => state.root.ui)
    const dispatch = useDispatch();
    console.log(modalOpen);
    const [locale] = useState("es");
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [validTitle, setValidTitle] = useState(true)

    const [formValues, setFormValues] = useState({
        title:'Evento',
        start:now.toDate(),
        end:endDate.toDate(),
        notes: '',
    });

    const {notes,title,start,end} = formValues;

    const handleInputChange = ({target}) => {

        setFormValues({
            ...formValues,
            [target.name] : target.value
        });
    }

    const closeModal = () => {
        if(modalOpen){ //para que no se repita dos veces el dispatch
            dispatch(uiCloseModal());
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

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start)
        const momentEnd = moment(end)

      
        if(momentStart.isSameOrAfter(momentEnd)){
            Swal.fire('Error','La Fecha final debe ser mayor a la fecha de inicio','error')
            return;
        }

        if(title.trim().length < 2){
            return setValidTitle(false)
        }

        //toDo Realizar grabacion en bdd

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
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    {/* <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className='form-control'
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select AM/PM"
                        minuteAriaLabel="Minute"
                    /> */}
                     <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}> 
                     {/*    <DatePicker 
                            value={selectedDate} 
                            onChange={handleDateChange} 
                            className="form-control"
                        />
                        <TimePicker 
                            value={selectedDate} 
                            onChange={handleDateChange} 
                            className="form-control"
                        /> */}
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
                    {/* <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className='form-control'
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select AM/PM"
                    /> */}
                     <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}> 
                   {/*      <DatePicker value={selectedDate} onChange={handleDateChange} />
                        <TimePicker value={selectedDate} onChange={handleDateChange} /> */}
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
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <div className="row justify-content-between ml-1 mr-1">
                <button
                    type="submit"
                    className="btn btn-outline-primary col-5 p-2"
                >
                    <i className="far fa-save mr-2"></i>
                    <span> Guardar</span>
                </button>
                <button
                    type="submit"
                    className="btn btn-outline-danger  col-5"
                >
                    <i className="far fa-trash-alt mr-2"></i>
                    <span> Eliminar</span>
                </button>
                </div>


            </form>
        </Modal>
    )
}
