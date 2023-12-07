import React, { useEffect, useState } from "react";
import moment from "moment";
import { DatePicker, Divider, Form, Input, Select } from "antd";
import cookie, { remove } from "react-cookies";
import {
  getAxios,
  patchAxios,
  postAxios,
} from "@/functions/ApiCalls";
import Image from "next/image";
import dayjs from "dayjs";
import FormButtons from "../ANTD/FormButtons";
import { LoadingOutlined } from "@ant-design/icons";
import AllCheckLists from "./AllCheckLists";
import SunEditorComponent from "../WYSWUG/SunEditorComponent";
import { useRouter } from "next/router";



export default function TaskForm({ handleNotifyTeam, selectedItem, projectId = null }) {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [taskDescription, setTaskDescription] = useState("<p></p>");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [checklistName, setChecklistName] = useState("")
  const [checkLists, setCheckLists] = useState([])
  const [showInput, setShowInput] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [commentText, setCommentText] = useState(null);
  const router = useRouter();

  const getAllEmployees = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/list-employees-no-pagination/`;
    let pathname = router.pathname.startsWith("/invited-project") ? true : false

    const employeeData = await getAxios(url, false, false, () => { }, pathname);
    const arrData = employeeData?.map((item) => ({
      value: item?.id,
      label: (
        <>
          <div className="flex items-center gap-x-2">
            <Image
              src={item?.userProfile?.pfp?.split("?")[0] || "/LogoWhite.svg"}
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
      if (projectId) {

        form.setFieldValue("project", selectedItem?.project);
      }
      form.setFieldValue("taskName", selectedItem?.taskName);
      form.setFieldValue("taskDescription", selectedItem?.taskDescription !== "undefined" ? selectedItem?.taskDescription : "");
      setTaskDescription(selectedItem?.taskDescription !== "undefined" ? selectedItem?.taskDescription : "<p>No description</p>")
      form.setFieldValue("taskStatus", selectedItem?.taskStatus);
      selectedItem?.priority !== "undefined" && form.setFieldValue("priority", selectedItem?.priority);
      selectedItem?.dueDate && form.setFieldValue("dueDate", dayjs(new Date(selectedItem?.dueDate ? selectedItem?.dueDate : null)));
      selectedItem?.startDate && form.setFieldValue("startDate", dayjs(new Date(selectedItem?.startDate ? selectedItem?.startDate : null)));
      {
        selectedItem?.assignee?.id && form.setFieldValue("assignee", {
        value: selectedItem?.assignee?.id,
        label: <>
          <div className='flex items-center gap-x-2'>
            <Image src={selectedItem?.assignee?.pfp?.split("?")[0] || '/whiteLogo.svg'} width={20} height={20} className='rounded-full' />
            <span>{selectedItem?.assignee?.name}</span>
          </div>
        </>,
      })}
    }
  }

  const handleAddComment = async () => {
    const url = `${process.env.DIGITALOCEAN}/tasks/add-comments/${selectedItem?.id}/`
    const data = {
      comment: commentText
    }
    let pathname = router.pathname.startsWith("/invited-project") ? true : false

    await patchAxios(url, data, false, false, () => { }, pathname)
    setCommentText(null)
    handleNotifyTeam("Comment added")
  }

  const onFinish = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    if (projectId) {
      formData.append("project", projectId);
    }
    formData.append("taskName", data?.taskName);
    formData.append("status", true);
    formData.append("taskDescription", data?.taskDescription);
    formData.append("taskStatus", data?.taskStatus);
    formData.append("priority", data?.priority);
    
    data?.dueDate ? formData.append(
      "dueDate",
      moment(new Date(data?.dueDate)).format("YYYY-MM-DD") 
    ) : formData.append("dueDate", null);
    
    data?.startDate ? formData.append(
      "startDate",
      moment(new Date(data?.startDate)).format("YYYY-MM-DD") 
    ) : formData.append("startDate", null);

    const assigneeValue = data?.assignee;
    const url = `${process.env.DIGITALOCEAN}/tasks/create-task/`;
    let pathname = router.pathname.startsWith("/invited-project") ? true : false

    if (selectedItem) {
      if (data?.assignee == undefined) {
        console.log("sssss")
        formData.append('assignee', null);
      } else {
        if (Number.isNaN(Number(assigneeValue))) {
          formData.append('assignee', assigneeValue ? selectedItem?.assignee?.id : null);
        } else {
          formData.append('assignee', assigneeValue);
        }
      }
      const url = `${process.env.DIGITALOCEAN}/tasks/edit-task/${selectedItem?.id}/`
      await patchAxios(url, formData, true, true, () => { }, pathname)
    } else {
      if (data?.assignee == undefined) {
        console.log("dddddd")
        formData.append('assignee', null);
      } else {
        formData.append('assignee', assigneeValue);
      }
      await postAxios(url, formData, true, true, () => { }, pathname)
    }


    form.resetFields();
    handleNotifyTeam(projectId);
    setIsLoading(false);
  };

  const onArchive = async () => {
    setIsLoadingDelete(true);
    const url = `${process.env.DIGITALOCEAN}/tasks/archive-task/${selectedItem?.id}/`
    let pathname = router.pathname.startsWith("/invited-project") ? true : false

    let res = await getAxios(url, true, true, () => { }, pathname)
    if (res) {
      handleNotifyTeam(projectId);
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

    const url = `${process.env.DIGITALOCEAN}/tasks/check-list/${selectedItem?.id}/`
    let pathname = router.pathname.startsWith("/invited-project") ? true : false

    const res = await getAxios(url, false, false, () => { }, pathname)
    setCheckLists(res)

  }

  const handleCreateChecklist = async () => {
    const data = {
      checklistName,
      task: selectedItem?.id
    }


    const url = `${process.env.DIGITALOCEAN}/tasks/check-list/`
    let pathname = router.pathname.startsWith("/invited-project") ? true : false

    await postAxios(url, data, false, false, () => { }, pathname)
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
        }}
        className="custom-form"
        form={form}
        requiredMark={true}
        initialValues={form}
      >
        <div className={`${selectedItem ? "grid laptop:grid-cols-2 phone:grid-cols-1 gap-x-12 justify-between w-[100%]" : ""}`}>

          <div>
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
              <SunEditorComponent form={form} fieldName="taskDescription" callBack={setTaskDescription} />
            </Form.Item>

            {selectedItem &&
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <p>Checklist(s)</p>
                  <span
                    className="hover:bg-mainBackground hover:dark:bg-[#141414] p-1 hover:text-white rounded hover:cursor-pointer"
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
                      <div className="bg-mainBackground dark:bg-[#141414] rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-2" onClick={() => handleCreateChecklist()}>Save</div>
                      <div className="bg-gray-400 dark:bg-[#282828] rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-2" onClick={() => handlehideInput(false)}>Cancel</div>
                    </div>
                  </div>
                }

                {checkLists?.length !== 0 ?
                  checkLists?.map((item) => {
                    return (
                      <AllCheckLists
                        item={item}
                        handleInitialValues={handleInitialValues}
                        handleNotifyTeam={handleNotifyTeam}
                      />
                    )
                  }) :
                  <p className="text-gray-400">No checklist</p>
                }
              </div>}

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
                    { label: "Backlog", value: "To Do" },
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
                label="Start Date"
                name="startDate"
                className="w-full"
              >
                <DatePicker size="large" className="w-full" placeholder="" />
              </Form.Item>
              <Form.Item
                label="Due Date"
                name="dueDate"
                className="w-full"
              >
                <DatePicker size="large" className="w-full" placeholder="" disabledDate={(current) => {
                  const startDate = form.getFieldValue("startDate");
                  return current && (current < moment().startOf("day") || current < startDate);
                }} />
              </Form.Item>

            </div>
            <Form.Item
              label="Assignee"
              name="assignee"
              className="w-full"
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

          <div>
            {selectedItem && <div>
              <p className="mb-2">Card History</p>
              {selectedItem?.history && Object.keys(selectedItem?.history || {}).length ? <div className="dark:bg-[#141414] px-4 py-[0.60rem] rounded-lg dark:border dark:border-[#424242]  hover:border-blue-400">

                {showHistory ? <div>
                  {selectedItem &&
                    selectedItem?.history && Object?.entries(selectedItem?.history)?.map((item) => {
                      return (
                        <div className="dark:text-[#b3b3b3] mb-2 flex items-center gap-3">
                          <div className="bg-[#282828] text-center flex items-center justify-center rounded px-2 py-1">
                            <p className="font-bold">{item[1]?.substring(0, 2)}</p>
                          </div>
                          <div>
                            <p className="font-bold">{item[1]}</p>
                            <p className="text-xs text-gray-500">{dayjs(item[0]).format("DD-MM-YYYY HH:mm")}</p>
                          </div>
                        </div>
                      )
                    })}
                </div> :
                  <div className="hover:cursor-pointer" onClick={() => setShowHistory(true)}>Click to view history</div>
                }
              </div>
                : <p className="text-gray-400">No history</p>
              }
              {selectedItem && showHistory && <div onClick={() => setShowHistory(false)} className="flex justify-center mt-2 w-full bg-gray-400 dark:bg-[#282828] text-center py-2 rounded-lg hover:shadow-lg hover:cursor-pointer">Close</div>}
            </div>}

            {selectedItem && <div className="mt-4">
              <p className="mb-2">Comments</p>
              <>
                {Object.keys(selectedItem?.comments || {}).length ? Object?.entries(selectedItem?.comments)?.map((item) => {
                  return (
                    <div className="dark:text-[#b3b3b3] mb-2 flex items-center gap-3">
                      <div className="bg-[#282828] text-center flex items-center justify-center rounded px-2 py-1">
                        <p title={item[1]?.user} className="font-bold">{item[1]?.user?.substring(0, 2)}</p>
                      </div>
                      <div>
                        <p className="font-bold">{item[1]?.comment}</p>
                        <p className="text-xs text-gray-500">{dayjs(item[0]).format("DD-MM-YYYY HH:mm")}</p>
                      </div>
                    </div>
                  )
                })
                  :
                  <p className="text-gray-400"></p>
                }
                <div className="flex gap-x-2">
                  <div className="bg-[#282828] text-center flex items-center h-fit justify-center rounded px-2 py-1">{cookie.load('username', { path: "/" })?.substring(0, 2)?.toUpperCase()}</div>
                  <div className="w-full">
                    <Input.TextArea
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment"
                      autoSize={{
                        minRows: 2,
                        maxRows: 3,
                      }} />
                    <button disabled={commentText?.length ? false : true} onClick={handleAddComment} className={`flex justify-center mt-2 w-fit bg-gray-400 dark:bg-[#282828] text-center py-2 px-4 rounded-lg  ${!commentText?.length ? "cursor-not-allowed" : "hover:shadow-lg hover:cursor-pointer"}`}>
                      Comment
                    </button>
                  </div>
                </div>
              </>
            </div>}
          </div>
        </div>

        <Divider />
        <div className="flex gap-x-5 w-full justify-between">
          {selectedItem && <div>
            <Form.Item>

              {!isLoadingDelete ? <button
                className="bg-red-600 hover:shadow-lg  text-textButtons rounded-lg py-[0.5rem] px-4"
                onClick={onArchive}
              >Archive</button> :
                <div className='flex bg-gray-400 gap-x-3 rounded-lg min-w-fit justify-center items-center  text-white py-[0.6rem] px-4'>
                  <LoadingOutlined /> Loading
                </div>
              }
            </Form.Item>
          </div>}
          <div className={`${!selectedItem ? "w-full flex justify-end" : ""}`}>
            <Form.Item>
              <FormButtons content={selectedItem ? "Save" : "Create"} isLoading={isLoading} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
