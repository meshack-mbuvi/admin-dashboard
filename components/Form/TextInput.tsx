import { BaseFormInput, BaseFormInputProps } from "."
import Input from "../inputs/Input"

interface TextInputProps extends Omit<BaseFormInputProps<string>, 'render'> {
    type?: 'text' | 'email' | 'password'
    placeholder?: string
    disabled?: boolean
}

export default function TextInput(props: TextInputProps) {
    const { type, placeholder, disabled, ...rest } = props
    return <BaseFormInput
        {...rest}
        render={({ field, formState }, onChange) => {
            return <Input 
                {...field}
                id={field.name}
                type={type}
                placeholder={placeholder}
                disabled={disabled || formState.isSubmitting}
                onChange={e => {
                    const value = e.target.value
                    onChange && onChange(value)
                    field.onChange(e)
                }}
                className="w-full"
            />
        }}
    />
}
