import React from "react";
import { Modal } from "antd";

export default function ModalANTD({
  title,
  footer,
  isModalOpen,
  handleOk,
  handleCancel,
  renderComponent,
}) {
  return (
    <Modal
      title={title}
      footer={footer}
      style={{
        top: 20,
      }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {renderComponent}
    </Modal>
  );
}
