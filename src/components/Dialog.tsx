import { Fragment, ReactElement, useRef } from "react";
import { Dialog as BaseDialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import useEventListener from "hooks/useEventListener";

type DialogProps = {
  open: boolean;
  onClose: (value: any) => void;
  children: ReactElement | ReactElement[];
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
};

const DialogTitle = (props: {
  children: ReactElement | string;
  onClose?: () => void;
}) => {
  return (
    <BaseDialog.Title
      as="h3"
      className="text-2xl mb-5 flex justify-between items-center font-medium text-white"
    >
      {props.children}
      {props.onClose && (
        <XIcon className="w-6 h-6 cursor-pointer" onClick={props.onClose} />
      )}
    </BaseDialog.Title>
  );
};

const DialogContent = (props: {
  children: ReactElement | ReactElement[] | string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg px-4 py-5 shadow-xl text-gray-600",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

const DialogActions = (props: { children: ReactElement | ReactElement[] }) => (
  <div className="mt-5 sm:mt-6 sm:gap-3 flex justify-end">{props.children}</div>
);

function Dialog(props: DialogProps) {
  const {
    open,
    onClose,
    children,
    closeOnOutsideClick = true,
    closeOnEsc = true,
  } = props;

  const dialogRef = useRef(null);

  useEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && !closeOnEsc) {
        event.stopImmediatePropagation();
      }
    },
    dialogRef
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <BaseDialog
        as="div"
        ref={dialogRef}
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <BaseDialog.Overlay
              className={clsx(
                "fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity backdrop-blur-sm",
                !closeOnOutsideClick && "pointer-events-none" // Let's prevent mouse events to be triggered to ensure the dialog stay open.
              )}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {children}
            </div>
          </Transition.Child>
        </div>
      </BaseDialog>
    </Transition.Root>
  );
}

Dialog.Title = DialogTitle;
Dialog.Content = DialogContent;
Dialog.Actions = DialogActions;

export default Dialog;
