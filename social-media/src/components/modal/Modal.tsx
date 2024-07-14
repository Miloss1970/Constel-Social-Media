import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  show: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, closeModal, children }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-30"
      ></div>

      <div className="relative z-[40] bg-white  rounded-lg">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
