import Select from "react-select";
import { useState, useEffect } from "react";
import { useAppSelector } from "store/hook";
import { doctorSelector } from "store/slices/doctorSlice";
import { IOptionSelect } from "features/Doctor/EditInfo";
import clsx from "clsx";
import moment from "moment";
import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import allCodeApi from "store/api/allCodeApi";
import { EAllCodeType, ICode } from "types/allCodeType";
import doctorApi from "store/api/doctorApi";
import Button from "components/Button";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const MedicalExaminationPlan = () => {
  const { t } = useTranslation();
  const { doctorList } = useAppSelector(doctorSelector);
  const [selectedOption, setSelectOption] = useState<IOptionSelect | null>(
    null
  );
  const [data, setData] = useState({
    doctorId: "",
    date: new Date(moment().format("DD-MM-YYYY")).getTime(),
  });
  const [selectData, setSelectData] = useState<string[]>([]);
  const [times, setTimes] = useState<ICode[]>([]);
  const [checkSoldOut, setCheckSoldOut] = useState<string[]>([]);

  const renderListSelect = (): IOptionSelect[] => {
    const result = doctorList.map((doctor) => {
      return {
        value: doctor.id,
        label: doctor.firstName + " " + doctor.lastName,
        id: doctor.id,
      };
    });
    return result;
  };

  const handleChooseTime = (keyMap: string) => {
    const temp = [...selectData];
    if (temp.includes(keyMap)) {
      const temp1 = temp.filter((i) => i !== keyMap);
      setSelectData(temp1);
    } else {
      setSelectData([...selectData, keyMap]);
    }
  };

  const handleChange = (selectedOption: IOptionSelect | null) => {
    setSelectOption(selectedOption);
    if (selectedOption) setData({ ...data, doctorId: selectedOption.id });
  };

  const handleGetTimeCode = async () => {
    const res = await allCodeApi.getAllCode({ type: EAllCodeType.TIME });
    setTimes(res.allCode);
  };

  const handleGetSchuduleDoctorInDate = async () => {
    try {
      const res = await doctorApi.getScheduleInDate({
        doctorId: data.doctorId,
        date: data.date,
      });
      const temp = res.schedules.map((i: any) => i.timeType);
      setCheckSoldOut(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const temp = selectData.map((timeType) => {
        return {
          ...data,
          timeType,
        };
      });
      const res = await doctorApi.createSchedule(temp);
      if (res.statusCode === 200) {
        toast.success(t("toast.create_success"));
        handleGetSchuduleDoctorInDate();
        setSelectData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetTimeCode();
  }, []);

  useEffect(() => {
    if (data.date && data.doctorId) handleGetSchuduleDoctorInDate();
    setSelectData([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (renderListSelect().length) {
      setSelectOption(renderListSelect()[0]);
      setData({ ...data, doctorId: renderListSelect()[0].id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorList]);
  return (
    <div>
      <Select
        className="mb-10"
        value={selectedOption}
        onChange={handleChange}
        options={renderListSelect()}
      />
      <Flatpickr
        className="mb-10 rounded-sm !px-2 cursor-pointer"
        value={data.date}
        onChange={([date]) => {
          setData({ ...data, date: new Date(date).getTime() });
        }}
      />
      <div className="grid grid-cols-6 gap-2 mb-10 p-5 border-main rounded-md border">
        {times.map((time, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                !checkSoldOut.includes(time.keyMap) &&
                handleChooseTime(time.keyMap)
              }
              className={clsx(
                "border rounded-sm py-4 px-2 inline-block max-w-[200px] text-center cursor-pointer",
                {
                  "bg-main text-white": [
                    ...selectData,
                    ...checkSoldOut,
                  ].includes(time.keyMap),
                  "opacity-50": checkSoldOut.includes(time.keyMap),
                }
              )}
            >
              {time.valueEn}
            </div>
          );
        })}
      </div>
      <Button
        title="Send"
        onClick={handleSubmit}
        disabled={!selectData.length}
      />
    </div>
  );
};

export default MedicalExaminationPlan;
