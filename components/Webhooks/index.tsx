"use client"
import clsx from "clsx"

import { DarkButtonStyles } from "@/components/Buttons"
import Loading from "@/components/Loading"
import ExternalLink from "@/components/Shared/ExternalLink"
import PremiumPill from "@/components/Shared/PremiumPill"
import Text from "@/components/Text"
import useFreePlan from "@/hooks/useFreePlan"
import EmptyState from "@/components/Shared/Empty"

import useGetWebhooks from "@/hooks/useGetWebhooks"
import { useParams } from "next/navigation"
import getFirstOrString from "@/utils/getFirstOrString"
import WebhookCard from "@/components/Webhooks/WebhookCard"

export default function Webhooks() {
  const isFreePlan = useFreePlan()
  const { projectId } = useParams()
  const projectIdString = getFirstOrString(projectId)
  const {
    data: webhooksData,
    isLoading: isWebhooksLoading,
    isFetching,
    isPreviousData,
  } = useGetWebhooks({
    projectId: projectIdString,
  })

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Text className="font-medium text-2xl ">Webhooks</Text>
            <p className="font-small text-gray-3 text-sm">
              View and manage event callbacks
            </p>
          </div>
          <div className="flex space-x-7">
            {isFreePlan && <PremiumPill />}

            <ExternalLink
              href="https://docs.syndicate.io/open-api/webhook/get-callback"
              className={clsx(
                DarkButtonStyles,
                "border-2 border-warning text-white flex space-x-2 py-3"
              )}
              linkText="View Guide"
            />
          </div>
        </div>

        <div className="pb-5 overflow-x-auto mt-16">
          {isWebhooksLoading ? (
            <div className="mt-6">
              <Loading className="h-24 my-4" />
              <Loading className="h-24 my-4" />
              <Loading className="h-24" />
            </div>
          ) : webhooksData?.length !== 0 ? (
            <div
              className={clsx(
                "flex flex-col gap-4 w-full",
                (isFetching || isPreviousData) &&
                  "opacity-60 pointer-events-none"
              )}
            >
              {webhooksData?.map((webhook) => (
                <WebhookCard key={webhook.id} webhook={webhook} />
              ))}
            </div>
          ) : (
            <div className="mt-16">
              <EmptyState
                heading={"No Webhooks Yet"}
                description={
                  <span>View the documentation to set up webhooks.</span>
                }
              ></EmptyState>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
