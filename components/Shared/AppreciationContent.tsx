import clsx from "clsx"
import { LightButtonStyles } from "../Buttons"

type AppreciationModalProps = {
  handleCloseClick: () => void
}

export default function AppreciationContent(props: AppreciationModalProps) {
  const { handleCloseClick } = props

  return (
    <div className="flex flex-col space-y-8">
      <p className="font-sans font-medium text-2xl text-gray-1">
        Thank you for sharing your interest! 🎉
      </p>
      <p>
        Someone from our team will email you soon. If you have any questions in
        the meantime, please email us at{" "}
        <a href="mailto:sales@syndicate.io" className="text-blue-2">
          sales@syndicate.io
        </a>
        .
      </p>

      <button
        className={clsx(LightButtonStyles, "rounded-lg w-full")}
        onClick={handleCloseClick}
      >
        Go back to dashboard
      </button>
    </div>
  )
}
