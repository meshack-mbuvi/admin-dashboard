import Text from "@/components/Text"
import Check from "@/components/icons/Check"
import Warning from "@/components/icons/Warning"
import RightArrow from "../icons/RightArrow";

const Wallets = () => {
    const wallets = [
        "0x388C818CA8B9251b393131C08a736A67ccB19297",
        "0x388C818CA8B9251b393131C08a736A67ccB19297",
    ]
    return (
        <div className="flex flex-col font-sans p-10 border-1 bg-gray-8 rounded-lg mr-10">
            <Text className="font-medium text-2xl pb-2">Wallets</Text>
            <div className="flex flex-row pb-7">
                <p className="font-small text-gray-4 text-sm pr-2">
                    These wallets will be used to perform actions on your contract. 
                    Please add them as an allowed operator.     
                </p>
                <span className="flex items-center text-blue-1 justify-center">
                    <a href="#" className="font-medium text-sm pr-1">Learn more</a>
                    <RightArrow className="w-4 h-4" />
                </span>
            </div>
                <div className="flex flex-row w-3/5 justify-between">
                    <div className="flex flex-col pb-3">
                        <p className="text-gray-4 text-sm pb-4">Address</p>
                        {wallets.map((wallet) => {
                            return (
                                <p key={wallet} className="font-normal text-base py-3"><span className="text-gray-3">0x</span>{wallet.substring(2)}</p>
                            )
                        })}
                    </div>
                    <div className="flex flex-col pb-3">
                        <Text className="font-small justify-right text-gray-3 text-sm pb-4">Status</Text>
                        <div className="flex flex-row py-3 items-center text-success">
                            <span className="flex pr-3">
                                <Check />
                            </span>
                            <p className="font-normal text-base">Added</p>
                        </div>
                        <div className="flex flex-row py-3 items-center text-warning">
                            <span className="flex pr-3">
                                <Warning />
                            </span>
                            <p className="font-normal text-base">Action needed</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center text-blue-1">
                    <a href="mailto:hello@syndicate.io" className="font-medium text-normal pr-1">Need more wallets? Contact us</a>
                    <RightArrow className="w-3 h-3" />
                </div>
        </div>
    )
}

export default Wallets;
