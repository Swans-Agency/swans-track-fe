import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Line = dynamic(() => import("@ant-design/plots").then((mod) => mod.Line), {   ssr: false, });

export default function ChartANtd({ expenseAlltime, incomeAlltime }) {
    const [data, setData] = useState([]);

    const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Nov",
        "Dec",
    ]

    useEffect(() => {
        if (expenseAlltime && incomeAlltime) {
            let newData = []
            expenseAlltime?.map((item) => {
                const monthName = labels[item?.date__month - 1]
                newData.push({ name: "Expense", month: monthName, sum: item?.sum })
            })
            incomeAlltime?.map((item) => {
                const monthName = labels[item?.date__month - 1]
                newData.push({ name: "Income", month: monthName, sum: item?.sum })
            })
            setData(newData)
        }

    }, [expenseAlltime, incomeAlltime])

    const config = {
        data,
        xField: 'month',
        yField: 'sum',
        seriesField: 'name',
        yAxis: {
            label: {
                formatter: (v) => `${(v / 1000).toFixed(2)} K`,
            },
        },
        legend: {
            position: 'bottom',
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };

    return (
        <>
            <Line {...config} />
        </>
    );

};