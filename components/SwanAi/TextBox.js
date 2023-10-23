import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Input } from 'antd';
import SendIcon from '@/components/SwanAi/SendIcon';
import { postAxios } from '@/functions/ApiCalls';
const { TextArea } = Input;
import { LoadingOutlined } from '@ant-design/icons';

export default function TextBox() {
    const [textInput, setTextInput] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log({ conversation })
    }, [conversation])

    const handleSend = async () => {
        setLoading(true)
        console.log("dddd");
        console.log(textInput);
        let text = {
            role: "user",
            content: textInput,
        }
        setTextInput(null)
        let data = {
            messages: [...conversation, text]
        }
        setConversation([...conversation, text])

        const url = `${process.env.DIGITALOCEAN}/company/swans-gpt/`
        let res = await postAxios(url, data, false, false)
        setTextInput(null)
        console.log({ res })
        if (res) {
            console.log(res?.data)
            const sanitizedText = DOMPurify.sanitize(res?.data?.content);
            const formattedText = sanitizedText.replace(/\n/g, '<br/>');
            res.data.content = formattedText;
            let response = [...conversation, text, res?.data]
            setConversation(response)
            setLoading(false)
        }
    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

    return (
        <div className='border rounded-lg h-full relative overflow-hidden '>
            <div className='h-[75vh] overflow-auto my-2 '>
                {conversation?.map((message, index) => {
                    return (
                        <div>
                            {message?.role === "user" ?
                                <div className='justify-end'>
                                    <p className='pl-2 pt-2 text-xs text-gray-400 sticky top-0 bg-white'>User</p>
                                    <div className='bg-mainBackground text-white rounded p-2 mx-2 mb-1 text-left'>
                                        {message?.content}
                                    </div>
                                </div>
                                :
                                <div className=' justify-start'>
                                    <p className='pl-2 pt-2 text-xs text-gray-400 sticky top-0 bg-white'>Chat GPT</p>
                                    <div dangerouslySetInnerHTML={{ __html: message?.content }} className='bg-gray-200 text-black rounded p-2 mx-2 mb-1'>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })}
                {loading &&
                    <div className=' justify-start'>
                        <p className='pl-2 pt-2 text-xs text-gray-400'>Chat GPT</p>
                        <div className='bg-gray-200 text-black rounded p-2 mx-2 mb-1'>

                            <div className="flex justify-start">
                                <div className="w-2 h-2 my-1 mx-1 bg-gray-500 rounded-full animate-bounce animation-delay-1"></div>
                                <div className="w-2 h-2 my-1 mx-1 bg-gray-500 rounded-full animate-bounce animation-delay-2"></div>
                                <div className="w-2 h-2 my-1 mx-1 bg-gray-500 rounded-full animate-bounce animation-delay-3"></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='absolute w-full bottom-0 bg-gray-100'>
                <TextArea
                    className='pr-14 py-3 '
                    bordered={false}
                    size='large'
                    placeholder="Send a message"
                    autoSize={{
                        minRows: 1,
                        maxRows: 4,
                    }}
                    onChange={(e) => setTextInput(e.target.value)}
                    value={textInput}
                />
                <button
                    className={`absolute right-4 bottom-2 ${textInput ? "bg-mainBackground hover:bg-foreignBackground cursor-pointer" : "bg-gray-400 cursor-not-allowed"} p-1 rounded`}
                    disabled={!textInput}
                    onClick={handleSend}
                >
                    <SendIcon />
                </button>
            </div>

        </div>

    );
};