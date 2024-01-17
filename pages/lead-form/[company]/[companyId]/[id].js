import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Calendly/Navbar';
import Footer from '@/components/Footer/Footer';
import ModalANTD from '@/components/ANTD/ModalANTD';
import CalendlyForm from '@/components/Calendly/CalendlyForm';
import Calender from '@/components/Calendly/Calender';
import axios from 'axios';
import NextCrypto from 'next-crypto';


export default function index() {
    const router = useRouter();

    const [calData, setCalData] = useState({});
    const [companyId, setCompanyId] = useState(router.query.company);
    const [selectedDay, setSelectedDay] = useState([]);
    const [dataTimeZone, setDataTimeZone] = useState("");
    const [newTimeZone, setNewTimeZone] = useState(dataTimeZone);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [configData, setConfigData] = useState(null);
    const [leadData, setLeadData] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);


    const handleDecodeIds = async (company, id) => {
        const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
        const decodedCompany = decodeURIComponent(company);
        const decryptedCompany = await crypto.decrypt(decodedCompany);

        const decodedId = decodeURIComponent(id);
        const decryptedId = await crypto.decrypt(decodedId);

        setConfigData({
            id: decryptedId,
            company: decryptedCompany
        })
    }

    useEffect(() => {
        handleDecodeIds(router.query.company, router.query.id)
    }, [router.query.id, router.query.company])

    const handleGetLeadData = async (id) => {
        const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
        const decodedId = decodeURIComponent(id);
        const idValue = await crypto.decrypt(decodedId);

        let url = `${process.env.DIGITALOCEAN}/client/lead-form/${idValue}`
        axios.get(url).then(res => {

            setLeadData(res?.data)
            if (res?.data?.active === "Unactive") {
                router.push('/')
            }
        })
    }

    useEffect(() => {
        if (router.query.id && router.query.company) {
            handleGetLeadData(router.query.id)
        }
    }, [router.query.id, router.query.company])

    const handleSaveId = async (id) => {
        const crypto = new NextCrypto(`${process.env.ENCRYPTION_KEY}`);
        const decodedId = decodeURIComponent(id);
        const decryptedId = await crypto.decrypt(decodedId);
    
        if (decryptedId) {
            setCompanyId(decryptedId);
            getCalData(decryptedId);
        }
    }

    useEffect(() => {
        handleSaveId(router.query.companyId)
    }, [router.query.companyId, companyId]);

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const getCalData = async (companyId) => {
        const url = `${process.env.DIGITALOCEAN}/calendy/sched/public-settings/${companyId}/`
        let res = await axios.get(url)
        if (res?.status === 200) {

            setCalData(res?.data?.settings)
            setDataTimeZone(res?.data?.settings?.timeZone)
        }
    };

    return (
        <div>
            <Navbar content="Create yours" />
            <div className="mt-10">


                <div className="tablet:px-[15rem] phone:px-4 phone:flex justify-center items-center">
                    <div className="max-w-[700px]">
                <div>
                    
                    
                </div>
                        {showCalendar ? <Calender
                            data={calData}
                            setSelectedDay={setSelectedDay}
                            dataTimeZone={dataTimeZone}
                            setNewTimeZone={setNewTimeZone}
                            newTimeZone={newTimeZone}
                            setIsModalOpen={setIsModalOpen}
                        /> :
                            <>
                                {leadData && <div>
                                    <h1 className="text-3xl text-center font-light tracking-tight text-black dark:text-white pb-7">
                                        {leadData?.title}
                                    </h1>
                                    <div className='dark:text-gray-100' dangerouslySetInnerHTML={{ __html: leadData?.description }}></div>
                                    <p
                                        onClick={() => setShowCalendar(true)}
                                        className={`bg-foreignBackground dark:bg-[#282828] w-full  hover:shadow-lg  hover:dark:shadow-[#1d1d1d] text-textButtons rounded-lg py-[0.5rem] px-4 text-center mt-4 hover:cursor-pointer`}
                                    >Continue</p>
                                </div>}
                            </>
                        }
                    </div>
                </div>
            </div>
            <ModalANTD
                title={null}
                footer={false}
                isModalOpen={isModalOpen}
                handleOk={handleClose}
                handleCancel={handleClose}
                renderComponent={<CalendlyForm
                    data={calData}
                    selectedDay={selectedDay}
                    companyId={companyId}
                    dataTimeZone={dataTimeZone}
                    newTimeZone={newTimeZone}
                    handleClose={handleClose}
                    calendarEventName={`${leadData?.title} Appointment`}
                    referralSource={leadData?.referralSource}
                />}
            />
            <Footer />
        </div>
    );
};