import React, { useEffect, useState } from "react";
import Navbar from "@/components/Calendly/Navbar";
import CalendlyForm from "@/components/Calendly/CalendlyForm";
import Calender from "@/components/Calendly/Calender";
import { useRouter } from "next/router";
import { getAxios } from "@/functions/ApiCalls";

export default function SchedTrack() {
  const router = useRouter();

  const [calData, setCalData] = useState({});
  const [companyId, setCompanyId] = useState(router.query.company);
  const [selectedDay, setSelectedDay] = useState([]);
  const getCalData = async (companyId) => {
    let res = await getAxios(
      `${process.env.DIGITALOCEAN}/calendy/sched/public/${companyId}/`,
      false,
      false,
      setCalData
    );
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
      <div className="w-[100%] items-center content-center mt-10">
        <div className="w-[90%] m-auto flex justify-center gap-20">
          <CalendlyForm
            data={calData}
            selectedDay={selectedDay}
            companyId={companyId}
          />
          <Calender data={calData} setSelectedDay={setSelectedDay} />
        </div>
      </div>

      <footer className="text-sm">
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
