import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllDoctors } from "store/asyncThunk/doctor";
import { useAppDispatch, useAppSelector } from "store/hook";
import { doctorSelector } from "store/slices/doctorSlice";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Button from "components/Button";
import { convertImageFromBuffer } from "utils/functions";
import Loading from "components/Loading";
import markdownApi from "store/api/markdownApi";
import { getMarkdown } from "store/asyncThunk/markdown";

interface IOption {
  value: string;
  label: string;
  id: string;
}

interface IMarkdownChangeProps {
  text: string;
  html: string;
}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const EditInfo = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { doctorList } = useAppSelector(doctorSelector);
  const [selectedOption, setSelectOption] = useState<IOption | null>(null);
  const [data, setData] = useState({
    doctorId: "",
    contentHTML: "",
    contentMarkdown: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  const renderListSelect = (): IOption[] => {
    const result = doctorList.map((doctor) => {
      return {
        value: doctor.id,
        label: doctor.firstName + " " + doctor.lastName,
        id: doctor.id,
      };
    });
    return result;
  };

  const handleSaveMarkdown = async () => {
    const response = await markdownApi.handleMarkdown(data);
    console.log(response);
  };

  useEffect(() => {
    dispatch(getAllDoctors());
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const temp = renderListSelect().find((doctor) => {
      return doctor.id === location.state.id;
    });
    if (temp && renderListSelect().length) {
      setSelectOption(temp);
      setData({ ...data, doctorId: temp.id });
    } else {
      setSelectOption(renderListSelect()[0]);
      setData({ ...data, doctorId: renderListSelect()[0].id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorList]);

  useEffect(() => {
    dispatch(
      getMarkdown({
        doctorId: selectedOption?.id,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleEditorChange = ({ html, text }: IMarkdownChangeProps) => {
    setData({ ...data, contentHTML: html, contentMarkdown: text });
  };

  const onChangeDescription = (e: any) => {
    setData({ ...data, description: e.target.value });
  };

  const handleChange = (selectedOption: IOption | null) => {
    setSelectOption(selectedOption);
    if (selectedOption) setData({ ...data, doctorId: selectedOption.id });
  };

  if (loading) {
    return <Loading />;
  }

  const imageDoctor = convertImageFromBuffer(
    doctorList.length
      ? doctorList.find((doctor) => doctor.id === selectedOption?.id)?.image
      : "1"
  );

  return (
    <div>
      <img
        className="aspect-[4/3] rounded-[10px] w-1/2 object-cover mb-10"
        src={imageDoctor}
        alt=""
      />
      <div className="mb-10">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={renderListSelect()}
        />
      </div>
      <textarea
        value={data.description}
        onChange={onChangeDescription}
        className="mb-10"
      />
      <MdEditor
        style={{ height: "500px" }}
        className="mb-10"
        defaultValue={
          'Bác sĩ **Đỗ Văn Anh**\n\n```\nexport const helloWorld = () => {\n   return "Hello World"\n}\n```\n'
        }
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <Button onClick={handleSaveMarkdown} title="Save" />
    </div>
  );
};

export default EditInfo;
