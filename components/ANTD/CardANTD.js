import { Card } from 'antd';
import React from 'react';


export default function CardANTD({ key, title, children }) {
    return (
        <Card
            key={key}
            title={title}
            className='custom-card'
        >
            {children}
        </Card>

    );
};