"use client";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IoIosClose } from "react-icons/io";

interface FormPopupProps {
  onClose?: () => void;
  children: ReactNode;
  title: string;
  width?: string;
}

export interface PopupHandle {
  open: () => void;
  close: () => void;
}

const Popup = forwardRef<PopupHandle, FormPopupProps>(
  ({ width, children, title, onClose }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const handlePopupClose = () => {
      setIsOpen(false);
      onClose?.();
    };

    // Close the popup if clicked outside the popup content
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popupRef.current &&
          !popupRef.current.contains(event.target as Node)
        ) {
          handlePopupClose();
        }
      };

      if (isOpen) {
        document.addEventListener("click", handleClickOutside);
      } else {
        document.removeEventListener("click", handleClickOutside);
      }

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
      <div
        className={`fixed inset-0 flex justify-center items-center z-50 
    transition-colors ${isOpen ? "visible bg-slate-900/40" : "invisible"}`}
      >
        <div
          className={`bg-white rounded-lg shadow px-5 py-5
        transition-all
        ${isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"} `}
          style={{ width: width ?? "700px", height: "600px" }} // Fixed width and height
          ref={popupRef}
        >
          <div className="flex justify-between items-center text-lg font-bold text-secondary-dark sticky top-0">
            <div>{title}</div>
            <button onClick={handlePopupClose}>
              <IoIosClose className="cursor-pointer" size={30} />
            </button>
          </div>
          <hr className="p-1 my-6 w-full" />

          {children}
        </div>
      </div>
    );
  }
);

Popup.displayName = "Popup";

export default Popup;
