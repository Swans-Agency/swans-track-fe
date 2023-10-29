import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Area = dynamic(() => import("@ant-design/plots").then((mod) => mod.Area), { ssr: false, });

export default function ProjectsChart({ projectsAlltime }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (projectsAlltime && projectsAlltime.monthly_counts) {

            setData(projectsAlltime?.monthly_counts);
        }
    }, [projectsAlltime]);

    const config = {
        data,
        xField: 'month',
        yField: 'count',
        xAxis: {
            range: [0, 1],
            tickCount: 12,
        },
        smooth: true,
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            };
        },
    };

    return <Area {...config} />;
};