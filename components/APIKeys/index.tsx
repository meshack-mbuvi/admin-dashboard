import Text from "@/components/Text"
import Button from "@/components/Buttons"
import { useState } from "react";
import RightArrow from "../icons/RightArrow";

const APIKeys = () => {
    // TODO: Keys/created dates should likely be stored in a more secure way, but currently a placeholder
    const [keys, setKeys] = useState(["pk_test_QmMWqQ6TJ0t6qTkAtIJP1fhv"]);
    const [keySetDates, setKeySetDates] = useState(["April 30, 2023 at 5:32 PM PDT"]);

    const createKey = () => {
        setKeys(prevKeyList => [...prevKeyList, "pk_test_QmMWqQ6TJ0t6qTkAtIJP1fhv"]);
        let date = new Date();
        let options = { year: 'numeric' as 'numeric', month: 'long' as "long", day: 'numeric'as 'numeric', hour: 'numeric' as 'numeric', minute: 'numeric' as 'numeric', hour12: true, timeZoneName: 'short' as 'short'};
        let formattedDate = date.toLocaleString('en-US', options);
        setKeySetDates(prevKeySetDates => [...prevKeySetDates, formattedDate.toLocaleString()]);
    };

    const [isBlurred, setIsBlurred] = useState(true);

    const BlurredView = () => {
        return (
            <>
                <div className="relative border-2 rounded-lg border-gray-7 mb-1" onClick={() => setIsBlurred(false)}>
                    <p className={`${isBlurred ? 'opacity-50 filter blur-md' : 'opacity-100'} font-normal text-normal py-2.5`}>pk_test_QmMWqQ6TJ0t6qTkAtIJP1fhv</p>
                    <div className={`absolute top-3 left-20 opacity-100`} 
                        onClick={() => setIsBlurred(false)}>
                        CLICK TO REVEAL
                    </div>
                </div>      
            </>
        )
    }

    return (
        <div>
            <div className="flex font-sans flex-col h-full w-full">
                <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mb-10 mr-10">
                    <Text className="font-medium text-2xl pb-5">Secret keys</Text>
                    <p className="font-small text-gray-3 text-sm pb-7">Secret keys are used for API endpoint authentication.</p>
                    <div className="flex flex-row w-3/5 justify-between pb-5">
                        <div className="flex flex-col pb-3">
                            <Text className="font-small text-gray-3 text-sm pb-3">Key</Text>
                            {keys.map((key) => {
                                if (isBlurred) return <BlurredView />
                                return <p key={key} className="font-normal text-normal py-3 mb-1">{key}</p>
                            })}
                        </div>
                        <div className="flex flex-col pb-3">
                            <Text className="font-small justify-right text-gray-3 text-sm pb-2.5">Created</Text>
                            {keySetDates.map((dates) => {
                                return <p key={dates} className="font-normal text-normal py-3 mb-1">{dates}</p>
                            })}
                        </div>
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
