import React, { useEffect, useState } from "react";
import ClientTable from "./ClientTable";
import { getAxios, deleteAxios } from "@/functions/ApiCalls";
import { UserAddOutlined } from "@ant-design/icons";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";

export default function ClientView({ userPermission }) {
  const [clientsData, setClientsData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateClient, setUpdateClient] = useState();
  const [reloadData, setReloadData] = useState();

  useEffect(() => {
    getClientsData();
  }, [reloadData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalUpdate = (item) => {
    setTimeout(() => setUpdateClient(item), 100);
    setIsModalOpenUpdate(true);
    console.log(item, "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
  };

  const getClientsData = async () => {
    const url = `${process.env.DIGITALOCEAN}/client/get-clients/`;
    setClientsData(await getAxios(url));
  };

  const deleteTeamMember = async (data) => {
    const url = `${process.env.DIGITALOCEAN}/client/edit-client/${data.id}`;
    await deleteAxios(url);
    setReloadData({});
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-maincl mb-3">Clients List</h1>
      <div className="flex justify-end">
        <button
          onClick={showModal}
          className="flex gap-x-2 bg-sidebarbg hover:bg-secondbg text-white rounded py-[0.4rem] px-3 hover:shadow-xl "
        >
          <UserAddOutlined className=" pt-1" />
          Add client
        </button>
      </div>
      <ClientTable
        setReloadData={setReloadData}
        clientsData={clientsData}
        deleteTeamMember={deleteTeamMember}
        showModal={showModalUpdate}
        userPermission={userPermission}
      />
      <CreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setReloadData={setReloadData}
      />
      {updateClient && (
        <UpdateModal
          isModalOpen={isModalOpenUpdate}
          setIsModalOpen={setIsModalOpenUpdate}
          updateClient={updateClient}
          setUpdateClient={setUpdateClient}
          setReloadData={setReloadData}
        />
      )}
    </div>
  );
}
