"use client"

import { redirect } from "next/navigation"
import { PropsWithChildren, useState } from "react"

import Form from "@/components/Form"
import SelectInput from "@/components/Form/SelectInput"
import Submit from "@/components/Form/Submit"
import TextInput from "@/components/Form/TextInput"
import { isValidEthereumAddress, isValidJSON } from "@/components/Form/validation"
import Section from "@/components/Section"
import { SelectOption } from "@/components/inputs/Select"
import { networks } from "@/utils/getNetwork"
import TextAreaInput from "@/components/Form/TextAreaInput"

const networkSelectOptions = Object.keys(networks).map(id => ({id: Number(id), label: networks[+id as keyof typeof networks].name}))

function Dev() {
    if (process.env.NODE_ENV !== "development") {
        redirect("/")
    }
    const [abiFnOptions, setAbiFnOptions] = useState<SelectOption[]>([])
    const onAbiChange = (value: string) => {
        try {
            const abi = JSON.parse(value)
            const abiFns = abi?.filter(
                (a: any) => a.type === "function" && a.stateMutability !== "view"
            )
            setAbiFnOptions(abiFns.map((abi: any) => ({id: abi.name, label: abi.name})))
        } catch (e) {
            setAbiFnOptions([])
        }
    }

    const onSubmit = (values: object) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, undefined, 2))
                console.log("form submission values:", values)
                resolve(true)
            }, 1000)
        })
    }
    return <div className="flex flex-col justify-center items-center mt-12 gap-8">
        <DevSection title="Login">
            <Form onSubmit={onSubmit}>
                <TextInput 
                    name="emailAddress" 
                    validate={{required: "Required"}} 
                    label="Email" 
                    type="email" 
                    placeholder="Email"
                />
                <Submit />
            </Form>
        </DevSection>
        <DevSection title="Add contract">
            <Form onSubmit={onSubmit}>
                <TextInput 
                    helperText="Give a name to identify your contract"
                    name="name" 
                    label="Name"
                    defaultValue="Syndicate's ERC-721M"
                    placeholder="My Contract XYZ" 
                    validate={{required: "Please enter a name for your contract"}}
                />
                <TextInput 
                    name="contractAddress" 
                    label="Contract Address" 
                    placeholder="0x..." 
                    validate={{required: "Please enter a contract address", validate: { isValidEthereumAddress }}}
                />
                <TextAreaInput
                    name="contractAbi" 
                    label="Contract ABI" 
                    placeholder="Paste the contract ABI here"
                    validate={{required: "Please enter a contract ABI", validate: { isValidJSON }}}
                    onChange={onAbiChange}
                />
                <SelectInput 
                    multiple
                    disabled={abiFnOptions.length === 0}
                    label="Allowed Functions for Programatic Transactions"
                    name="functionSignatures"
                    options={abiFnOptions}
                    placeholder="Paste ABI to select functions"
                    validate={{required: "Please select a function signature"}}
                />
                <SelectInput 
                    above
                    label="Network"
                    name="blockchainNetwork"
                    options={networkSelectOptions}
                    placeholder="Select preliminary network"
                    validate={{required: "Please select a network"}}
                />
                <Submit>Add contract to project</Submit>
            </Form>
        </DevSection>
    </div>
}

interface DevSectionProps {
    title?: string
}

const DevSection: React.FC<PropsWithChildren<DevSectionProps>> = (props) => {
    const { children, title } = props
    return <Section className="max-w-lg p-4 bg-gray-8 w-full">
        {title && <div className="text-gray-4 text-sm mb-2 text-right">{title}</div>}
        {children}
    </Section>
}

export default Dev