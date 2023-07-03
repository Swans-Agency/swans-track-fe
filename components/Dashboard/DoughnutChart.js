import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Legend, Title, Tooltip } from 'chart.js'
Chart.register(ArcElement, Legend, Title, Tooltip);
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart({ expensesCategory }) {

    const data = {
        labels: expensesCategory?.map((category) => {return (category?.category) ? (category?.category) : (category?.paymentMethod)}),
        datasets: [{
            label: '',
            data: expensesCategory?.map((category) => category?.sum),
            backgroundColor: ['#e6194b99', '#3cb44b99', '#ffe11999', '#4363d899', '#f5823199', '#911eb499', '#42d4f499', '#f032e699', '#bfef4599', '#fabed499', '#46999099', '#dcbe2299', '#9A632499', '#fffac899', '#80000099', '#aaffc399', '#80800099', '#ffd8b199', '#00007599', '#a9a9a999', '#ffffff99', '#00000099', '#00808099', '#00008099', '#80008099', '#80808099', '#ADFF2F99', '#F0FFF099', '#FF450099', '#00FFFF99', '#00008B99', '#FFD70099', '#FF149399', '#32CD3299'],
            hoverOffset: 10
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            radius: '100%',
            cutout: '50%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                title: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
            tooltip: {
                enabled: true,
            },
            layout: {
                padding: {
                    bottom: 20, // Add bottom padding for the legend
                },
            },
        },
    };

    return (
        <>
            <Doughnut
                data={data}
                options={config.options} 
            />
        </>
    )
};
