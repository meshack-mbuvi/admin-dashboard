import Text from "@/components/Text"
import Input from "@/components/Input";
import RightArrow from "../icons/RightArrow";

const APIKeys = () => {
    return (
        <div>
            <div className="flex font-sans flex-col h-full w-full">
                <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mb-10 mr-10">
                    <Text className="font-medium text-2xl pb-5">Secret keys</Text>
                    <p className="font-small text-gray-3 text-sm pb-7">Secret keys are used for API endpoint authentication.</p>
                    <div className="flex flex-row">
                        <div className="flex flex-col pb-3">
                            <Text className="font-medium text-sm pb-1">Key</Text>
                            <Input />
                        </div>
                        <div className="flex flex-col pb-3">
                            <Text className="font-small justify-right text-gray-3 text-sm pb-1 pl-2">Created</Text>
                            <Input />
                        </div>
                    </div>
                    <div className="flex flex-row align-middle items-middle">
                        <Text className="font-medium text-sm pb-5">Create a new key</Text>
                        <RightArrow className="w-3 h-3 align-middle" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default APIKeys;
