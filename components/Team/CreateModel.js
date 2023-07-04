
import { postAxios } from '@/functions/ApiCalls';
import { Button, Form, Input, Modal, Select, Option, Drawer } from 'antd';
import { useRouter } from 'next/router';
import FormButtons from '../ANTD/FormButtons';


export default function CreateModal({ isModalOpen, setIsModalOpen, setReloadData }) {
    const [form] = Form.useForm();
    const router = useRouter();

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (data) => {
        console.log(data)
        const url = `${process.env.DIGITALOCEAN}/account/signup/`
        await postAxios(url, data, true, true)
        setReloadData({ "data": "dataq" })
    }

    return (
        <>
            <Drawer  width="600" placement="right" title="Create New Team Member" open={isModalOpen} onOk={handleOk} onClose={handleCancel} footer={null}>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        alignContent: "center",
                        maxWidth: 600,
                    }}
                    form={form}
                >
                    <div className='flex gap-x-5 w-full'>
                        <Form.Item label="E-mail" name="username" rules={[
                            {
                                type: 'email',
                            },
                        ]} required className='w-full'>
                            <Input className='rounded' />
                        </Form.Item>
                        <Form.Item label="Permission" name="permission" required className='w-full'>
                            <Select 
                            options={[
                                {
                                    value: "Employee",
                                    label: "Employee",
                                },
                                {
                                    value: "Supervisor",
                                    label: "Supervisor"
                                },
                            ]} />
                        </Form.Item>
                    </div>
                    <div className='text-xs font-light tracking-wide text-black'>
                        <p>* Employee | Restricted access, can't edit company and account settings.</p>
                        <p>* Supervisor | Full access, can edit company and account settings.</p>
                    </div>

                    <div className='flex gap-x-5 w-full justify-end'>
                        <Form.Item>
                            <FormButtons content="Save" />
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};