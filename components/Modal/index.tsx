import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, useRef } from "react"

interface ModalProps {
  children: JSX.Element
  show: boolean
  closeModal?: () => void
  outsideOnClick?: boolean
  overflowYScroll?: boolean
  overflowXScroll?: boolean
  isMaxHeightScreen?: boolean
  maxHeight?: boolean
}

export default function Modal(props: ModalProps): JSX.Element {
  const {
    children,
    show,
    closeModal,
    outsideOnClick,
    overflowYScroll = false,
    overflowXScroll = false,
    isMaxHeightScreen = true,
    maxHeight = true,
  } = props

  const childWrapperRef = useRef<HTMLDivElement>(null)

  const handleClose = (): void => {

    if (closeModal) {
      closeModal()
    }
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        initialFocus={childWrapperRef}
        className="fixed z-50 w-screen h-screen overflow-y-scroll no-scroll-bar justify-center align-middle py-auto inset-0 text-center"
        onClose={(): void => {
          if (outsideOnClick) {
            handleClose()
          }
        }}
        open={show}
      >
        <div
          ref={childWrapperRef}
          className="flex items-center h-screen my-auto justify-center text-center text-white sm:px-4 sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
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
            <div
              className={clsx(
                "no-scroll-bar md:my-14 align-middle mx-auto inline-block max-h-screen bg-gray-8 rounded-2xl text-left shadow-xl transform transition-all w-11/12 md:w-1/2 lg:w-2/5 overflow-hidden p-2 sm:p-6",
                overflowYScroll && "overflow-y-scroll"
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{
                maxHeight: `${
                  isMaxHeightScreen ? "calc(100vh - 100px)" : "auto"
                }`,
              }}
            >
              <div
                className={clsx(
                  "no-scroll-bar mx-4 align-middle",
                  maxHeight && "max-h-modal",
                  overflowXScroll && "overflow-x-scroll"
                )}
              >
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
