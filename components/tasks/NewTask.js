import React, { useEffect, useState } from "react";
import moment from "moment";
import { DatePicker, Divider, Form, Input, Select } from "antd";
import {
  deleteAxios,
  getAxios,
  patchAxios,
  postAxios,
} from "@/functions/ApiCalls";
import Image from "next/image";
import dayjs from "dayjs";
import FormButtons from "../ANTD/FormButtons";

export default function TaskForm({ handleNotifyTeam }) {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [editTask, setEditTask] = useState({});

  const { TextArea } = Input;

  const getAllEmployees = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/list-employees/`;
    const employeeData = await getAxios(url);
    const arrData = employeeData?.results?.map((item) => ({
      value: item?.id,
      label: (
        <>
          <div className="flex items-center gap-x-2">
            <Image
              src={item?.userProfile?.pfp?.split("?")[0]}
              width={30}
              height={30}
              className="rounded-full"
            />
            <span>
              {item?.userProfile?.firstName} {item?.userProfile?.lastName}
            </span>
          </div>
        </>
      ),
    }));
    setEmployees(arrData);
  };

  useEffect(() => {
    getAllEmployees();
    
  }, []);

  const onFinish = async (data) => {
    const formData = new FormData();
    formData.append("taskName", data?.taskName);
    formData.append("status", true);
    formData.append("taskDescription", data?.taskDescription);
    formData.append("taskStatus", data?.taskStatus);
    formData.append("priority", data?.priority);
    formData.append(
      "dueDate",
      moment(new Date(data?.dueDate)).format("YYYY-MM-DD")
    );
    const assigneeValue = data?.assignee;
    const url = `${process.env.DIGITALOCEAN}/tasks/create-task/`;
    formData.append("assignee", assigneeValue);
    let res = await postAxios(url, formData, true, true, () => {});

    handleNotifyTeam();
  };

  return (
    <>
      {editTask && (
        <Form
          onFinish={onFinish}
          layout="vertical"
          style={{
            alignContent: "center",
            maxWidth: 600,
          }}
          className="custom-form"
          form={form}
          requiredMark={true}
          initialValues={editTask}
        >
          <Form.Item label="Task" name="taskName" className="w-full" required>
            <Input className="rounded" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="taskDescription"
            className="w-full"
          >
            <TextArea className="rounded w-full" />
          </Form.Item>
          <div className="flex gap-x-5 w-full mt-0">
            <Form.Item
              label="Task Status"
              name="taskStatus"
              className="w-full"
              required
            >
              <Select
                showSearch
                defaultValue=""
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  form.setFieldValue("taskStatus", e);
                }}
                allowClear={true}
                filterOption={true}
                options={[
                  { label: "To Do", value: "To Do" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Idle", value: "Idle" },
                  { label: "Completed", value: "Completed" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Task Priority"
              name="priority"
              className="w-full"
              required
            >
              <Select
                showSearch
                defaultValue=""
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  form.setFieldValue("priority", e);
                }}
                allowClear={true}
                filterOption={true}
                options={[
                  { label: "Low", value: "Low" },
                  { label: "Normal", value: "Normal" },
                  { label: "Urgent", value: "Urgent" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex gap-x-5 w-full mt-0">
            <Form.Item
              label="Due Date"
              name="dueDate"
              className="w-full"
              required
            >
              <DatePicker className="rounded w-full" placeholder="" />
            </Form.Item>

            <Form.Item
              label="Assigne To"
              name="assignee"
              className="w-full"
              required
            >
              <Select
                showSearch
                defaultValue=""
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  form.setFieldValue("assignee", e);
                }}
                allowClear={true}
                filterOption={true}
                options={employees}
              />
            </Form.Item>
          </div>

          <Divider />
          <div className="flex gap-x-5 w-full justify-end">
            <Form.Item>
              <FormButtons content= "Assign" />
            </Form.Item>
          </div>
        </Form>
      )}
    </>
  );
}
