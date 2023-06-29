import { Tag } from 'antd';
import React from 'react';


export default function TagANTD({bordered, color, text}) {
    return (
        <Tag bordered={bordered} color={color}>
            {text}
        </Tag>
    );
};