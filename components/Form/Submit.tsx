import clsx from "clsx"
import { PropsWithChildren } from "react"

import { useFormContextSafe } from "."
import Button, { ButtonProps, SubmitButtonStyles } from "../Buttons"

interface SubmitButtonProps extends PropsWithChildren<ButtonProps> {}

export default function Submit(props: SubmitButtonProps) {
  const { children, className, ...rest } = props
  const {
    formState: { errors, isSubmitting },
  } = useFormContextSafe()
  const disabled = Object.keys(errors).length > 0

  return (
    <Button
      disabled={disabled || isSubmitting}
      className={clsx(SubmitButtonStyles, className)}
      {...rest}
    >
      {children ? children : "Submit"}
    </Button>
  )
}
