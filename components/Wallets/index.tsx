import Text from "@/components/Text"
import Check from "@/components/icons/Check"
import Warning from "@/components/icons/Warning"
import RightArrow from "../icons/RightArrow";

const Wallets = () => {
    return (
        <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mr-10">
            <Text className="font-medium text-2xl pb-1">Wallets</Text>
            <div className="flex flex-row pb-3">
                <p className="font-small text-gray-4 text-sm pb-7">
                    These wallets will be used to perform actions on your contract. 
                    Please add them as an allowed operator.     
                </p>
                <span className="flex pl-2">
                    <Text className="font-medium text-sm pb-5">Learn more</Text>
                    <RightArrow className="w-3 h-3 align-middle" />
                </span>
            </div>
                <div className="flex flex-row">
                    <div className="flex flex-col pb-3">
                        <p className="font-small text-gray-4 text-sm pb-4">Address</p>
                        <p>0x388C818CA8B9251b393131C08a736A67ccB19297</p>
                        <p>0x388C818CA8B9251b393131C08a736A67ccB19297</p>
                    </div>
                    <div className="flex flex-col pb-3">
                        <Text className="font-small justify-right text-gray-3 text-sm pb-1 pl-2">Status</Text>
                        <div className="flex flex-row">
                            <span className="flex pr-2">
                                <Check />
                            </span>
                            <p>Added</p>
                        </div>
                        <div className="flex flex-row">
                            <span className="flex pr-2">
                                <Warning />
                            </span>
                            <p>Action needed</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row align-middle items-middle">
                    <Text className="font-medium text-sm pb-5">Need more wallets? Contact us</Text>
                    <RightArrow className="w-3 h-3 align-middle" />
                </div>
        </div>
    )
}

export default Wallets;
