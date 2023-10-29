import React, { useEffect, useState } from "react";
import Navbar from "@/components/Calendly/Navbar";
import CalendlyForm from "@/components/Calendly/CalendlyForm";
import Calender from "@/components/Calendly/Calender";
import { useRouter } from "next/router";
import { getAxios } from "@/functions/ApiCalls";
import axios from "axios";
import NewCalendar from "@/components/NewCalendar/NewCalendar";
import ModalANTD from "@/components/ANTD/ModalANTD";

export default function SchedTrack() {
  const router = useRouter();

  const [calData, setCalData] = useState({});
  const [companyId, setCompanyId] = useState(router.query.company);
  const [selectedDay, setSelectedDay] = useState([]);
  const [dataTimeZone, setDataTimeZone] = useState("");
  const [newTimeZone, setNewTimeZone] = useState(dataTimeZone);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    setCompanyId(router.query.company);
    if (router.query.company) {
      getCalData(router.query.company);
    }
  }, [router.query.company, companyId]);

  return (
    <section>
      <Navbar content="Get your calendar" />
      <div className="mt-10">
        <div className="tablet:px-[15rem] phone:px-4 phone:flex justify-center items-center">
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
            />}
          />
          <div className="max-w-[700px]">
            <Calender data={calData} setSelectedDay={setSelectedDay} dataTimeZone={dataTimeZone} setNewTimeZone={setNewTimeZone} newTimeZone={newTimeZone} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      </div>

      <footer className="text-sm phone:mb-4 tablet:mb-0 mt-4 ">
        <div className="text-center">
          <h1 className=" text-gray-600 dark:text-white">Swans Track &copy; 2023</h1>
          <div className="flex gap-x-3 justify-center items-center">
            <a className="text-blue-400" href="/terms-conditions">
              Terms of use
            </a>
            <p className="dark:text-white">|</p>
            <a className="text-blue-400" href="/swans-privacy-policy">
              privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
