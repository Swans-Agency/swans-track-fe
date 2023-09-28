import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Rose = dynamic(() => import("@ant-design/plots").then((mod) => mod.Rose), { ssr: false, });


export default function RoseChart({ dataSet, type }) {
    const [data, setData] = useState([]);


    console.log({ dataSet })

    useEffect(() => {
        if (dataSet) {
            setData(dataSet)
        }

    }, [dataSet])

    const config = {
        data,
        xField: type,
        yField: 'sum',
        seriesField: type,
        radius: 0.9,
        legend: {
            position: 'bottom',
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

  return (
    <>
      <Rose {...config} />
    </>

  );
};