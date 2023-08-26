import React from 'react';

import { PlusOutlined, QuestionOutlined } from "@ant-design/icons";
import { DatePicker, Divider, FloatButton, Form, Input, Upload, notification } from "antd";

export default function FloatButtonJS(url) {
  return (
      <FloatButton type="primary" icon={<QuestionOutlined />} onClick={() => {
          return(
            notification.info({
              message: "Public Profile",
              description: <div>Share your profile with others by using this link: <a
                  href={url}
                  className="text-blue-500 hover:text-blue-400 "
              >{url}</a></div>,
              key: "api",
          }))
      }} style={{ bottom: 20 }} />
  );
};