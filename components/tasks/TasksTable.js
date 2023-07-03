import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import TableHead from "./TableHead";

export default function TasksTable({
  id,
  bgColor,
  tableType,
  marginTop,
  data,
  handleDragStart,
  handleDrop,
  handleDragOver,
  paddingBottom,
  showModal,
  setItemsToDelete,
  itemsToDelete,
}) {
  const [hideList, setHideList] = useState("");
  const [numberTasks, setNumberTasks] = useState(data?.length);

  useEffect(() => {
    setNumberTasks(data?.length);
  }, [data]);

  const handleShowList = () => {
    if (hideList == "") {
      setHideList("hidden");
    } else if (hideList == "hidden") {
      setHideList("");
    }
  };

  return (
    <>
      {data?.length !== 0 && (
        <div
          className={`relative overflow-x-auto max-h-[300px] ${marginTop} ${paddingBottom}`}
        >
          <table className="w-full text-[0.7rem] text-gray-500 text-center">
            <thead className="text-[0.7rem] text-gray-700 border-b uppercase sticky top-0 left-0">
              <TableHead
                handleShowList={handleShowList}
                hideList={hideList}
                bgColor={bgColor}
                tableType={tableType}
                numberTasks={numberTasks}
              />
            </thead>
            <tbody
              className={`${hideList}`}
              onDrop={(event) => handleDrop(event, id)}
              onDragOver={(event) => handleDragOver(event)}
            >
              {data?.map((item, index) => {
                return (
                  <TableRow
                    setItemsToDelete={setItemsToDelete}
                    itemsToDelete={itemsToDelete}
                    item={item}
                    handleDragStart={handleDragStart}
                    index={index}
                    showModal={showModal}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
