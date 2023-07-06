import { Drawer } from 'antd';
import React from 'react';


export default function DrawerANTD({ title, children, onClose, open }) {
    return (
        <Drawer width="600" placement="right" title={title} onClose={onClose} open={open}>
            {children}
        </Drawer>
    );
};