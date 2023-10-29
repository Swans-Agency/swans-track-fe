import React, { useEffect, useState } from 'react';
import { Form, Input, Popover, Select, Steps, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { currencies, getObjectsFromLocalStorage, saveToLocal, timeZones } from '@/functions/GeneralFunctions';
import FormButtons from '@/components/ANTD/FormButtons';
import { postAxios } from '@/functions/ApiCalls';
import { useRouter } from "next/router";
import cookie from "react-cookies";
import { NotificationError } from '@/functions/Notifications';

export default function index() {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [nextButton, setNextButton] = useState(true);
    const [companyName, setCompanyName] = useState(null);
    const [companyAddress, setCompanyAddress] = useState(null);
    const [companyEmail, setCompanyEmail] = useState(null);
    const [companyNumber, setCompanyNumber] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [timeZone, setTimeZone] = useState(null);
    const [iban, setIban] = useState(null);
    const [logo, setLogo] = useState(null);
    const [sig, setSig] = useState(null);
    const [pTerms, setPTerms] = useState(null);
    const [ITerms, setITerms] = useState(null);
    const router = useRouter();

    const steps = [
        {
            title: <p className='font-semibold'>Company Details</p>,
            description: 'Building the Foundation',
            // status: 'process',
            content: ""
        },
        {
            title: <p className='font-semibold'>Global Settings</p>,
            description: 'Setting the Pace',
            // status: 'process',
            content: ""
        },
        {
            title: <p className='font-semibold'>Banking & Payments</p>,
            description: "Securing Financials",
            // status: 'process',
            content: ""
        },
        {
            title: <p className='font-semibold'>Brand Identity</p>,
            description: "Putting a Face to Your Name",
            // status: 'process',
            content: ""
        },
        {
            title: <p className='font-semibold'>Personal Touch</p>,
            description: "Sealing the Deal",
            // status: 'process',
            content: ""
        },
        {
            title: <p className='font-semibold'>Legal Agreements</p>,
            description: "Defining the Rules",
            // status: 'process',
            content: ""
        }
    ]

    const { TextArea } = Input;

    const handleChange = (e, type) => {
        type(e)
    }

    const handleNext = () => {
        setCurrent(current + 1)
        setNextButton(true)
    }

    useEffect(() => {
        if (getObjectsFromLocalStorage("companyPreferences")) {
            router.push("/authorized/dashboard");
        }
    }, [])

    useEffect(() => {
        ;
        if (companyName && companyAddress && companyEmail && companyNumber) {
            setNextButton(false)
        }
        if (currency && timeZone) {
            setNextButton(false)
        }
        if (iban) {
            setNextButton(false)
        }
        if (logo) {
            setNextButton(false)
        }
        if (sig) {
            setNextButton(false)
        }
        if (pTerms && ITerms) {
            setNextButton(false)
        }
    }, [companyName, companyAddress, companyEmail, companyNumber, currency, timeZone, iban, logo, sig, pTerms, ITerms])

    const onFinish = async (data) => {
        const formData = new FormData();
        formData.append("bankIban", iban);
        formData.append("timeZone", timeZone);
        formData.append("currency", currency);
        formData.append("companyName", companyName);
        formData.append("companyLocation", companyAddress);
        formData.append("companyNumber", companyNumber);
        formData.append("companyEmail", companyEmail);
        formData.append("PTermsConditions", data?.PTermsConditions);
        formData.append("ITermsConditions", data?.ITermsConditions);
        ;
        if (logo && logo.file) {
            formData.append("logo", logo.file.originFileObj);
        }
        if (sig && sig.file) {
            formData.append("signature", sig.file.originFileObj);
        }
        const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`;
        let companyPrefernceSavedData = await postAxios(url, formData, true, true, () => { });
        saveToLocal("companyPreferences", companyPrefernceSavedData);
        cookie.save("companyPreferences", companyPrefernceSavedData?.id, {
            path: "/",
        });
        router.push("/authorized/dashboard");
    };

    const checkFileSize = (file) => {
        const maxSize = 1024 * 1024; // 1MB in bytes
        if (file.size > maxSize) {
            NotificationError("File size must be less than 1MB");
            // message.error('File size must be less than 1MB');
            return false; // Prevent upload
        }
        return true; // Allow upload
    };

    return (
        <div className='py-5'>
            <div className='fixed top-5 left-5 h-[100vh]'>
                <Steps
                    current={current}
                    direction="vertical"
                    items={steps}
                    style={{ height: '100vh' }}
                />
            </div>

            <div className='pt-10 max-w-[600px] mx-auto text-center'>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        alignContent: "center",
                    }}
                    className="desktop:max-w-[650px]"
                    form={form}
                >

                    {current == 0 && <div className='text-center'>
                        <p className='text-4xl font-black'>Please introduce yourself</p>
                        <p className='pb-5'>This will only take 3 minutes to complete</p>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                name="companyName"
                                className="w-full"
                            >
                                <Input size='large' placeholder='Company name' onChange={(e) => {
                                    // form.setFieldValue("companyName", e.target.value);
                                    handleChange(e.target.value, setCompanyName)
                                }} />
                            </Form.Item>
                            <Form.Item
                                name="companyLocation"
                                className="w-full"
                            >
                                <Input size='large' placeholder='Company address' onChange={(e) => {
                                    // form.setFieldValue("companyLocation", e.target.value); 
                                    handleChange(e.target.value, setCompanyAddress)
                                }} />
                            </Form.Item>
                        </div>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                name="companyEmail"
                                className="w-full"
                            >
                                <Input size='large' placeholder='Company email' onChange={(e) => {
                                    // form.setFieldValue("companyEmail", e.target.value); 
                                    handleChange(e.target.value, setCompanyEmail)
                                }} />
                            </Form.Item>
                            <Form.Item
                                name="companyNumber"
                                className="w-full"
                            >
                                <Input size='large' placeholder="Company number" onChange={(e) => {
                                    // form.setFieldValue("companyNumber", e.target.value); 
                                    handleChange(e.target.value, setCompanyNumber)
                                }} />
                            </Form.Item>
                        </div>
                    </div>}

                    {current == 1 && <div className='text-center'>
                        <p className='text-4xl font-black'>Make sure your calculations are right</p>
                        <p className='pb-5'>This will only take 3 minutes to complete</p>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                name="currency"
                                className="w-full"
                            >
                                <Select
                                    showSearch
                                    size="large"
                                    placeholder="Select a currency"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(e) => {
                                        ;
                                        // form.setFieldValue("currency", e);
                                        handleChange(e, setCurrency)
                                    }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={currencies}
                                />
                            </Form.Item>
                            <Form.Item
                                name="timeZone"
                                className="w-full"
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a time zone"
                                    size="large"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(e) => {
                                        ;
                                        // form.setFieldValue("timeZone", e);
                                        handleChange(e, setTimeZone)
                                    }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={timeZones}
                                />
                            </Form.Item>
                        </div>
                    </div>}

                    {current == 2 && <div className='text-center'>
                        <p className='text-4xl font-black'>Make sure you get you fees</p>
                        <p className='pb-5'>This will help you capture your fees from your clients</p>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                name="bankIban"
                                className="w-full"
                            >
                                <Input
                                    size='large'
                                    placeholder="Payment Info ... this might be the IBAN, paypal or anything else"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(e) => {
                                        ;
                                        // form.setFieldValue("bankIban", e.target.value);
                                        handleChange(e.target.value, setIban)
                                    }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>}

                    {current == 3 && <div className='text-center'>
                        <p className='text-4xl font-black'>Brand Identity</p>
                        <p className='pb-5'>Putting a Face to Your Name | Upload your company logo</p>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                className="mx-auto"
                                name={"logo"}
                                required
                            >
                                <Upload
                                    beforeUpload={checkFileSize}
                                    listType="picture-card"
                                    maxCount={1}
                                    defaultFileList={[]}
                                    onChange={(e) => {

                                        if (e.fileList.length > 0) {
                                            handleChange(e, setLogo)
                                        }
                                    }}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>}

                    {current == 4 && <div className='text-center'>
                        <p className='text-4xl font-black'>Personal Touch</p>
                        <p className='pb-5'>Upload your signature to seal your deals</p>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                className="mx-auto"
                                name={"signature"}
                                required
                            >
                                <Upload
                                    beforeUpload={checkFileSize}
                                    listType="picture-card"
                                    defaultFileList={[]}
                                    maxCount={1}
                                    className=''
                                    onChange={(e) => {

                                        if (e.fileList.length > 0) {
                                            handleChange(e, setSig)
                                        }
                                    }}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>}

                    {current == 5 && <div className='text-center'>
                        <p className='text-4xl font-black'>Legal Agreements</p>
                        <p className='pb-5'>Defining the Rules</p>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                name="PTermsConditions"
                                className="w-full"
                                required
                            >
                                <TextArea rows={4} placeholder="Proposal Terms & Conditions" className="rounded-lg" onChange={(e) => handleChange(e, setPTerms)} />
                            </Form.Item>
                        </div>
                        <div className="flex gap-x-5 w-full">
                            <Form.Item
                                name="ITermsConditions"
                                className="w-full"
                                required
                            >
                                <TextArea rows={4} placeholder="Invoice Terms & Conditions" className="rounded-lg" onChange={(e) => handleChange(e, setITerms)} />
                            </Form.Item>
                        </div>
                    </div>}
                    <Form.Item>
                        {current != 5 && <button onClick={() => handleNext()} disabled={nextButton} className={`py-2 px-4 rounded-lg  text-white ${nextButton ? "bg-gray-300 hover:cursor-not-allowed hover:bg-gray-300" : "bg-blue-600 hover:bg-blue-500 hover:cursor-pointer"}`}>Next</button>}
                        {current == 5 && <button htmlType="submit" disabled={nextButton} className={`py-2 px-4 rounded-lg  text-white ${nextButton ? "bg-gray-300 hover:cursor-not-allowed hover:bg-gray-300" : "bg-blue-600 hover:bg-blue-500 hover:cursor-pointer"}`}>Submit</button>}
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"];
    let userPermission = ctx.req.cookies["userPermission"];
    try {
        if (accessToken) {

        } else {
            return {
                redirect: {
                    destination: "/401",
                    permanent: false,
                },
            };
        }
    } catch (e) {
        ;
    }
    return { props: { accessToken, userPermission } };
};