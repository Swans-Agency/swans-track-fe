import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Calendly/Navbar';
import Footer from '@/components/Footer/Footer';
import ModalANTD from '@/components/ANTD/ModalANTD';
import CalendlyForm from '@/components/Calendly/CalendlyForm';
import Calender from '@/components/Calendly/Calender';
import axios from 'axios';


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


    useEffect(() => {
        setConfigData({
            id: router.query.id,
            company: router.query.company
        })

    }, [router.query.id, router.query.company])

    useEffect(() => {
        if (router.query.id && router.query.company) {
            let url = `${process.env.DIGITALOCEAN}/client/lead-form/${router.query.id}`
            axios.get(url).then(res => {

                setLeadData(res?.data)
                if (res?.data?.active === "Unactive") {
                    router.push('/')
                }
            })
        }
    }, [router.query.id, router.query.company])

    useEffect(() => {
        setCompanyId(router.query.companyId);
        if (router.query.companyId) {
            getCalData(router.query.companyId);
        }
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