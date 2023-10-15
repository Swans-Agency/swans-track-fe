import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import FormButtons from "../ANTD/FormButtons";
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from "next/router";
import dayjs from "dayjs";
import moment from 'moment-timezone';
import axios from "axios";
import { NotificationLoading, NotificationSuccess } from "@/functions/Notifications";

export default function CalendlyForm({ data, selectedDay, companyId, dataTimeZone, newTimeZone, handleClose }) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [form] = useForm();

  const handleReset = () => {
    form.resetFields(); // Reset all form fields to their initial values
  };

  const onFinish = async (values) => {
    setIsLoading(true)
    NotificationLoading()
    const Data =
    {
      ...values,
      appointmentDate: dayjs(selectedDay).format("YYYY-MM-DD")
    }
    console.log(Data);

    let url = `${process.env.DIGITALOCEAN}/calendy/sched/public/book/${companyId}/`;
    let res = await axios.post(url, Data);
    NotificationSuccess()
    handleReset()
    setIsLoading(false)
    handleClose()
    router.reload()
  };

  const getOptions = async () => {
    const url = `${process.env.DIGITALOCEAN}/calendy/sched/time-slots/${companyId}/`
    let res = await axios.post(url, { day: selectedDay })
    setOptions([])
    let arr = [];
    res?.data?.map((item) => {
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
        form={form}
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
            className="w-full mb-2"
            required
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="rounded w-full" size="large" />
          </Form.Item>
          <Form.Item label="Last name" name="lastName" required
            rules={[
              {
                required: true,
              },
            ]} className="w-full  mb-2">
            <Input className="rounded w-full" size="large" />
          </Form.Item>
        </div>
        <div className="flex gap-x-5 w-full mt-0">
          <Form.Item label="Phone number" name="phoneNumber" required
            rules={[
              {
                required: true,
              },
            ]} className="w-full  mb-2">
            <Input className="rounded w-full" size="large" />
          </Form.Item>
          
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
              },
              { type: "email" },
            ]}
            name="email"
            className="w-full mb-2"
          >
            <Input className="rounded w-full" size="large" />
          </Form.Item>

          


        </div>

        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="summary"
          label="Appointment Summary"
          className="mb-2"
        >
          <Input.TextArea
            autoSize={{
              minRows: 4,
              maxRows: 4,
            }}
          />
        </Form.Item>

        <Form.Item
          name="id"
          label="Time Range"
          className="mb-2"
          rules={[{ required: true, message: "Time range is required" }]}
        >
          <Select
            placeholder="Select time slot"
            size="large"
            options={options}
          />
        </Form.Item>

        <div className="w-full">
          <Form.Item>
            <FormButtons
              classNames={"w-full py-[0.55rem] mt-1"}
              content="Book Appointment"
              isLoading={isLoading}
            />
          </Form.Item>
        </div>
      </Form>
    </section>
  );
}
