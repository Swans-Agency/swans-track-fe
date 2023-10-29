import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Column = dynamic(() => import("@ant-design/plots").then((mod) => mod.Column), { ssr: false, });

export default function ColumnChart({ clientsCategory }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (clientsCategory) {
            setData(clientsCategory)
        }
    }, [clientsCategory])

    const config = {
        data,
        xField: 'referralSource',
        yField: 'count',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            referralSource: {
                alias: 'Referral Source',
            },
            count: {
                alias: 'Count',
            },
        },
    };
    return <Column {...config} />;
};
