import { BaseFormInput, BaseFormInputProps } from "."
import TextArea from "../inputs/TextArea"

interface TextAreaInputProps extends Omit<BaseFormInputProps<string>, 'render'> {
    placeholder?: string
    disabled?: boolean
}

export default function TextAreaInput(props: TextAreaInputProps){
    const { placeholder, disabled, ...rest } = props
    return <BaseFormInput 
        {...rest}
        render={({ field, formState }, onChange) => <TextArea 
            {...field}
            id={field.name}
            placeholder={placeholder}
            disabled={disabled || formState.isSubmitting}
            onChange={e => {
                const value = e.target.value
                onChange && onChange(value)
                field.onChange(e.target.value)
            }}
        />}
    />
}