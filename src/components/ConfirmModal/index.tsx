import { useOnClickOutside } from "hooks/useClickOutSide";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { IAction } from "types/tableType";

interface IConfirmModalData {
  title: string;
  description: string;
  actions: IAction[];
}

interface IConfirmModalProps {
  data: IConfirmModalData;
  setOpenModal: (openModal: boolean) => void;
}

const ConfirmModal = ({ data, setOpenModal }: IConfirmModalProps) => {
  const { title, description, actions } = data;
  const { t } = useTranslation();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpenModal(false));
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
      <div className="bg-gray-500 opacity-25 w-full h-full absolute"></div>
      <div
        ref={ref}
        className="w-3/4 h-2/3 bg-white z-10 rounded-xl p-8 flex flex-col justify-between"
      >
        <div>
          <div className="pb-5 border-b uppercase">{t(title)}</div>
          <div className="py-3">{t(description)}</div>
        </div>
        <div className="flex flex-row justify-end">
          {actions.map((action, index) => {
            return (
              <button
                key={index}
                className="border-2 px-4 py-2 rounded-md border-main"
                onClick={action.handle}
                style={{ marginLeft: index ? 20 : 0 }}
              >
                {t(action.name)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
