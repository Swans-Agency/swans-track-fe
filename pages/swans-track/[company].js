import React, { useEffect, useState } from "react";
import Navbar from "@/components/Calendly/Navbar";
import CalendlyForm from "@/components/Calendly/CalendlyForm";
import Calender from "@/components/Calendly/Calender";
import { useRouter } from "next/router";
import { getAxios } from "@/functions/ApiCalls";
import axios from "axios";

export default function SchedTrack() {
  const router = useRouter();

  const [calData, setCalData] = useState({});
  const [companyId, setCompanyId] = useState(router.query.company);
  const [selectedDay, setSelectedDay] = useState([]);
  const [dataTimeZone, setDataTimeZone] = useState("");
  const [newTimeZone, setNewTimeZone] = useState(dataTimeZone);

  const getCalData = async (companyId) => {
    const url = `${process.env.DIGITALOCEAN}/calendy/sched/public/${companyId}/`
    let res = await axios.get(url)
    if (res?.status === 200) {
      setCalData(res?.data)
      setDataTimeZone(res?.data?.timeZone)
    }
    // let res = await getAxios(
    //   `${process.env.DIGITALOCEAN}/calendy/sched/public/${companyId}/`,
    //   false,
    //   false,
    //   setCalData
    // );
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
        <div className="desktop:grid desktop:grid-cols-[1fr_1fr] tablet:px-[15rem] phone:px-4 phone:flex phone:flex-col-reverse  gap-x-20">
          <div>
            <CalendlyForm
              data={calData}
              selectedDay={selectedDay}
              companyId={companyId}
              dataTimeZone={dataTimeZone}
              newTimeZone={newTimeZone}
            />
          </div>
          <div>
            <Calender data={calData} setSelectedDay={setSelectedDay} dataTimeZone={dataTimeZone} setNewTimeZone={setNewTimeZone} newTimeZone={newTimeZone} />
          </div>
        </div>
      </div>

      <footer className="text-sm phone:mb-4 tablet:mb-0 mt-4">
        <div className="text-center">
          <h1 className=" text-gray-600">Swans Track &copy; 2023</h1>
          <div>
            <a className="text-blue-400" href="/terms-conditions">
              Terms of use
            </a>{" "}
            |{" "}
            <a className="text-blue-400" href="/swans-privacy-policy">
              privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
