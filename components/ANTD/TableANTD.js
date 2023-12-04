import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import { Empty, Pagination, Table } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import DrawerANTD from "./DrawerANTD";
import ModalANTD from "./ModalANTD";


export default function TableANTD({
  columns,
  getUrl,
  multiDeleteUrl,
  addButton,
  buttonTitle,
  addDrawer,
  drawerTitle,
  drawerContent,
  updateModal,
  updateTitle,
  updateFooter,
  isModalOpenUpdate,
  handleOkUpdate,
  handleCancelUpdate,
  modalContent,
  passedItem,
  additionalGet = false,
  customClass = "",
}) {

  const [data, setData] = useState({});
  const [reload, setReload] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page = 1, pageSize = 10) => {
    try {
      const response = await getAxios(
        `${getUrl}?page=${page}`,
        false,
        false,
        () => { }
      );
      const keyData = response?.results?.map((item) => {
        return { ...item, key: item.id };
      });
      response.results = keyData;
      setData(response);
      setPagination({
        current: page,
        pageSize,
        total: response.count,
      });
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  useEffect(() => {
    fetchData();
  }, [additionalGet]);

  const handlePaginationChange = (page, pageSize) => {
    fetchData(page, pageSize);
  };

  const onSelectChange = (newSelectedRowKeys) => {

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record?.permission === 'Admin',
      // Column configuration not to be checked
      name: record?.permission,
    }),
  };

  const handleMultDelete = async (arr) => {

    let deleted = await postAxios(multiDeleteUrl, { ids: arr }, true, true, (res) => { setReload(res) }, true)
    setReload({ "dd": deleted })
    setSelectedRowKeys([])
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="mt-2">
      {
        addButton &&
        <div className="flex justify-end mb-3 gap-x-3">
          {
            (selectedRowKeys.length > 0) && (multiDeleteUrl) &&
            <div
              className=" w-full bg-red-700 hover:shadow-lg text-white py-[0.6rem] px-3 rounded-lg text-center cursor-pointer"
              onClick={() => handleMultDelete(selectedRowKeys)}
            >
              Delete {selectedRowKeys.length} {selectedRowKeys.length > 1 ? "items" : "item"}
            </div>
          }
          <button
            onClick={showDrawer}
            className="min-w-fit flex justify-center items-center gap-x-2 bg-mainBackground dark:bg-[#1d1d1d] hover:shadow-lg hover:dark:shadow-sm hover:dark:shadow-[#1d1d1d] text-white rounded-lg py-[0.6rem] px-3"
          >
            {buttonTitle}
          </button>

        </div>
      }
      {data?.count ? (
        <>
          <Table
            className={`w-full ${customClass} `}
            columns={columns}
            dataSource={data?.results}
            pagination={false}
            size="small"
            rowSelection={((cookie.load("userPermission", { path: "/" }) !== "Employee") && multiDeleteUrl) ? rowSelection : null}
            style={{
              overflowX: "auto",
            }}
          />
          <div className="flex justify-end">
            <Pagination
              className="mt-2 "
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 200,
            }} description={"No data found!"} />
        </div>
      )}
      {
        addDrawer &&
        <DrawerANTD
          title={drawerTitle}
          onClose={onClose}
          open={open}
          children={drawerContent(setReload, onClose)}
        />
      }
      {
        updateModal && passedItem &&
        <ModalANTD
          title={updateTitle}
          footer={updateFooter}
          isModalOpen={isModalOpenUpdate}
          handleOk={handleOkUpdate}
          handleCancel={handleCancelUpdate}
          renderComponent={modalContent(setReload)}
        />
      }
    </div>
  );
}
