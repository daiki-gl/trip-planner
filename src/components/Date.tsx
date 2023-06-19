import React, { useEffect, useState } from 'react'
import { DatePicker } from "antd";
import moment from "moment";
import { useTourPlanStore } from '../store';

type DateProps = {
    id: string | undefined
}

const Date = ({id}:DateProps) => {
    const {updatePlan} = useTourPlanStore()
    // const [dateRange, setDateRange] = useState<any>([moment(), moment()]);
    const { RangePicker } = DatePicker;

    const saveDate = (x:any) => {
        const val = x&& [moment(x[0].$d).format('YYYY/MM/DD'), moment(x[1].$d).format('YYYY/MM/DD')]
        if(id && val) {
            updatePlan(val, 'date', id)
        }
    }

    return (
    <>
    <label className='font-semibold' htmlFor="date">Trip Date:</label>
    <RangePicker className='w-full' id='date' onChange={x =>  saveDate(x) } />
    </>
    );
}

export default Date