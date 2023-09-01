import useInterval from "@/hooks/useInterval"
import { useEffect, useState } from "react"
import Modal from "../Modal"
import Check from "../icons/Check"
import Operating from "../icons/Operating"
export type step = {
  text: string
}
type StepperProps = {
  show: boolean
  canComplete: boolean
  title: string
  steps: step[]
  onComplete: () => void
  handleClose?: () => void
}
export default function StepsModal(props: StepperProps) {
  const { title, steps, show, onComplete, canComplete, handleClose } = props
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [updatedSteps, setUpdatedSteps] = useState(
    steps.map((step) => ({ ...step, status: "pending" }))
  )

  const updateStepStatus = (currentStepIndex: number) => {
    const _steps = [...updatedSteps]
    const currentStep = _steps[currentStepIndex]

    if (!currentStep) return

    currentStep.status = "completed"
    setCurrentStepIndex(currentStepIndex + 1)
    setUpdatedSteps(_steps)
  }

  const interval = useInterval({
    callback: () => {
      if (canComplete && currentStepIndex === steps.length - 1) {
        interval.clear()
        updateStepStatus(currentStepIndex)
        onComplete()
      } else {
        if (currentStepIndex === steps.length - 1) {
          interval.clear()
        }
        updateStepStatus(currentStepIndex)
      }
    },
    delay: 300,
  })

  useEffect(() => {
    if (!show) return interval.clear()
    interval.start()
    if (canComplete && currentStepIndex === steps.length - 1) {
      interval.clear()
    }
  }, [currentStepIndex, show, canComplete])

  const resetSteps = () => {
    setUpdatedSteps(steps.map((step) => ({ ...step, status: "pending" })))
    handleClose?.()
  }

  return (
    <Modal
      show={show}
      outsideOnClick
      closeModal={() => {
        handleClose?.()
        resetSteps()
        interval.clear()
      }}
    >
      <div className="flex flex-col space-y-10">
        <p className="text-2xl">{title}</p>
        <div className="flex flex-col space-y-4">
          {updatedSteps.map((step, index) => {
            return (
              <div className="flex space-x-2" key={index}>
                {step.status === "completed" ? (
                  <Check className="w-[18px] text-green mr-2" />
                ) : (
                  <Operating className="w-[18px] animate-spin text-blue-secondary mr-2" />
                )}

                {step.text}
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
