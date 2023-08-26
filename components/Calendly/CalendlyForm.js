import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import FormButtons from "../ANTD/FormButtons";
import { postAxios } from "@/functions/ApiCalls";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import moment from 'moment-timezone';

export default function CalendlyForm({ data, selectedDay, companyId, dataTimeZone, newTimeZone }) {
  const [options, setOptions] = useState([]);

  const router = useRouter();

  const onFinish = async (values) => {

    const Data =
    {
      ...values,
      appointmentDate: dayjs(selectedDay).format("YYYY-MM-DD")
    }
    console.log(Data);

    let url = `${process.env.DIGITALOCEAN}/calendy/sched/public/book/${companyId}/`;
    let res = await postAxios(url, Data, true, true, () => { });
    router.reload();
  };

  const getOptions = async () => {
    let res = await postAxios(
      `${process.env.DIGITALOCEAN}/calendy/sched/public/${companyId}/`,
      { day: selectedDay },
      false,
      false,
      () => { }
    );
    setOptions([])
    let arr = [];
    res?.map((item) => {
      console.log(dataTimeZone,"sss", newTimeZone, "ddd")

      console.log(typeof(dataTimeZone), typeof(newTimeZone))

      if (dataTimeZone !== newTimeZone && dataTimeZone && newTimeZone) {
        const fromTime = moment.tz(item.fromHour, 'HH.mm', dataTimeZone);
        const toTime = moment.tz(item.toHour, 'HH.mm', dataTimeZone);

        item.fromHour = moment.tz(fromTime, 'HH.mm', newTimeZone)
        item.toHour = moment.tz(toTime, 'HH.mm', newTimeZone)

        return arr.push({
          label: `${item?.fromHour.format("HH:mm")} - ${item?.toHour.format("HH:mm")}`,
          value: item?.id,
        });
      } else {
        return arr.push({
          label: `${item?.fromHour.replace(".", ":")} - ${item?.toHour.replace(".", ":")}`,
          value: item?.id,
        });
      }
    }
      );
    setOptions(arr);
  };

  useEffect(() => {
    if (companyId) {
      getOptions();
    }
  }, [selectedDay, newTimeZone]);

  return (
    <section>
      <h1 className="text-3xl font-light tracking-tight text-black pb-7">
        Book your {data?.duration * 100} min appointment
      </h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        style={{
          alignContent: "center",
          maxWidth: 600,
        }}
        requiredMark={true}
      >
        <div className="flex gap-x-5 w-full mt-0">
          <Form.Item
            label="First name"
            name="firstName"
            className="w-full"
            required
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="rounded w-full" size="large" />
          </Form.Item>
          <Form.Item label="Last name" name="lastName" className="w-full">
            <Input className="rounded w-full" size="large" />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
            },
            { type: "email" },
          ]}
          name="email"
          className="w-full"
        >
          <Input className="rounded w-full" size="large" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="summary"
          label="Appointment Summary"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="id"
          label="Time Range"
          rules={[{ required: true, message: "Province is required" }]}
        >
          <Select
            placeholder="Select province"
            size="large"
            options={options}
          />
        </Form.Item>

        <div className="w-full">
          <Form.Item>
            <FormButtons
              classNames={"w-full py-[0.55rem]"}
              content="Book Appointment"
            />
          </Form.Item>
        </div>
      </Form>
    </section>
  );
}
