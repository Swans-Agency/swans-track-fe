import { deleteAxios, getAxios } from "@/functions/ApiCalls";
import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import GridMembers from "./GridMembers";
import TableMembers from "./TableMembers";
import ViewButtons from "./ViewButtons";
import AdminUserForm from "./AdminUserForm";

export default function TeamTable() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamView, setTeamView] = useState("Grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState();
  const [reloadData, setReloadData] = useState();

  const showModalUpdate = (item) => {
    setTimeout(() => setUpdateItem(item), 100);
    setIsModalOpenUpdate(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTeamMembers();
  }, [reloadData]);

  const getTeamMembers = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/list-employees/`;
    let data = await getAxios(url);
    setTeamMembers(data);
  };

  const deleteTeamMember = async (data) => {
    const url = `${process.env.DIGITALOCEAN}/account/signup/${data.id}`;
    await deleteAxios(url);
    setReloadData({ data: "data" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-maincl mb-3">Team Members</h1>
      <ViewButtons setTeamView={setTeamView} showModal={showModal} />
      {teamView == "Grid" && (
        <GridMembers
          setReloadData={setReloadData}
          teamMembers={teamMembers}
          deleteTeamMember={deleteTeamMember}
          showModal={showModalUpdate}
        />
      )}
      {teamView == "Table" && (
        <TableMembers
          setReloadData={setReloadData}
          teamMembers={teamMembers}
          deleteTeamMember={deleteTeamMember}
          showModal={showModalUpdate}
        />
      )}
      <CreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setReloadData={setReloadData}
      />
      {updateItem && (
        <AdminUserForm
          isModalOpenUpdate={isModalOpenUpdate}
          setIsModalOpenUpdate={setIsModalOpenUpdate}
          updateItem={updateItem}
          setUpdateItem={setUpdateItem}
          setReloadData={setReloadData}
          reloadData={reloadData}
        />
      )}
    </div>
  );
}
