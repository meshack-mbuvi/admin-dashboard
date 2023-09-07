import APIKeys from "@/components/APIKeys"
import GeneralSettings from "@/components/GeneralSettings"
import IpRanges from "@/components/IPs"
import LinkTabRenderer from "@/components/LinkTabRenderer"

interface SettingsProps {
  params: {
    setting: string
    projectId: string
  }
}

export default function SettingsPage(props: SettingsProps) {
  const { setting, projectId } = props.params
  const tabs = {
    general: {
      title: "General",
      component: <GeneralSettings />,
      href: `/dashboard/${projectId}/settings/general`,
    },
    apikeys: {
      title: "API Keys",
      component: <APIKeys />,
      href: `/dashboard/${projectId}/settings/apikeys`,
    },
    ips: {
      title: "IPs",
      component: <IpRanges />,
      href: `/dashboard/${projectId}/settings/ips`,
    },
  }
  return <LinkTabRenderer tabs={tabs} slug={setting} defaultSlug={"general"} />
}
