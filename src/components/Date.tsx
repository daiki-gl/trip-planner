import React, { useEffect, useState } from 'react'
import { DatePicker, DatePickerProps } from "antd";
import moment from "moment";
import { useTourPlanStore } from '../store';
import { KeyVal } from '../helper';

type DateProps = {
    id: string | undefined
}

const Date = ({id}:DateProps) => {
    const {updatePlan} = useTourPlanStore()
    // const [dateRange, setDateRange] = useState<any>([moment(), moment()]);
    const { RangePicker } = DatePicker;

    const saveDate = (x: moment.LocaleSpecification) => {
        const val = x&& [moment(x[0].$d).format('YYYY/MM/DD'), moment(x[1].$d).format('YYYY/MM/DD')]
        if(id && val) {
            updatePlan(val, 'date' as keyof KeyVal, id)
        }
    }

    return (
    <>
    <label className='font-semibold' htmlFor="date">Trip Date:</label>
    <RangePicker className='w-full' id='date' onChange={x =>  saveDate(x as moment.LocaleSpecification) } />
    </>
    );
}

export default Date