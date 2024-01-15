/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ModalComponent from "./ModalComponent";
import { addItemsToList, checkItemStatus, getLists } from "@/libs/api/lists";
import { List } from "@/models/lists";
import { User } from "@/models/user";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  itemId: number;
  itemType: "movie" | "tv";
  title: string;
  user: User;
};

const AddToListModal: FC<Props> = ({
  modalIsOpen,
  setModalIsOpen,
  itemId,
  itemType,
  title,
  user,
}) => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedList, setSelectedList] = useState<string>("1");
  const [itemStatus, setItemStatus] = useState<boolean>(false);

  const router = useRouter();

  const fetchLists = async () => {
    const res = await getLists();
    const listsResponse = res.results;
    listsResponse.unshift({
      id: "1",
      name: "Créer une nouvelle liste",
    });
    setLists(listsResponse);
  };

  useEffect(() => {
    if (user.username) fetchLists();
  }, [user]);

  useEffect(() => {
    if (selectedList !== "1") {
      fetchItemStatus();
    }
    if (selectedList === "1") {
      setItemStatus(false);
    }
  }, [selectedList]);

  const handleSelectionChange = (e: any) => {
    setSelectedList(e.target.value);
  };

  const fetchItemStatus = async () => {
    const res = await checkItemStatus(Number(selectedList), itemId, itemType);
    console.log(res);
    if (!res?.success) setItemStatus(false);
    else {
      setItemStatus(true);
    }
  };

  const onValidate = async () => {
    if (itemStatus) {
      toast.error("Cet élément est déjà présent dans la liste sélectionnée");
    }
    if (selectedList === "1") {
      setModalIsOpen(false);
      setItemStatus(false);
      setSelectedList("1");
      router.push("/profil/lists/create");
    }
    if (!itemStatus && selectedList !== "1") {
      const items = [{ media_type: itemType, media_id: itemId }];
      const responseAddToList = await addItemsToList(
        Number(selectedList),
        items,
      );
      if (responseAddToList.success) {
        toast.success("L'élément a bien été ajouté à la liste");
      } else {
        toast.error(
          `Une erreur est survenue : ${responseAddToList.status_message}`,
        );
      }
      setModalIsOpen(false);
      setItemStatus(false);
      setSelectedList("1");
    }
  };

  const onClose = () => {
    setModalIsOpen(false);
    setItemStatus(false);
    setSelectedList("1");
  };

  return (
    <ModalComponent
      modalIsOpen={modalIsOpen}
      itemId={itemId}
      title={title}
      onValidate={onValidate}
      onClose={onClose}
    >
      <div>
        <Select
          placeholder="Ajouter à une liste"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedList]}
          onChange={handleSelectionChange}
          label="Liste sélectionnée"
        >
          {lists.map((list) => (
            <SelectItem key={list.id} value={list.id}>
              {list.name}
            </SelectItem>
          ))}
        </Select>
        {itemStatus ? (
          <p className="p-2 text-xs text-red-800">
            Cet élément est déjà présent dans la liste sélectionnée
          </p>
        ) : null}
      </div>
    </ModalComponent>
  );
};

export default AddToListModal;
