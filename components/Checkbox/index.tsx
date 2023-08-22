import clsx from "clsx";

import Check from "../icons/Check";

interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export default function Checkbox(props: CheckboxProps) {
    const { checked, onChange, label, disabled, className } = props
    // DEV: to avoid an unclickable space between the label and checkbox, wrap the input in the label
    // https://ux.stackexchange.com/questions/35289/input-checkboxes-wrapped-inside-labels#:~:text=Wrap%20the%20label%20around%20the,non%2Dclickable%20gap%20between%20them.&text=Wrapping%20the%20label%20around%20the%20control%20removes%20this%20gap.
    const Component = label ? "label" : "span"
    return <Component className={clsx("inline-flex items-center relative py-1", {"cursor-pointer": !disabled}, className)}>
        <input 
            type="checkbox"
            checked={checked}
            onChange={() => onChange && onChange(!checked)}
            disabled={disabled}
            className={clsx("opacity-0 absolute", {"cursor-pointer": !disabled})}
        />
        <span className={clsx("w-6 h-6 border rounded p-1", {
            "bg-blue-nasa border-blue-nasa": checked && !disabled,
            "border-gray-5": !checked && !disabled,
            "bg-gray-7 border-gray-7": disabled,
        })}>
            {checked && <Check className={clsx({"text-white": !disabled, "text-gray-4": disabled})}/>}
        </span>
        {label && <span className="ml-4 text-base font-normal">{label}</span>}
    </Component>
}