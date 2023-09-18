import React, { useEffect, useRef, useState } from "react";
import TableANTD from "../ANTD/TableANTD";
import { Button, Input, Modal, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ExpandIcon from "./ExpandIcon";
import { patchAxios } from "@/functions/ApiCalls";
import ProjectForm from "./ProjectForm";
import { useRouter } from "next/router";
import cookie, { remove } from "react-cookies";
import { jobStatus, jobcategories } from "@/functions/GeneralFunctions";

export default function ProjectsView() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [showDetails, setShowDetails] = useState({});
    const [additionalGet, setAdditionalGet] = useState(false);
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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                        style={{
                            width: 90,
                            paddingBottom: 20,
                        }}
                    >
                        <div className="flex gap-x-2 items-center justify-center">
                            <SearchOutlined /> Search
                        </div>
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        className="bg-blue-500 hover:bg-blue-600"
                        type="primary"
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

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
            ...getColumnSearchProps("projectName"),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            ...getColumnSearchProps("category"),
            render: (_, item) => {
                return (<div className="h-full w-full">
                    <Select
                        size="small"
                        defaultValue={item?.category}
                        style={{ width: "100%" }}
                        bordered={false}
                        className={`${colorScehma[item?.category]} text-white `}
                        onChange={(value) => handleEditStatus(item, value, "category")}
                        options={jobcategories}
                    />
                </div>)
            }
        },
        {
            title: "Summary",
            dataIndex: "summary",
            key: "summary",
            ...getColumnSearchProps("summary"),
            render: (_, item) => (
                <div className="hover:border-b" title="Edit the summary by clicking on the text ans start typing">
                    <Input
                        defaultValue={item?.summary}
                        bordered={false}
                        onChange={(e) => { handleEditSummary(item, e.target.value) }}
                    />
                </div>
            )
        },
        {
            title: "Client",
            dataIndex: "client",
            key: "client",
            ...getColumnSearchProps("client"),
            render: (_, item) => (
                <>
                    {item?.client?.firstName} {item?.client?.lastName}
                </>
            ),
        },
        {
            title: "Start Date",
            dataIndex: "createdAt",
            key: "createdAt",
            ...getColumnSearchProps("createdAt"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status"),
            render: (_, item) => {
                return (<div className="h-full w-full">
                    <Select
                        size="small"
                        defaultValue={item?.status}
                        style={{ width: "100%", }}
                        bordered={false}
                        className={` text-white `}
                        onChange={(value) => handleEditStatus(item, value, "status")}
                        options={jobStatus}
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
        <div>
            {/* <h1 className="text-3xl font-light tracking-tight text-black mb-3">Projects</h1> */}
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
            // customClass="custom-cell"
            />
        </div>
    );
}
