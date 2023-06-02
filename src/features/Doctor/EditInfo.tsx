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
import Loading from "components/Loading";
import markdownApi from "store/api/markdownApi";

export interface IOptionSelect {
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
  const [selectedOption, setSelectOption] = useState<IOptionSelect | null>(
    null
  );
  const [data, setData] = useState({
    doctorId: "",
    contentHTML: "",
    contentMarkdown: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

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

  const handleSaveMarkdown = async () => {
    const response = await markdownApi.handleMarkdown(data);
    console.log(response);
  };

  useEffect(() => {
    dispatch(getAllDoctors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const temp = renderListSelect().find((doctor) => {
      return doctor.id === location.state.id;
    });
    if (temp && renderListSelect().length) {
      setSelectOption(temp);
    } else {
      setSelectOption(renderListSelect()[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorList]);

  const handleGetMarkdown = async () => {
    if (selectedOption) {
      setLoading(true);
      const res: any = await markdownApi.getMarkdown({
        doctorId: selectedOption?.id,
      });
      setData(
        res.markdown || {
          doctorId: "",
          contentHTML: "",
          contentMarkdown: "",
          description: "",
        }
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMarkdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleEditorChange = ({ html, text }: IMarkdownChangeProps) => {
    setData({ ...data, contentHTML: html, contentMarkdown: text });
  };

  const onChangeDescription = (e: any) => {
    setData({ ...data, description: e.target.value });
  };

  const handleChange = (selectedOption: IOptionSelect | null) => {
    setSelectOption(selectedOption);
    if (selectedOption) setData({ ...data, doctorId: selectedOption.id });
  };

  if (loading) {
    return <Loading />;
  }

  const imageDoctor = doctorList.length
    ? doctorList.find((doctor) => doctor.id === selectedOption?.id)?.image
    : "";
  return (
    <div>
      <img
        className="aspect-[4/3] rounded-[10px] w-1/2 object-cover mb-10"
        src={imageDoctor || ""}
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
        defaultValue={data.contentMarkdown}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <Button onClick={handleSaveMarkdown} title="Save" />

      <div dangerouslySetInnerHTML={{ __html: data.contentHTML || "" }}></div>
    </div>
  );
};

export default EditInfo;
