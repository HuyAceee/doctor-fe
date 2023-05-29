import Button from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import Table from "components/Table";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "store/api/userApi";
import { getAllUsers } from "store/asyncThunk/user";
import { useAppDispatch, useAppSelector } from "store/hook";
import { userSelector } from "store/slices/userSlice";
import { IUserDetail } from "store/types";
import { IAction } from "types/tableType";
import { ROUTES } from "utils/constants";

interface IRenderListUserProps {
  rows: IUserDetail[];
  actions: IAction[];
}

const renderListUser = ({ actions, rows }: IRenderListUserProps) => {
  return {
    cols: [
      "table.first_name",
      "table.last_name",
      "table.gender",
      "table.phone_number",
      "table.address",
      "table.action",
    ],
    rows,
    fields: ["firstName", "lastName", "gender", "phoneNumber", "address"],
    actions,
  };
};

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userList } = useAppSelector(userSelector);
  const [idDelete, setIdDelete] = useState("");
  const [openModal, setOpenModal] = useState(false);

  console.log(openModal);

  const handleGetAllUsers = async () => {
    await dispatch(getAllUsers());
  };

  const handleEditUser = (id: string) => {
    navigate({ pathname: ROUTES.user.edit, search: `?id=${id}` });
  };

  const onDeleteUser = (id: string) => {
    setIdDelete(id);
    setOpenModal(true);
  };
  const handleDeleteUser = async () => {
    try {
      await userApi.deleteUser(idDelete);
      toast.success(t("toast.delete_success"));
      setOpenModal(false);
      await handleGetAllUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    handleGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableData = renderListUser({
    rows: userList,
    actions: [
      { name: "table.actions.edit", handle: handleEditUser },
      { name: "table.actions.delete", handle: onDeleteUser },
    ],
  });

  const deleteModalData = {
    title: "user.modal.delete_user_title",
    description: "user.modal.delete_user_description",
    actions: [
      {
        name: "user.modal.cancel",
        handle: handleCancelModal,
      },
      {
        name: "user.modal.delete",
        handle: handleDeleteUser,
      },
    ],
  };
  return (
    <div>
      {openModal && (
        <ConfirmModal data={deleteModalData} setOpenModal={setOpenModal} />
      )}
      <h1 className="text-main uppercase text-center">
        {t("home.user_management")}
      </h1>
      <div className="flex flex-row justify-end my-10">
        <Button
          onClick={() => navigate(ROUTES.user.create)}
          title="home.buttons.create_user"
        />
      </div>
      <Table data={tableData} />
    </div>
  );
};

export default UserPage;
