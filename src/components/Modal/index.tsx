import { useOnClickOutside } from "hooks/useClickOutSide";
import { useRef } from "react";

interface IConfirmModalProps {
  setOpenModal: (openModal: boolean) => void;
  children: JSX.Element;
}

const ModalComponent = ({ setOpenModal, children }: IConfirmModalProps) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpenModal(false));
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-10">
      <div className="bg-gray-500 opacity-25 w-full h-full absolute"></div>
      <div
        ref={ref}
        className="w-3/4 h-2/3 bg-white z-10 rounded-xl p-8 flex flex-col justify-between"
      >
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
