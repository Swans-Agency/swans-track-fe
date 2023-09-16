import DrawerANTD from '@/components/ANTD/DrawerANTD';
import AddIcon from '@/pages/authorized/projects/details/icons/AddIcon';
import React, { useState } from 'react';
import { Select } from 'antd';
import { patchAxios } from '@/functions/ApiCalls';
import Proposal from '@/components/Navbar/Icons/Proposal';
import LinkProposalForm from './LinkProposalForm';
import { SearchOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Dots from './Icons/Dots';



export default function ProjectProposals({ projectProposals, projectId, getProjectProposals, projectCurrency, getProjectDetails, add=true }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bgColor, setBgColor] = useState({
        "Pending": "bg-orange-50",
        "Accepted": "bg-green-50",
        "Rejected": "bg-red-50",
    });
    const [proposalStatus, setProposalStatus] = useState(["Accepted", "Rejected"])

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handlePatchProposal = async (item, value) => {
        console.log({ item, value })
        const url = `${process.env.DIGITALOCEAN}/project/proposal-project/${item?.id}/`;
        await patchAxios(url, { "status": value, "job": projectId }, true, true);
        getProjectProposals()
        getProjectDetails()
    }

    return (
        <div className='border rounded-lg h-fit max-h-[380px] mt-4 px-4 py-2 relative'>
            <div className='flex justify-between items-center bg-white !z-10 mb-3'>
                <p className='font-semibold text-md '>Proposals</p>
                {add && <div onClick={() => setIsModalOpen(true)}><AddIcon /></div>}
            </div>
            <div className="max-h-[290px] hover:overflow-y-auto overflow-hidden ">
                {projectProposals?.map((item, index) => {
                    return (
                        <div className={`grid grid-cols-[1fr_1fr_1fr_1fr] items-center border rounded py-3 px-2 mb-2 ${bgColor[item?.status]} `}>
                            <div className='flex items-center justify-start gap-1'>
                                <Proposal />
                                <p className='text-sm font-extralight'>{item?.proposal?.proposalNo}</p>
                            </div>
                            <div>
                                <p className='text-xs font-bold text-center'>Total</p>
                                <p className='text-sm font-extralight text-center'>{projectCurrency} {item?.proposal?.proposalTotal ? parseFloat(item?.proposal?.proposalTotal).toFixed(2) : 0}</p>
                            </div>
                            <div className='w-fit justify-self-center'>
                                <div className="text-center">
                                    <CloudDownloadOutlined
                                        key="edit"
                                        style={{ color: "#3b82f6", fontSize: "18px", alignItems: "center" }}
                                        onClick={() => window.open(item?.proposalFile?.split("?")[0])}
                                    />
                                </div>
                            </div>

                            <Select
                                className='w-fit justify-self-end'
                                disabled={proposalStatus.includes(item?.status) ? true : false}
                                defaultValue={item?.status}
                                bordered={false}
                                onChange={(value) => handlePatchProposal(item, value)}
                                options={[
                                    { label: 'Pending', value: "Pending" },
                                    { label: "Accepted", value: "Accepted" },
                                    { label: "Rejected", value: "Rejected" },
                                ]}
                            />

                        </div>
                    )
                })}
            </div>

            {!projectProposals?.length && <p className='text-sm text-gray-400'>No proposals</p>}

            <DrawerANTD
                title='Add Proposal'
                open={isModalOpen}
                onClose={handleCloseModal}
                getProjectProposals={getProjectProposals}
                children={<LinkProposalForm projectId={projectId} getProjectProposals={getProjectProposals} projectCurrency={projectCurrency} getProjectDetails={getProjectDetails} />}
            />

        </div>
    );
};