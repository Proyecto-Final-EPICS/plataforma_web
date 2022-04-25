import {DatePicker} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;

export default function PeriodPicker(props) {
    const {name, options, def, update} = props;
    
    const getDefValues = () => {
        return [
            moment(def.from, 'DD-MM-YYYY'),
            moment(def.to, 'DD-MM-YYYY'),
        ];
    }

    const onDatePicked = (date, dateString) => {
        update('period', {
            from: date ? date[0]._d.toLocaleDateString().replaceAll('/', '-') : undefined,
            to: date ? date && date[1]._d.toLocaleDateString().replaceAll('/', '-') : undefined,
        });
    }

    return(
        <RangePicker
            className="period-pricker"
            placeholder={["Desde", "Hasta"]}
            onChange={onDatePicked}
            defaultValue={getDefValues()}
        />
    );
}
