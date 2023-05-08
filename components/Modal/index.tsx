import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import Image from "next/image"
import { Fragment, useRef } from "react"

interface ModalProps {
  title?: string
  children: JSX.Element
  show: boolean
  closeModal?: () => void
  type?: string
  customWidth?: string
  loading?: boolean | string
  titleFontSize?: string
  showCloseButton?: boolean
  customClassName?: string
  outsideOnClick?: boolean
  overflow?: string
  showBackButton?: boolean
  closeButtonClassName?: string
  closeButtonPosition?: string
  radiusClassName?: string
  modalStyle?: ModalStyle
  opacity?: string
  titleMarginClassName?: string
  titleAlignment?: string
  showHeader?: boolean
  overflowYScroll?: boolean
  overflowXScroll?: boolean
  isMaxHeightScreen?: boolean
  alignment?: string
  margin?: string
  maxHeight?: boolean
  mobileModal?: boolean
}

export enum ModalStyle {
  DARK = "bg-gray-syn8",
  LIGHT = "bg-white",
  SUCCESS = "bg-green-success",
  TRANSPARENT = "bg-transparent",
}

const Modal = (props: ModalProps): JSX.Element => {
  const {
    title,
    children,
    show,
    closeModal,
    customWidth = "w-11/12 md:w-1/2 lg:w-2/5 max-w-[582px]",
    titleFontSize,
    margin = "my-14",
    showCloseButton = false,
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
        className={`fixed z-50 w-screen h-screen overflow-y-scroll no-scroll-bar justify-center align-middle py-auto inset-0 text-center`}
        onClose={(): void => {
          handleClose()
        }}
        open={show}
      >
        <div
          ref={childWrapperRef}
          className={`flex h-screen my-auto justify-center text-center sm:px-4 sm:block sm:p-0`}
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
            <Dialog.Overlay
              className={`fixed inset-0 bg-black bg-opacity-60 transition-opacity`}
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
            <div
              className={clsx(
                "no-scroll-bar bg-gray-8 p-8 rounded-lg align-middle mx-auto inline-block text-left shadow-xl transform transition-all",
                customWidth,
                margin
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="hidden sm:block absolute p-4 top-0 left-0"></div>

              {/* close button */}
              <div className={`absolute z-10 top-9 right-10`}>
                {/* close button at the right top of the modal */}
                {showCloseButton ? (
                  <button
                    type="button"
                    className={`text-gray-syn7 rounded-md hover:text-gray-syn7 focus:outline-none focus:ring-0`}
                    onClick={() => closeModal?.()}
                  >
                    <span className="sr-only">Close</span>
                    <Image
                      src="/images/close-gray-5.svg"
                      width="16"
                      height="16"
                      alt="close"
                    />
                  </button>
                ) : null}
              </div>
              {/* modal title */}
              {title ? (
                <div
                  className={`   text-2xl font-medium leading-8 mb-2 pr-12 sm:pr-0`}
                >
                  {title}
                </div>
              ) : null}
              {/* end of modal title */}

              <div className={`no-scroll-bar  `}>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
