import Button from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import Table from "components/Table";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "store/api/userApi";
import { getAllDoctors } from "store/asyncThunk/doctor";
import { useAppDispatch, useAppSelector } from "store/hook";
import { doctorSelector } from "store/slices/doctorSlice";
import { IAction } from "types/tableType";
import { ROUTES } from "utils/constants";

interface IRenderListUserProps {
  rows: any[];
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

const DoctorPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { doctorList } = useAppSelector(doctorSelector);
  const [idDelete, setIdDelete] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleGetAll = async () => {
    await dispatch(getAllDoctors());
  };

  const handleEditUser = (id: string) => {
    navigate({
      pathname: ROUTES.system.user.edit,
      search: `?${createSearchParams({ id })}`,
    });
  };

  const handleEditInfo = (id: string) => {
    navigate(ROUTES.system.doctor.edit_info, {
      state: {
        id: id,
      },
    });
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
      await handleGetAll();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    handleGetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableData = renderListUser({
    rows: doctorList,
    actions: [
      { name: "table.actions.edit", handle: handleEditUser },
      { name: "table.actions.edit_info", handle: handleEditInfo },
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
        {t("home.doctor_management")}
      </h1>
      <div className="flex flex-row justify-end my-10">
        <Button
          onClick={() => navigate(ROUTES.system.user.create)}
          title="home.buttons.create_user"
        />
      </div>
      <Table data={tableData} />
    </div>
  );
};

export default DoctorPage;
