import { useState } from "react"

import Section from "@/components/Section"
import ResourceID from "@/components/Shared/ResourceID"
import Text from "@/components/Text"
import CopyToClipboard from "@/components/CopyToClipboard"
import Swap from "@/components/icons/Swap"

import { WebhooksDataType } from "@/hooks/useGetWebhooks"
import useRotateWebhookSecret from "@/hooks/useRotateWebhookSecret"

interface WebhookCardProps {
  webhook: WebhooksDataType
}

export default function WebhookCard(props: WebhookCardProps) {
  const { webhook } = props

  const { mutate: rotateSecret } = useRotateWebhookSecret()
  const [isBlurred, setIsBlurred] = useState<boolean>(true)

  return (
    <Section className="p-4 w-full">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex gap-2">
          <div>
            <p className="text-xs text-gray-4 mb-1">ID</p>
            <ResourceID
              id={webhook.id}
              fullView
              truncate
              context="Transaction"
              className="text-gray-1 font-mono overflow-x-hidden text-ellipsis block text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Type</p>
          <p className="text-gray-1 text-sm sm:text-base">
            {webhook.eventType}
          </p>
        </div>

        <div>
          <div className="text-xs text-gray-4 mb-1 ">
            <span>Secret</span>
          </div>
          <div className="flex justify-between space-x-5 items-center">
            <div
              className="relative cursor-pointer rounded-lg"
              onClick={() => setIsBlurred(false)}
            >
              {isBlurred ? (
                <>
                  <p className="opacity-50 filter blur-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    13822395461578695992f6876f7689341b606823
                  </p>
                  <div
                    className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-sm opacity-100 font-mono"
                    onClick={() => setIsBlurred(false)}
                  >
                    CLICK TO REVEAL
                  </div>
                </>
              ) : (
                <div className="flex space-x-4 items-center">
                  <CopyToClipboard
                    text={webhook.secret}
                    tooltipCopyText="Copy Secret"
                    tooltipCopiedText="Secret Copied"
                  >
                    <Text className="font-mono text-sm sm:text-base">
                      {webhook.secret}
                    </Text>
                  </CopyToClipboard>
                </div>
              )}
            </div>
            <button
              className="bg-white rounded-full px-4 py-1 flex items-center space-x-2 text-black"
              onClick={() => {
                const confirm = window.confirm(
                  "Are you sure you want to rotate webhook secret?"
                )
                if (confirm) {
                  rotateSecret({
                    projectId: webhook.projectId,
                    callbackEventId: webhook.id,
                  })
                }
              }}
            >
              <Swap className="w-3 h-3" />
              <span>Rotate Secret</span>
            </button>
          </div>
        </div>
        <div className="w-full">
          <p className="text-xs text-gray-4 mb-1"> URL </p>
          <div className="flex space-x-4 items-center">
            <CopyToClipboard
              text={webhook.callbackURL}
              tooltipCopyText="Copy URL"
              tooltipCopiedText="URL Copied"
            >
              <Text className="font-mono text-xs sm:text-base">
                {webhook.callbackURL}
              </Text>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </Section>
  )
}
