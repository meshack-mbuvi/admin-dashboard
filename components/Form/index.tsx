import clsx from "clsx"
import React, { PropsWithChildren } from "react"
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  DefaultValues,
  FieldValues,
  FormProvider,
  Mode,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormStateReturn,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Tooltip } from "react-tooltip"

import Label from "../Label"
import Question from "../icons/Question"

interface FormProps<T extends FieldValues> extends PropsWithChildren {
  onSubmit: SubmitHandler<T>
  onValidationError?: SubmitErrorHandler<T>
  defaultValues?: DefaultValues<T>
  mode?: Mode
}

function Form<T extends FieldValues>(props: PropsWithChildren<FormProps<T>>) {
  const { onSubmit, onValidationError, defaultValues, mode, children } = props
  const methods = useForm<T>({ defaultValues, mode })
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onValidationError)}
        className="flex flex-col gap-6"
      >
        {children}
      </form>
    </FormProvider>
  )
}

interface FormControlProps extends PropsWithChildren {
  name: string
  label?: string
  description?: string
  helperText?: string
}

export function FormControl(props: FormControlProps) {
  const { label, name, children, description, helperText } = props
  const form = useFormContext()
  const error = form.formState.errors?.[name]
  const hasErrors = !!error
  return (
    <div className="flex flex-col gap-1">
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <Label
              htmlFor={name}
              className={clsx(
                "text-base",
                "flex",
                "justify-between",
                "items-center",
                "mb-1",
                {
                  "text-red": hasErrors,
                  "text-white": !hasErrors,
                }
              )}
            >
              <span>{label}</span>
              {helperText && (
                <span
                  data-tooltip-id={`t-tx`}
                  data-tooltip-content={helperText}
                  data-tooltip-place="left"
                >
                  <Question className="w-[16px] text-gray-4" />
                  <Tooltip
                    id={`t-tx`}
                    className="drop-shadow-2xl opacity-100"
                    style={{
                      marginLeft: "8px",
                      padding: "8px",
                    }}
                  />
                </span>
              )}
            </Label>
          )}
          {description && (
            <div className="text-gray-3 text-sm">{description}</div>
          )}
        </div>
      )}
      {children}
      {error?.message && (
        <div className="text-red text-sm">{error.message as string}</div>
      )}
    </div>
  )
}

type ControllerRenderParams = {
  field: ControllerRenderProps
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<FieldValues>
}

export interface BaseFormInputProps<T>
  extends Pick<
    FormControlProps,
    "name" | "label" | "description" | "helperText"
  > {
  onChange?: (value: T) => void
  defaultValue?: T
  validate?: Pick<
    RegisterOptions,
    "validate" | "min" | "max" | "maxLength" | "minLength" | "required"
  >
  render: (
    params: ControllerRenderParams,
    onChange?: (value: T) => void
  ) => React.ReactElement
}

export function BaseFormInput<T>(props: BaseFormInputProps<T>) {
  const { name, defaultValue, validate, render, onChange, ...rest } = props
  const { control } = useFormContextSafe()

  return (
    <FormControl name={name} {...rest}>
      <Controller
        name={name}
        control={control}
        rules={validate}
        defaultValue={defaultValue ? defaultValue : ""}
        render={(params) => render(params, onChange)}
      />
    </FormControl>
  )
}

export function useFormContextSafe() {
  const context = useFormContext()
  if (!context) {
    throw new Error("This component must be used within a Form component")
  }
  return context
}

export default Form
