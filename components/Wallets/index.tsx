import Text from "@/components/Text"
import useGetProjectWallets from "@/hooks/useGetProjectWallets"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { useState } from "react"
import CopyComponent from "../CopyToClipboard"
import Section from "../Section"
import Check from "../icons/Check"
import RightArrow from "../icons/RightArrow"
import Warning from "../icons/Warning"

const Wallets: React.FC = () => {
  const [hoveredWalletAddress, setHoveredWalletAddress] = useState<
    string | null
  >(null)

  const { projectId } = useParams()
  const { data: wallets } = useGetProjectWallets({
    projectId,
  })

  return (
    <Section className="flex flex-col font-sans p-10 rounded-lg mr-10">
      <Text className="font-medium text-2xl pb-2">Wallets</Text>
      <div className="flex flex-row pb-7">
        <p className="font-small text-gray-4 text-sm pr-2">
          These wallets will be used to perform actions on your contract. Please
          add them as an allowed operator.
        </p>
        <span className="flex items-center text-blue-1 justify-center">
          <a href="#" className="flex items-center font-medium text-sm pr-1">
            Learn more <RightArrow className="w-4 h-4 ml-2" />
          </a>
        </span>
      </div>

      <div className="flex flex-col">
        {wallets && wallets.length > 0 && (
          <div className="flex w-full space-x-48 mb-5">
            <div className="flex flex-col w-1/3">
              <p className="text-gray-3 text-sm">Address</p>
            </div>
            <div className="flex flex-col">
              <Text className="font-small justify-right text-gray-3 text-sm">
                Status
              </Text>
            </div>
          </div>
        )}

        <div className="w-full flex-col flex py-3">
          {wallets && wallets.length > 0 ? (
            wallets.map(({ walletId, walletAddress, isActive }) => {
              return (
                <div
                  key={walletId}
                  className="flex space-x-48 border-b last:border-none border-gray-7"
                >
                  <div className="flex w-1/3">
                    <p
                      key={walletId}
                      className="flex font-mono space-x-4 text-base py-3"
                      onMouseEnter={() =>
                        setHoveredWalletAddress(walletAddress)
                      }
                      onMouseLeave={() => setHoveredWalletAddress(null)}
                    >
                      <span className="text-gray-3">0x</span>
                      {walletAddress.substring(2)}
                      {hoveredWalletAddress === walletAddress && (
                        <CopyComponent text={walletAddress} className="ml-4" />
                      )}
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "flex flex-row py-3 items-center",
                      isActive ? "text-success" : "text-warning"
                    )}
                  >
                    <span className="flex pr-3">
                      {isActive ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Warning className="w-4 h-4" />
                      )}
                    </span>
                    <p className="font-normal text-base">
                      {isActive ? "Added" : "Action needed"}
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-lg pb-5">No Wallets!</p>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center mt-8 text-blue-1">
        <a
          href="mailto:hello@syndicate.io"
          className="font-medium text-normal pr-1"
        >
          Need more wallets? Contact us
        </a>
        <RightArrow className="w-4 h-3" />
      </div>
    </Section>
  )
}

export default Wallets
