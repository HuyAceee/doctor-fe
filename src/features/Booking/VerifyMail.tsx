import Button from "components/Button";
import React from "react";
import { useSearchParams } from "react-router-dom";
import bookingApi from "store/api/bookingApi";
import { IUpdateBookingStatusBody } from "store/asyncThunk/types";

const VerifyMail = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";
  const token = searchParams.get("token") || "";
  const handleConfirm = async () => {
    const body: IUpdateBookingStatusBody = {
      doctorId,
      token,
      statusId: "S2",
    };
    const response = await bookingApi.updateBookingStatus(body);
    console.log(response);
  };
  const handleCancel = async () => {
    const body: IUpdateBookingStatusBody = {
      doctorId,
      token,
      statusId: "S3",
    };
    const response = await bookingApi.updateBookingStatus(body);
    console.log(response);
  };
  return (
    <div>
      <span>Vui lòng xác nhận lịch hẹn hoặc hủy lịch hẹn:</span>
      <div>
        <Button onClick={handleConfirm} title="Xác nhận" />
        <Button onClick={handleCancel} title="Hủy lịch hẹn" />
      </div>
    </div>
  );
};

export default VerifyMail;
