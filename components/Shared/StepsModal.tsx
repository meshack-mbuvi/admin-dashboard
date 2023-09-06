import useInterval from "@/hooks/useInterval"
import { useState } from "react"

import Modal from "../Modal"
import Check from "../icons/Check"
import Operating from "../icons/Operating"

type StepperProps = {
  show: boolean
  canComplete: boolean
  title: string
  steps: string[]
  onComplete: () => void
  handleClose?: () => void
}
export default function StepsModal(props: StepperProps) {
  const { title, steps, show, onComplete, canComplete, handleClose } = props
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [updatedSteps, setUpdatedSteps] = useState(
    steps.map((step) => ({ text: step, status: "pending" }))
  )
  const [hasCompleted, setHasCompleted] = useState(false)

  const updateStepStatus = (currentStepIndex: number) => {
    const _steps = [...updatedSteps]
    const currentStep = _steps[currentStepIndex]

    if (!currentStep) return

    currentStep.status = "completed"
    setCurrentStepIndex(currentStepIndex + 1)
    setUpdatedSteps(_steps)
  }

  useInterval(
    () => {
      // DEV: if canComplete is true, then we want to not only complete the last step but also complete "the step after the last step" which means the success state for all steps is shown
      if (canComplete && currentStepIndex === steps.length) {
        setHasCompleted(true)
        updateStepStatus(currentStepIndex)
        onComplete()
      }

      // DEV: if canComplete is false, then we want to only complete the last step and your on the last visible step hold here
      if (!canComplete && currentStepIndex === steps.length - 1) {
        return
      }

      // DEV: Otherwise stepo through all the steps as usual
      updateStepStatus(currentStepIndex)
    },
    // DEV: stop timer if modal isnt open or is the steps have completed
    hasCompleted || !show ? null : 350
  )

  const resetSteps = () => {
    setUpdatedSteps(steps.map((step) => ({ text: step, status: "pending" })))
  }

  return (
    <Modal
      show={show}
      outsideOnClick
      closeModal={() => {
        handleClose?.()
        resetSteps()
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
