import { Datepicker } from "flowbite-react";
import { es } from 'date-fns/locale'

export default function DatePickerCalendar() {
    const today = new Date();

    return (
        <div className="relative">
            <Datepicker
                language="es"
                labelTodayButton="Hoy"
                labelClearButton="Limpiar"
                maxDate={today}
                dateFormat="dd/MM/yyyy"
                locale={es}
            />  
        </div>
    );
}