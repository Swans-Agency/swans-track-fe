import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, DatePicker, Divider, Form, Input, Select, notification } from "antd";
import {
  deleteAxios,
  getAxios,
  patchAxios,
  postAxios,
} from "@/functions/ApiCalls";
import Image from "next/image";
import dayjs from "dayjs";
import FormButtons from "../ANTD/FormButtons";

export default function TaskForm({ handleNotifyTeam, selectedItem }) {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [editTask, setEditTask] = useState({});

  const { TextArea } = Input;

  const getAllEmployees = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/list-employees-no-pagination/`;
    const employeeData = await getAxios(url);
    const arrData = employeeData?.map((item) => ({
      value: item?.id,
      label: (
        <>
          <div className="flex items-center gap-x-2">
            <Image
              src={item?.userProfile?.pfp?.split("?")[0] || "https://swansagencymain.fra1.digitaloceanspaces.com/SBSFILES/defaultPics/user.png"}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>
              {item?.username}
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

  useEffect(() => { handleInitialValues() }, [selectedItem]);

  const handleInitialValues = () => {
    console.log({ selectedItem })
    if (selectedItem) {
      form.setFieldValue("taskName", selectedItem?.taskName);
      form.setFieldValue("taskDescription", selectedItem?.taskDescription !== "undefined" ? selectedItem?.taskDescription : "");
      form.setFieldValue("taskStatus", selectedItem?.taskStatus);
      form.setFieldValue("priority", selectedItem?.priority);
      form.setFieldValue("dueDate", dayjs(new Date(selectedItem?.dueDate ? selectedItem?.dueDate : null)));
      form.setFieldValue("assignee", {
        value: selectedItem?.assignee?.id,
        label: <>
          <div className='flex items-center gap-x-2'>
            <Image src={selectedItem?.assignee?.pfp?.split("?")[0]} width={20} height={20} className='rounded-full' />
            <span>{selectedItem?.assignee?.name}</span>
          </div>
        </>,
      })
    }
  }

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
    // formData.append("assignee", assigneeValue);
    // let res = await postAxios(url, formData, true, true, () => { });


    if (selectedItem) {
      // console.log(Number(formData.get("assignee")) , selectedItem?.assignee?.id)
      if (Number.isNaN(Number(assigneeValue))) {
        formData.append('assignee', selectedItem?.assignee?.id);
      } else {
        formData.append('assignee', assigneeValue);
      }
      const url = `${process.env.DIGITALOCEAN}/tasks/edit-task/${selectedItem?.id}/`
      let res = await patchAxios(url, formData, true, true, () => { })
    } else {
      formData.append('assignee', assigneeValue);
      let res = await postAxios(url, formData, true, true, () => { })
    }


    form.resetFields();
    handleNotifyTeam();
  };

  const revertArchive = async (id) => {
    const url = `${process.env.DIGITALOCEAN}/tasks/unarchive-task/${id}/`
    await getAxios(url, true, true, () => { })
    handleNotifyTeam()
  }

  const onArchive = async () => {
    const url = `${process.env.DIGITALOCEAN}/tasks/archive-task/${selectedItem?.id}/`
    let res = await getAxios(url, true, false, () => {})
    if (res) {
      handleNotifyTeam();
    }
  }

  return (
    <>
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
        initialValues={form}
      >
        <Form.Item label="Task" name="taskName" className="w-full" required
          rules={[
            {
              required: true
            }
          ]}>
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
            rules={[
              {
                required: true
              }
            ]}
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
            rules={[
              {
                required: true
              }
            ]}
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
            rules={[
              {
                required: true
              }
            ]}
          >
            <DatePicker className="rounded w-full" placeholder="" />
          </Form.Item>

          <Form.Item
            label="Assigne To"
            name="assignee"
            className="w-full"
            required
            rules={[
              {
                required: true
              }
            ]}
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
        <div className="flex gap-x-5 w-full justify-between">
          {selectedItem  && <div>
            <Form.Item>
              <button 
              className="bg-red-600 hover:bg-red-700 text-textButtons rounded py-[0.4rem] px-3"
                onClick={onArchive}
              >Archive</button>
            </Form.Item>
          </div>}
          <div className={`${!selectedItem ? "w-full flex justify-end" : ""}`}>
            <Form.Item>
              <FormButtons content={selectedItem ? "Re-assign" : "Assign"} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}
