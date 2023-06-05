import { IOptionSelect } from "features/Doctor/EditInfo";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useAppSelector } from "store/hook";
import { doctorSelector } from "store/slices/doctorSlice";
import { messageError } from "utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { checkArrayInvalid } from "utils/functions";
import TextInput from "components/TextInput";
import Button from "components/Button";
import allCodeApi from "store/api/allCodeApi";
import { EAllCodeType, ICode } from "types/allCodeType";
import clsx from "clsx";

interface IFieldInput {
  name: string;
  field: "email";
}

const pathLang = "user.form.";
const listFields: IFieldInput[] = [
  {
    name: pathLang + "email",
    field: "email",
  },
];

interface IFormikInit {
  email: string;
}

const initialValues: IFormikInit = {
  email: "",
};

const BookingForm = () => {
  const [data, setData] = useState({
    doctorId: "",
    email: "",
  });
  const [times, setTimes] = useState<ICode[]>([]);
  const [timeType, setTimeType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { doctorList } = useAppSelector(doctorSelector);
  const [selectedOption, setSelectOption] = useState<IOptionSelect | null>(
    null
  );

  const handleChange = (selectedOption: IOptionSelect | null) => {
    setSelectOption(selectedOption);
    if (selectedOption) setData({ ...data, doctorId: selectedOption.id });
  };

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

  const handleCreateBooking = (values: IFormikInit) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().required(messageError).email(messageError),
    }),
    onSubmit: async (values) => {
      if (!checkArrayInvalid([values.email, timeType])) {
        setLoading(true);
        handleCreateBooking(values);
        try {
        } catch (err) {}
      }
    },
  });

  const handleGetTimeCode = async () => {
    const res = await allCodeApi.getAllCode({ type: EAllCodeType.TIME });
    setTimes(res.allCode);
  };

  const handleChooseTime = (newTimeType: string) => {
    if (timeType === newTimeType) {
      setTimeType("");
      return;
    }
    setTimeType(newTimeType);
  };

  useEffect(() => {
    setSelectOption(renderListSelect()[0]);
    handleGetTimeCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorList]);
  return (
    <div>
      <div className="mb-10">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={renderListSelect()}
        />
      </div>
      {listFields.map((field, index) => {
        return (
          <TextInput
            key={index}
            name={field.field}
            onChange={formik.handleChange}
            placeholder={field.name}
            value={formik.values[field.field]}
            error={Boolean(
              formik.touched[field.field] && formik.errors[field.field]
            )}
            errorMessage={formik.errors[field.field]}
          />
        );
      })}
      <div className="grid grid-cols-6 gap-2 mb-10 p-5 border-main rounded-md border">
        {times.map((time, index) => {
          return (
            <div
              key={index}
              onClick={() => handleChooseTime(time.keyMap)}
              className={clsx(
                "border rounded-sm py-4 px-2 inline-block max-w-[200px] text-center cursor-pointer",
                {
                  "bg-main text-white": timeType === time.keyMap,
                }
              )}
            >
              {time.valueEn}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-end">
        <Button
          className="!min-w-[150px]"
          onClick={formik.handleSubmit}
          title={pathLang + "create"}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BookingForm;
