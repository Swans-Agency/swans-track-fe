import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Form, Input, Select, Upload } from 'antd';
import { useRouter } from 'next/router';
import FormButtons from '../ANTD/FormButtons';
import { getAxios, postAxios } from '@/functions/ApiCalls';
import { saveToLocal, timeZones } from '@/functions/GeneralFunctions';


export default function CompanyPreferencesForm() {
    const [invoiceTemplates, setInvoiceTemplates] = useState([])
    const [quotationTemplates, setQuotationTemplates] = useState([])
    const [disabledSelectCurrency, setDisabledCurrency] = useState(false)
    const [reloadData, setReloadData] = useState()
    const router = useRouter();
    const [form] = Form.useForm();
    let logoPicList = []
    let signaturePicList = []
    const { TextArea } = Input;


    useEffect(() => {
        getUserInitialData()
        getInvoiceTemplates()
    }, [reloadData])

    const getUserInitialData = async () => {
        const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`
        let data = await getAxios(url)
        console.log(data);
        if (data) {
            if (data[0]) {
                data[0].logo = data[0]?.logo?.split("?")[0]
                if (logoPicList?.length < 1) {
                    logoPicList?.push({
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data[0]?.logo,
                    })
                }
                data[0].signature = data[0]?.signature?.split("?")[0]
                if (signaturePicList?.length < 1) {
                    signaturePicList.push({
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data[0]?.signature,
                    })
                }
                form.setFieldsValue(data[0])
                data[0].currency ? setDisabledCurrency(true) : setDisabledCurrency(false)
            }
        }
    }

    const getInvoiceTemplates = async () => {
        const invoiceURL = `${process.env.DIGITALOCEAN}/account/invoice-templates/`
        const quotationURL = `${process.env.DIGITALOCEAN}/account/quotation-templates/`
        let invoiceData = await getAxios(invoiceURL)
        let quotationData = await getAxios(quotationURL)
        setInvoiceTemplates(invoiceData)
        setQuotationTemplates(quotationData)
    }

    const onFinish = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('bankIban', data.bankIban);
        formData.append('item.timeZone', data.timeZone);
        formData.append('item.currency', data.currency);
        formData.append('position', data.position);
        formData.append('companyName', data.companyName);
        formData.append('companyLocation', data.companyLocation);
        formData.append('companyNumber', data.companyNumber);
        formData.append('companyEmail', data.companyEmail);
        formData.append('PTermsConditions', data.PTermsConditions);
        formData.append('ITermsConditions', data.ITermsConditions);
        // formData.append('invoiceTemplate', data.invoiceTemplate);
        // formData.append('proposalTemplate', data.proposalTemplate);
        formData.append('CLIQ', data.CLIQ);

        if (data.logo && data.logo.file) {
            formData.append('logo', data.logo.file.originFileObj);
        }
        if (data.signature && data.signature.file) {
            formData.append('signature', data.signature.file.originFileObj);
        }
        const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`
        let companyPrefernceSavedData = await postAxios(url, formData)
        saveToLocal("companyPreferences", companyPrefernceSavedData)
        setReloadData({});
    }

    return (
        <div className='text-textIcons'>
            <h1 className='text-2xl font-bold text-maincl'>Company Preferences</h1>
            <Form
                onFinish={onFinish}
                layout="vertical"
                style={{
                    alignContent: "center",
                    
                }}
                className="custom-form desktop:max-w-[600px]"
                form={form}
                requiredMark={true}
            >
                <div className='flex gap-x-5 w-full mt-4'>
                    <Form.Item label="Company logo" className='mt-4' name={"logo"} required>
                        <Upload
                            listType="picture-circle"
                            maxCount={1}
                            defaultFileList={logoPicList}
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
                    <Form.Item label="Signature" className='mt-4' name={"signature"} required>
                        <Upload
                            listType="picture-circle"
                            maxCount={1}
                            defaultFileList={signaturePicList}
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
                <div className='flex gap-x-5 w-full'>
                    <Form.Item label="Company name" name="companyName" className='w-full' required>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label="Company address" name="companyLocation" className='w-full' required>
                        <Input className='rounded' />
                    </Form.Item>
                </div>
                <div className='flex gap-x-5 w-full'>
                    <Form.Item label="Company email" name="companyEmail" className='w-full' required>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label="Company number" name="companyNumber" className='w-full' required>
                        <Input className='rounded' />
                    </Form.Item>
                </div>
                <div className='flex gap-x-5 w-full'>
                    <Form.Item label="Currency" name="currency" className='w-full' required>
                        <Select
                            disabled={disabledSelectCurrency}
                            showSearch
                            defaultValue=""
                            style={{
                                width: "100%",
                            }}
                            onChange={(e) => { console.log(e); form.setFieldValue('currency', e) }}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: 'JD',
                                    label: 'JD',
                                },
                                {
                                    value: 'KD',
                                    label: 'KD',
                                },
                                {
                                    value: 'EUR',
                                    label: 'EUR',
                                },
                                {
                                    value: 'USD',
                                    label: 'USD',
                                },
                                {
                                    value: 'GBP',
                                    label: 'GBP',
                                },
                                {
                                    value: 'AED',
                                    label: 'AED',
                                },
                                {
                                    value: 'RS',
                                    label: 'RS',
                                },
                                {
                                    value: 'TL',
                                    label: 'TL',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Time zone" name="timeZone" className='w-full' required>
                        <Select
                            showSearch
                            defaultValue=""
                            style={{
                                width: "100%",
                            }}
                            onChange={(e) => { console.log(e); form.setFieldValue('timeZone', e) }}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={timeZones}
                            getPopupContainer={(trigger) => {
                                const parent = trigger.parentElement;
                                console.log(parent.classList);
                                parent.classList.add("custom-select-picker");
                                return parent;
                            }}
                        />
                    </Form.Item>
                </div>
                <div className='flex gap-x-5 w-full'>
                    <Form.Item label="IBAN" name="bankIban" className='w-full' required>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label="CLIQ" name="CLIQ" className='w-full' required>
                        <Input className='rounded' />
                    </Form.Item>
                </div>
                <Form.Item label="Proposals Terms & Conditons" name="PTermsConditions" className='w-full' required>
                    <TextArea rows={4} className='rounded' />
                </Form.Item>
                <Form.Item label="Invoices Terms & Conditons" name="ITermsConditions" className='w-full' required>
                    <TextArea rows={4} className='rounded' />
                </Form.Item>
                {/* <Form.Item label="Invoice Template" name={"invoiceTemplate"} defaultValue={form.getFieldValue("invoiceTemplate")} required>
                    <Radio.Group value={form}>
                        {invoiceTemplates?.map((item, index) => {
                            return (
                                <Radio value={`${item.id}`} key={index}><Image width={150} src={item?.image.split("?")[0]} className='border' /></Radio>
                            )
                        })}
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Quotation Template" name={"proposalTemplate"} defaultValue={form.getFieldValue("proposalTemplate")} required>
                    <Radio.Group value={form}>
                        {quotationTemplates?.map((item, index) => {
                            return (
                                <Radio value={`${item.id}`} key={index}><Image width={150} src={item?.image.split("?")[0]} className='border' /></Radio>
                            )
                        })}
                    </Radio.Group>
                </Form.Item> */}
                <Divider />
                <div className='flex gap-x-5 w-full justify-end'>
                    <Form.Item>
                        <FormButtons content={"save"} />
                    </Form.Item>
                </div>
            </Form>
        </div>

    );
};