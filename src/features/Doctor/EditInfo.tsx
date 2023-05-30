import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllDoctors, getDoctorInfo } from "store/asyncThunk/doctor";
import { useAppDispatch, useAppSelector } from "store/hook";
import { doctorSelector } from "store/slices/doctorSlice";

interface IOption {
  value: string;
  label: string;
  id: string;
}

const EditInfo = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { doctorList } = useAppSelector(doctorSelector);
  const [selectedOption, setSelectOption] = useState<IOption | null>(null);

  const renderListSelect = (): IOption[] => {
    const result = doctorList.map((doctor) => {
      return {
        value: doctor.firstName + " " + doctor.lastName,
        label: doctor.firstName + " " + doctor.lastName,
        id: doctor.id,
      };
    });
    return result;
  };

  useEffect(() => {
    dispatch(getAllDoctors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const temp = renderListSelect().find((doctor) => {
      return doctor.id === location.state.id;
    });
    if (temp) {
      setSelectOption(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorList]);

  useEffect(() => {
    if (selectedOption?.id) {
      dispatch(getDoctorInfo({ id: selectedOption?.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleChange = (selectedOption: IOption | null) => {
    setSelectOption(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={renderListSelect()}
      />
    </div>
  );
};

export default EditInfo;
