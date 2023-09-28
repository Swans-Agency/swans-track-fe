import React from "react";
import { Modal } from "antd";

export default function ModalANTD({
  title,
  footer,
  isModalOpen,
  handleOk,
  handleCancel,
  renderComponent,
  style={top: 20}
}) {
  return (
    <Modal
      title={title}
      footer={footer}
      style={style}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {renderComponent}
    </Modal>
  );
}
