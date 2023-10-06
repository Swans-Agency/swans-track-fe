import DrawerANTD from '@/components/ANTD/DrawerANTD';
import Invoice from '@/components/Navbar/Icons/Invoice';
import AddIcon from '@/pages/authorized/projects/details/icons/AddIcon';
import { Select } from 'antd';
import React, { useState } from 'react';
import LinkInvoiceForm from './LinkInvoiceForm';
import { getAxios, patchAxios } from '@/functions/ApiCalls';
import { SearchOutlined, CloudDownloadOutlined } from "@ant-design/icons";


export default function ProjectInvoices({ projectInvoices, getProjectInvoices, projectId, projectCurrency, getProjectDetails, add=true }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bgColor, setBgColor] = useState({
        "Pending": "bg-orange-50",
        "Paid": "bg-green-50",
    });
    const [invoiceStatus, setInvoiceStatus] = useState(["Paid"])

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handlePatchInvoice = async (item, value) => {
        console.log({ item, value })
        const url = `${process.env.DIGITALOCEAN}/project/invoice-project/${item?.id}/`;
        await patchAxios(url, { "status": value, "job": projectId }, true, true);
        getProjectInvoices()
        getProjectDetails()
    }

    return (
        <div className='border rounded-lg h-fit max-h-[380px] mt-4 px-4 py-2'>
            <div className='flex justify-between items-center bg-white !z-10 mb-3'>
                <p className='font-semibold text-md '>Invoices</p>
                {add && <div onClick={() => setIsModalOpen(true)}><AddIcon /></div>}
            </div>
            <div className='max-h-[290px] hover:overflow-y-auto overflow-hidden '>
                {projectInvoices?.map((item, index) => {
                    return (
                        <div className={`grid grid-cols-4 items-center border rounded py-3 px-2 mb-2 ${bgColor[item?.status]} `}>
                            <div className='flex items-center justify-start gap-1'>
                                <Invoice />
                                <p className='laptop:text-sm phone:text-xs font-extralight'>{item?.invoice?.invoiceNo}</p>
                            </div>
                            <div className='w-fit justify-self-center'>
                                <p className='text-xs font-bold text-center'>Total</p>
                                <p className='laptop:text-sm phone:text-xs font-extralight text-center'>{projectCurrency} {item?.invoice?.invoiceTotal ? parseFloat(item?.invoice?.invoiceTotal).toFixed(2) : 0}</p>
                            </div>
                            
                            <div className='w-fit justify-self-center'>
                                <div className="text-center">
                                    <CloudDownloadOutlined
                                        key="edit"
                                        style={{ color: "#3b82f6", fontSize: "18px", alignItems: "center" }}
                                        onClick={
                                            () => {
                                                window.open(item?.invoiceFile?.split("?")[0])
                                                console.log(item?.invoice?.invoiceFile?.split("?")[0])
                                            }
                                        }
                                    />
                                </div>
                            </div>

                            <Select
                                className='w-fit justify-self-end'
                                disabled={invoiceStatus.includes(item?.status) ? true : false}
                                defaultValue={item?.status}
                                bordered={false}
                                onChange={(value) => handlePatchInvoice(item, value)}
                                options={[
                                    { label: 'Pending', value: "Pending" },
                                    { label: "Paid", value: "Paid" },
                                ]}
                            />

                        </div>
                    )
                })}
            </div>

            {!projectInvoices?.length && <p className='text-sm text-gray-400'>No invoices</p>}

            <DrawerANTD
                title='Add Invoice'
                open={isModalOpen}
                onClose={handleCloseModal}
                getProjectInvoices={getProjectInvoices}
                children={<LinkInvoiceForm getProjectInvoices={getProjectInvoices} projectId={projectId} projectCurrency={projectCurrency} getProjectDetails={getProjectDetails} />}
            />

        </div>
    );
};