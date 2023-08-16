import APIKeys from "@/components/APIKeys"
import Contracts from "@/components/Contracts"
import General from "@/components/General"
import Wallets from "@/components/Wallets"
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
      component: <General />, 
      href: `/dashboard/${projectId}/settings/general`
    },
    apiKeys: {
      title: "API Keys", 
      component: <APIKeys />, 
      href: `/dashboard/${projectId}/settings/apiKeys`
    },
    contracts: {
      title: "Contracts", 
      component: <Contracts />, 
      href: `/dashboard/${projectId}/settings/contracts`
    },
    wallets: {
      title: "Wallets", 
      component: <Wallets />, 
      href: `/dashboard/${projectId}/settings/wallets`
    }
  }
  return (
    <LinkTabRenderer
      tabs={tabs}
      slug={setting}
      defaultSlug={"general"}
    />
  )
}