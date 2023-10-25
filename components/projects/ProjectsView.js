import React, { useEffect, useRef, useState } from "react";
import TableANTD from "../ANTD/TableANTD";
import { Input, Select } from "antd";
import ExpandIcon from "./ExpandIcon";
import { patchAxios } from "@/functions/ApiCalls";
import ProjectForm from "./ProjectForm";
import { useRouter } from "next/router";
import { remove } from "react-cookies";
import { jobCat, jobStatus, jobStatusNotColored, jobcategories } from "@/functions/GeneralFunctions";
import { getColumnSearchProps } from "@/functions/GeneralFunctions";
import ModalANTD from "../ANTD/ModalANTD";


export default function ProjectsView() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [additionalGet, setAdditionalGet] = useState(false);
    const [summaryModal, setSummaryModal] = useState({ summary: "", visible: false });
    const [colorScehma, setColorScehma] = useState({
        "Pre Seed": "bg-yellow-300",
        "In Progress": "bg-orange-300",
        "Invoiced": "bg-blue-300",
        "Partially Paid": "bg-purple-300",
        "Closed": "bg-green-300",
        "Canceled": "bg-red-300",
    });
    const searchInput = useRef(null);
    const router = useRouter();

    useEffect(() => {
        remove("project", { path: "/" });
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleClick = (item) => {
        setSummaryModal({ summary: item?.summary, visible: true })
    }

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const handleEditStatus = async (item, value, type) => {
        console.log("item", item);
        console.log("value", value);
        item[type] = value;
        console.log("item", item);

        const url = `${process.env.DIGITALOCEAN}/project/patch-project/${item?.id}/`;
        await patchAxios(url, item, false, false, () => { })
        setAdditionalGet(!additionalGet)
    }

    const handleEditSummary = async (item, value) => {
        console.log("item", item);
        console.log("value", value);
        item["summary"] = value;
        setTimeout(async () => {
            const url = `${process.env.DIGITALOCEAN}/project/patch-project/${item?.id}/`;
            await patchAxios(url, item, false, false, () => { })
            console.log("item", item);
        }, 2000)
    }



    const showModalDetails = (item) => {
        localStorage.setItem('project', JSON.stringify(item))
        console.log({ item })
        router.push(`/authorized/projects/details/${item.id}`)
    }



    const columns = [
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
            ...getColumnSearchProps("projectName", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            ...getColumnSearchProps("category", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
        },
        {
            title: "Summary",
            dataIndex: "summary",
            key: "summary",
            width: "20%",
            ...getColumnSearchProps("summary", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
            render: (_, item) => {
                return (
                    <div
                        onClick={() => handleClick(item)} className='hover:cursor-pointer'
                        dangerouslySetInnerHTML={{ __html: item?.summary?.substring(0, 25) + "..." }}
                    />
                )
            }
        },
        {
            title: "Client",
            dataIndex: "client",
            key: "client",
            ...getColumnSearchProps("client", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
            render: (_, item) => (
                <>
                    {item?.clientObj?.firstName} {item?.clientObj?.lastName}
                </>
            ),
        },
        {
            title: "Start Date",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
            render: (_, item) => {
                return (<div className="h-full w-full">
                    <Select
                        size="small"
                        defaultValue={item?.status}
                        style={{ width: "100%", backgroundColor: colorScehma[item?.status] }}
                        bordered={false}
                        className={` text-white `}
                        onChange={(value) => handleEditStatus(item, value, "status")}
                        options={jobStatusNotColored}
                    />
                </div>)
            }
        },
        {
            title: <div className="text-center">Details</div>,
            dataIndex: "edit",
            key: "edit",
            render: (_, item) => (
                <div className="w-full flex justify-center items-center hover:cursor-pointer hover:text-blue-500 text-blue-600" onClick={() => showModalDetails(item)}>
                    <ExpandIcon
                        key="edit"
                        style={{ color: "#3b82f6" }}
                    />
                </div>
            ),
        },
    ];




    return (
        <>
            <TableANTD
                columns={columns}
                getUrl={`${process.env.DIGITALOCEAN}/project/get-projects/`}
                multiDeleteUrl={`${process.env.DIGITALOCEAN}/project/delete-project/`}
                addButton={true}
                buttonTitle="Add Project"
                addDrawer={true}
                drawerTitle="Add New Project"
                drawerContent={(setReload, onClose) => <ProjectForm setReload={setReload} onClose={onClose} />}
                updateModal={false}
                updateFooter={null}
                handleOkUpdate={() => { }}
                handleCancelUpdate={() => { }}
                isModalOpenUpdate={false}
                passedItem={{}}
                modalContent={() => { }}
                additionalGet={additionalGet}
            />

            <ModalANTD
                title="Project Summary"
                footer={false}
                isModalOpen={summaryModal?.visible}
                handleOk={() => setSummaryModal({ summary: "", visible: false })}
                handleCancel={() => setSummaryModal({ summary: "", visible: false })}
                renderComponent={
                    <div
                        // className="border rounded-lg p-2 hover:cursor-pointer hover:border-blue-400"
                        dangerouslySetInnerHTML={{ __html: summaryModal?.summary }}
                    />
                    }
            />
        </>
    );
}
