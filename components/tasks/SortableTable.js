import { DeleteColumnOutlined, DeleteOutlined, DeleteRowOutlined, DragOutlined, MenuOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import { Form, Select, Table } from 'antd';
import { deleteAxios, postAxios } from '@/functions/ApiCalls';
import ModalANTD from '../ANTD/ModalANTD';
import FormButtons from '../ANTD/FormButtons';

const Row = ({ children, ...props }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        ),
        transition,
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if (child.key === 'sort') {
                    return React.cloneElement(child, {
                        children: (
                            <DragOutlined
                                ref={setActivatorNodeRef}
                                style={{
                                    touchAction: 'none',
                                    cursor: 'move',
                                }}
                                {...listeners}
                            />
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
};


export default function SortableTable({ columnsData, handleNotifyTeam, setShowTable, statuses }) {
    const [dataSource, setDataSource] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [moveToColumn, setMoveToColumn] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null)

    const columns = [
        {
            key: 'sort',
            title: <div className='w-full text-center'>#</div>,
            width: 50,
        },
        {
            title: 'Column Name',
            dataIndex: 'columnName',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_,item) => {return (
                <div
                    onClick={() => { setShowModal(true); setSelectedColumn(item);console.log({ item }) }}
                >
                    <DeleteRowOutlined className='text-red-700 hover:cursor-pointer'/>
                </div>
            )}
        }
    ];

    useEffect(() => {
        console.log({ dataSource })
        console.log({ statuses })
        let modifiedData = columnsData?.map((item, index) => {
            return (
                {
                    key: item?.index,
                    columnName: item?.columnName,
                    id: item?.id
                }
            )
        })
        setDataSource(modifiedData)
    }, [columnsData]);

    useEffect(() => {
        console.log({ selectedColumn })
    }, [selectedColumn]);

    const onFinish = async (values) => {
        // setIsLoading(true)
        let url = `${process.env.DIGITALOCEAN}/tasks/sort-columns/`
        await postAxios(url, values, false, false, () => { }, false)
        handleNotifyTeam()
        // getColumns()
        // columnForm.resetFields()

        // setIsLoading(false)
        // router.reload()
    }

    const handleDeleteColumn = async () => {
        setIsLoading(true)
        let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/${selectedColumn?.id}/?moveTo=${moveToColumn}`
        await deleteAxios(url, true, true, () => { }, false)
        setIsLoading(false)
        // router.reload()
    }

    const onDragEnd = ({ active, over }) => {
        console.log({ active, over })
        if (active.id !== over?.id) {
            setDataSource((previous) => {
                const activeIndex = previous.findIndex((i) => i.key === active.id);
                const overIndex = previous.findIndex((i) => i.key === over?.id);
                let newArr = arrayMove(previous, activeIndex, overIndex);
                console.log({ newArr })
                let modifiedIndex = newArr?.map((item, index) => {
                    return (
                        {
                            "columnName": item?.columnName,
                            "index": index
                        }
                    )
                })
                console.log({ modifiedIndex })
                onFinish({ "columns": modifiedIndex })
                return newArr;
            });

        }
    };



    return (
        <>
            <div className="flex justify-end mb-3 gap-x-3">
                <button
                    onClick={() => setShowTable(false)}
                    className="min-w-fit flex justify-center items-center gap-x-2 bg-mainBackground dark:bg-[#282828] hover:shadow-lg hover:dark:shadow-sm hover:dark:shadow-[#1d1d1d] text-white rounded-lg py-[0.6rem] px-3"
                >
                    Add column
                </button>
            </div>
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    // rowKey array
                    items={dataSource?.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: Row,
                            },
                        }}
                        rowKey="key"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </SortableContext>
            </DndContext>
            <p className='text-white text-xs mt-2'>You may need to reload the page in order for the changes to take place.</p>

            {statuses && <ModalANTD
                title={"Move task to another column"}
                footer={null}
                isModalOpen={showModal}
                handleOk={() => setShowModal(false)}
                handleCancel={() => setShowModal(false)}
                renderComponent={
                    <>
                        <Form
                            layout="vertical"
                            // className="border rounded-lg border-[#282828] mb-3 p-3"
                            onFinish={handleDeleteColumn}
                        >
                            <Form.Item label="Task status" name="taskStatus">
                                <Select
                                    size="large"
                                    options={statuses?.filter((item) => item?.value !== selectedColumn?.columnName)}
                                    placeholder="Select task status"
                                    className="w-full"
                                    onChange={(value) => setMoveToColumn(value)}
                                />
                            </Form.Item>
                            <div className='flex justify-end'>

                                <FormButtons
                                    content="Confirm"
                                    isLoading={isLoading}
                                />
                            </div>
                        </Form>
                    </>
                }
                customWidth={true}
            />}
        </>
    );
};
