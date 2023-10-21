import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Checkbox, DatePicker, Divider, Form, Input, Popconfirm, Select } from "antd";
import {
  deleteAxios,
  getAxios,
  patchAxios,
  postAxios,
} from "@/functions/ApiCalls";
import Image from "next/image";
import dayjs from "dayjs";
import FormButtons from "../ANTD/FormButtons";
import { LoadingOutlined } from "@ant-design/icons";
import CustomEditor from "../Tiny/Editor";
import SubTask from "./SubTask";
import CheckList from "./CheckList";
import AllCheckLists from "./AllCheckLists";



export default function TaskForm({ handleNotifyTeam, selectedItem }) {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [taskDescription, setTaskDescription] = useState("<p></p>");
  const [showEditor, setShowEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [checklistName, setChecklistName] = useState("")
  const [checkLists, setCheckLists] = useState([])
  const [showInput, setShowInput] = useState(false);
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
    if (selectedItem) {
      getCheckLists()

      form.setFieldValue("taskName", selectedItem?.taskName);
      form.setFieldValue("taskDescription", selectedItem?.taskDescription !== "undefined" ? selectedItem?.taskDescription : "");
      setTaskDescription(selectedItem?.taskDescription !== "undefined" ? selectedItem?.taskDescription : "<p>No description</p>")
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
    setIsLoading(true);
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


    if (selectedItem) {
      if (Number.isNaN(Number(assigneeValue))) {
        formData.append('assignee', selectedItem?.assignee?.id);
      } else {
        formData.append('assignee', assigneeValue);
      }
      const url = `${process.env.DIGITALOCEAN}/tasks/edit-task/${selectedItem?.id}/`
      await patchAxios(url, formData, true, true, () => { })
    } else {
      formData.append('assignee', assigneeValue);
      await postAxios(url, formData, true, true, () => { })
    }


    form.resetFields();
    handleNotifyTeam();
    setIsLoading(false);
  };

  const onArchive = async () => {
    setIsLoadingDelete(true);
    const url = `${process.env.DIGITALOCEAN}/tasks/archive-task/${selectedItem?.id}/`
    let res = await getAxios(url, true, false, () => { })
    if (res) {
      handleNotifyTeam();
    }
    setIsLoadingDelete(false);
  }

  const handleAddChecklistInput = () => {
    setShowInput(true)
  }

  const handlehideInput = () => {
    setShowInput(false)
  }

  const getCheckLists = async () => {
    console.log(selectedItem?.id)
    const url = `${process.env.DIGITALOCEAN}/tasks/check-list/${selectedItem?.id}/`
    const res = await getAxios(url, false, false, () => { })
    setCheckLists(res)
    console.log({ res })
  }

  const handleCreateChecklist = async () => {
    const data = {
      checklistName,
      task: selectedItem?.id
    }
    console.log({ data })

    const url = `${process.env.DIGITALOCEAN}/tasks/check-list/`
    await postAxios(url, data, false, false, () => { })
    setShowInput(false)
    setChecklistName("")
    handleInitialValues()
  }

  

  return (
    <div>
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
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="taskDescription"
          className="w-full"
        >
          {showEditor || !selectedItem ? <CustomEditor form={form} fieldName="taskDescription" /> :
            <div
              onClick={() => setShowEditor(true)}
              className="border rounded-lg p-2 hover:cursor-pointer hover:border-blue-400"
              dangerouslySetInnerHTML={{ __html: taskDescription }}
            />
          }
        </Form.Item>

        {selectedItem &&
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p>Checklist(s)</p>
              <span
                className="hover:bg-mainBackground p-1 hover:text-white rounded hover:cursor-pointer"
                onClick={() => handleAddChecklistInput(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
            </div>
            {showInput &&
              <div className="flex items-center gap-2 mb-3">
                <Input
                  autoFocus placeholder="Checklist name" size="large" className=""
                  onChange={(e) => setChecklistName(e.target.value)}
                />
                <div className="flex gap-1">

                  <div className="bg-mainBackground rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-2" onClick={() => handleCreateChecklist()}>Save</div>
                  <div className="bg-gray-400 rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-2" onClick={() => handlehideInput(false)}>Cancel</div>
                </div>
              </div>
            }

            {!checkLists.length == 0 ? 
            checkLists?.map((item) => {
                return (
                  <AllCheckLists
                    item={item}
                    handleInitialValues={handleInitialValues}
                  />
                )
              }) :
              <p className="text-gray-400">No checklist</p>
              }
          </div>
        }

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
              size="large"
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
              size="large"
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
            <DatePicker size="large" className="w-full" placeholder="" />
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
              size="large"
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
          {selectedItem && <div>
            <Form.Item>

              {!isLoadingDelete ? <button
                className="bg-red-600 hover:shadow-lg  text-textButtons rounded py-[0.5rem] px-4"
                onClick={onArchive}
              >Archive</button> :
                <div className='flex bg-gray-400 gap-x-3 rounded min-w-fit justify-center items-center  text-white py-[0.6rem] px-4'>
                  <LoadingOutlined /> Loading
                </div>
              }
            </Form.Item>
          </div>}
          <div className={`${!selectedItem ? "w-full flex justify-end" : ""}`}>
            <Form.Item>
              <FormButtons content={selectedItem ? "Edit" : "Assign"} isLoading={isLoading} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
