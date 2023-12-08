import { useEffect, useMemo } from "react";

import usePrevious from "@/hooks/usePrevious";
import { BaseFormInput, BaseFormInputProps, useFormContextSafe } from ".";
import Select, { SelectOption, SelectProps } from "../inputs/Select";

interface SelectInputProps<T> extends Omit<BaseFormInputProps<SelectOption<T> | SelectOption<T>[]>, 'render'>, 
    Pick<SelectProps<T>, 'options' | 'placeholder' | 'above' | 'multiple'> {
    disabled?: boolean
}

export default function SelectInput<T = string | number>(props: SelectInputProps<T>) {
    const { options, placeholder, above, multiple, disabled, defaultValue, ...rest } = props
    const context = useFormContextSafe()
    const defValue = useMemo(() => defaultValue ? defaultValue : multiple ? [] : undefined, [defaultValue, multiple])
    const previousOptions = usePrevious<SelectOption<T>[]>(options)
    // reset value to default value if options change
    useEffect(() => {
        const prevKeys = previousOptions?.map(o => o.id)
        const newKeys = options?.map(o => o.id)
        const optionsAreDifferent = prevKeys && newKeys && prevKeys.length !== newKeys.length && prevKeys.every((k, i) => k !== newKeys[i])
        if (optionsAreDifferent) {
            context.setValue(rest.name, defValue)
        }
    }, [options, previousOptions, rest.name, context, defValue])
    return <BaseFormInput<SelectOption<T> | SelectOption<T>[]>
        {...rest}
        defaultValue={defValue}
        render={({ field, formState }, onChange) => <Select<T> 
                multiple={multiple}
                above={above}
                placeholder={placeholder}
                options={options}
                disabled={disabled || formState.isSubmitting}
                name={field.name}
                selected={field.value}
                setSelected={(value: SelectOption<T> | SelectOption<T>[]) => {
                    onChange && onChange(value)
                    field.onChange(value)
                }}
            />
        }
    />
}
