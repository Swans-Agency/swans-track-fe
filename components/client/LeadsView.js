import React, { useRef, useState } from "react";
import TableANTD from "../ANTD/TableANTD";
import { EditOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "@/functions/GeneralFunctions";
import LeadForm from "./LeadForm";
import UpdateLead from "./UpdateLead";
import NextCrypto from "next-crypto";


export default function LeadsView() {
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [updateClient, setUpdateClient] = useState();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const handleCreateLink = async(item) => {
        const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
        const companyIdEncrypt = await crypto.encrypt(item?.companyObj?.id);
        const companyId = encodeURIComponent(companyIdEncrypt);
        const itemIdEncrypt = await crypto.encrypt(item?.id);
        const itemId = encodeURIComponent(itemIdEncrypt);
        window.open(`https://www.swanstrack.com/lead-form/${item?.companyObj?.companyName}/${companyId}/${itemId}`, "_blank")
    }

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps("title", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
        },
        {
            title: "Referral Source",
            dataIndex: "referralSource",
            key: "referralSource",
            ...getColumnSearchProps("referralSource", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
        },
        {
            title: "Sharaeble Link",
            dataIndex: "shareableLink",
            key: "shareableLink",
            render: (_, item) => <a className="text-blue-500 " onClick={()=>handleCreateLink(item)} >Go to form</a>
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
            ...getColumnSearchProps("active", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
        },
        {
            title: <div className="text-center">Edit</div>,
            dataIndex: "edit",
            key: "edit",
            render: (_, item) => (
                <div className="text-center">
                    <EditOutlined
                        key="edit"
                        style={{ color: "#3b82f6" }}
                        onClick={() => showModalUpdate(item)}
                    />
                </div>
            ),
        },
    ];

    const showModalUpdate = (item) => {
        setTimeout(() => setUpdateClient(item), 100);
        setIsModalOpenUpdate(true);
        ;
    };

    const handleOk = () => {
        setIsModalOpenUpdate(false);
        setUpdateClient(null)
    };
    const handleCancel = () => {
        setIsModalOpenUpdate(false);
        setUpdateClient(null)
    };

    return (
        <TableANTD
            columns={columns}
            getUrl={`${process.env.DIGITALOCEAN}/client/get-paginated-leads/`}
            multiDeleteUrl={`${process.env.DIGITALOCEAN}/client/multi-delete-leads/`}
            addButton={true}
            buttonTitle="Add Lead Form"
            addDrawer={true}
            drawerTitle="Add New Lead Form"
            drawerContent={(setReload, onClose) => <LeadForm setReload={setReload} onClose={onClose} />}
            updateModal={true}
            updateTitle="Update Lead Form"
            updateFooter={null}
            handleOkUpdate={handleOk}
            handleCancelUpdate={handleCancel}
            isModalOpenUpdate={isModalOpenUpdate}
            passedItem={updateClient}
            modalContent={(setReload) => <UpdateLead updateClient={updateClient} handleOk={handleOk} setUpdateClient={setUpdateClient} setReload={setReload} />}
        />
    );
}
