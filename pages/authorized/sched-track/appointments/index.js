import React, { useRef, useState } from 'react';
import TableANTD from '@/components/ANTD/TableANTD';
import { FloatButton, notification } from 'antd';
import { QuestionOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from '@/functions/GeneralFunctions';

import cookie from "react-cookies";
import ModalANTD from '@/components/ANTD/ModalANTD';

export default function index() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [selectedItem, setSelectedItem] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false); 
    const searchInput = useRef(null);

    const timeObject = {
        "0.00": "00:00",
        "0.15": "00:15",
        "0.30": "00:30",
        "0.45": "00:45",
        "1.00": "01:00",
        "1.15": "01:15",
        "1.30": "01:30",
        "1.45": "01:45",
        "2.00": "02:00",
        "2.15": "02:15",
        "2.30": "02:30",
        "2.45": "02:45",
        "3.00": "03:00",
        "3.15": "03:15",
        "3.30": "03:30",
        "3.45": "03:45",
        "4.00": "04:00",
        "4.15": "04:15",
        "4.30": "04:30",
        "4.45": "04:45",
        "5.00": "05:00",
        "5.15": "05:15",
        "5.30": "05:30",
        "5.45": "05:45",
        "6.00": "06:00",
        "6.15": "06:15",
        "6.30": "06:30",
        "6.45": "06:45",
        "7.00": "07:00",
        "7.15": "07:15",
        "7.30": "07:30",
        "7.45": "07:45",
        "8.00": "08:00",
        "8.15": "08:15",
        "8.30": "08:30",
        "8.45": "08:45",
        "9.00": "09:00",
        "9.15": "09:15",
        "9.30": "09:30",
        "9.45": "09:45",
        "10.00": "10:00",
        "10.15": "10:15",
        "10.30": "10:30",
        "10.45": "10:45",
        "11.00": "11:00",
        "11.15": "11:15",
        "11.30": "11:30",
        "11.45": "11:45",
        "12.00": "12:00",
        "12.15": "12:15",
        "12.30": "12:30",
        "12.45": "12:45",
        "13.00": "13:00",
        "13.15": "13:15",
        "13.30": "13:30",
        "13.45": "13:45",
        "14.00": "14:00",
        "14.15": "14:15",
        "14.30": "14:30",
        "14.45": "14:45",
        "15.00": "15:00",
        "15.15": "15:15",
        "15.30": "15:30",
        "15.45": "15:45",
        "16.00": "16:00",
        "16.15": "16:15",
        "16.30": "16:30",
        "16.45": "16:45",
        "17.00": "17:00",
        "17.15": "17:15",
        "17.30": "17:30",
        "17.45": "17:45",
        "18.00": "18:00",
        "18.15": "18:15",
        "18.30": "18:30",
        "18.45": "18:45",
        "19.00": "19:00",
        "19.15": "19:15",
        "19.30": "19:30",
        "19.45": "19:45",
        "20.00": "20:00",
        "20.15": "20:15",
        "20.30": "20:30",
        "20.45": "20:45",
        "21.00": "21:00",
        "21.15": "21:15",
        "21.30": "21:30",
        "21.45": "21:45",
        "22.00": "22:00",
        "22.15": "22:15",
        "22.30": "22:30",
        "22.45": "22:45",
        "23.00": "23:00",
        "23.15": "23:15",
        "23.30": "23:30",
        "23.45": "23:45",
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    
    const handleClick = (item) => {
            setSelectedItem(item);
            setModalVisible(true);
        
    }

    const columns = [
        {
            title: "Full Name",
            dataIndex: "firstName",
            key: "firstName",
            ...getColumnSearchProps("firstName", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
            render: (_, item) => <>{item?.firstName} {item?.lastName}</>,
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
            render: (_, item) => { return (<a className='text-blue-500 hover:text-blue-600 hover:cursor-pointer' href={`mailto:${item?.email}`}>{item?.email}</a>) },
        },
        {
            title: "Appointment Date",
            dataIndex: "appointmentDate",
            key: "appointmentDate",
            ...getColumnSearchProps("appointmentDate", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
        },
        {
            title: "Appointment Time",
            dataIndex: "appointmentTime",
            key: "appointmentTime",
            ...getColumnSearchProps("appointmentTime", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
            render: (_, item) => {
                return (<>{timeObject[parseFloat(item?.appointmentTime).toFixed(2)]} - {timeObject[parseFloat(item?.appointmentEnd).toFixed(2)]}</>)
            },
        },
        {
            title: "Summary",
            dataIndex: "summary.",
            key: "summary.",
            width: "40%",
            render: (_, item) => {
                return (
                    <div onClick={() => handleClick(item)} className='hover:cursor-pointer' style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {item?.summary?.substring(0, 100) + "..."}
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <TableANTD
                columns={columns}
                getUrl={`${process.env.DIGITALOCEAN}/calendy/sched/appointments/`}
                addButton={false}
                addDrawer={false}
            />
            <ModalANTD 
                title="Appointment Summary"
                footer={null}
                isModalOpen={modalVisible}
                handleOk={() => setModalVisible(false)}
                handleCancel={() => setModalVisible(false)}
                renderComponent={selectedItem?.summary}
            />
            <FloatButton
                type="primary"
                icon={<QuestionOutlined />}
                style={{ bottom: 20 }}
                onClick={() => {
                    return (
                        notification.info({
                            message: "Public Profile",
                            description: <div>Share your calendar with others by using this link: <a
                                href={`https://www.swanstrack.com/swans-track/${cookie.load("company", { path: "/" })}/`}
                                className="text-blue-500 hover:text-blue-400 "
                            >{`https://www.swanstrack.com/swans-track/${cookie.load("company", { path: "/" })}/`}</a></div>,
                            key: "api",
                        })
                    )
                }}
            />
        </>
    );
};