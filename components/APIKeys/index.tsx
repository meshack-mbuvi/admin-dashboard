import Text from "@/components/Text"
import Button from "@/components/Buttons"
import { useState } from "react";
import RightArrow from "../icons/RightArrow";
import Trash from "@/components/icons/Trash";
import clsx from "clsx"

interface KeyInfo {
    key: string
    created_date: string
}

const APIKeys = () => {
    const [isBlurred, setIsBlurred] = useState<boolean>(true);
    const [keysInfo, setKeysInfo] = useState<KeyInfo[]>([{ key: "pk_test_QmMWqQ6TJ0t6qTkAtIJP1fhv", created_date: "April 30, 2023 at 5:32 PM PDT" }]);

    const createKey = () => {
        let date = new Date();
        let options = { year: 'numeric' as 'numeric', month: 'long' as "long", day: 'numeric'as 'numeric', hour: 'numeric' as 'numeric', minute: 'numeric' as 'numeric', hour12: true, timeZoneName: 'short' as 'short'};
        let formattedDate = date.toLocaleString('en-US', options);
        setKeysInfo(prevKeysInfo => [...prevKeysInfo, { key: "pk_test_QmMWqQ6TJ0t6qTkAtIJP1fhv", created_date: formattedDate.toLocaleString() }])
    };

    const deleteKey = (indexToDelete: number) => {
        const newKeysInfo = keysInfo.filter((item, index) => index !== indexToDelete);
        setKeysInfo(newKeysInfo);
    }

    const BlurredView = () => {
        return (
            <div className="relative border-2 rounded-lg border-gray-7 mb-1 items-center" onClick={() => setIsBlurred(false)}>
                <p className={clsx("font-normal text-normal py-1.5",
                    isBlurred
                    ? "opacity-50 filter blur-md"
                    : "opacity-100"
                )}>pk_test_QmMWqQ6TJ0t6qTkAtIJP1fhv</p>
                <div className={`absolute top-2 left-20 opacity-100 text-sm pl-2`} 
                    onClick={() => setIsBlurred(false)}>
                    CLICK TO REVEAL
                </div>
            </div>      
        )
    }

    return (
        <div>
            <div className="flex font-sans flex-col h-full w-full">
                <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mb-10 mr-10">
                    <Text className="font-medium text-2xl pb-5">Secret keys</Text>
                    <p className="font-small text-gray-3 text-sm pb-7">Secret keys are used for API endpoint authentication.</p>
                    <div className="flex flex-col pb-5">
                        <div className="flex flex-row justify-between pb-5">
                            <Text className="font-small text-gray-3 text-sm pb-3">Key</Text>
                            <Text className="font-small text-gray-3 text-sm pb-3 pl-7">Created</Text>
                            <div /> {/* Empty div for spacing */}
                        </div>
                        {keysInfo.length === 0 ? <p className="text-lg pb-5">No keys!</p> : ""}
                        {keysInfo.map((keyInfo, index) => {
                            return (
                                <div className="flex flex-row justify-between pb-5 items-center" key={index}>
                                    <p>{isBlurred ? <BlurredView /> : keyInfo.key}</p>
                                    <p>{keyInfo.created_date}</p>
                                    <div className="flex flex-row items-center hover:opacity-90" onClick={() => deleteKey(index)}>
                                        <Trash className="w-3.5 h-4 text-red fill-current" />
                                        <p className="text-red pl-2">Delete</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-row text-blue-1 items-center">
                        <Button 
                            className="font-normal text-normal pr-1"
                            onClick={createKey}
                        >
                            Create a new key
                        </Button>
                        <RightArrow className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default APIKeys;
