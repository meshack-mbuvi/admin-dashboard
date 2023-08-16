import type { Route } from "next";
import { redirect } from "next/navigation";

import { objectKeys } from "@/utils/objects";
import { LinkTab } from "../Tab";

interface TabContent {
    title: string;
    component: React.ReactNode;
    href: Route | string
}
interface ServerTabProps<T extends Record<string, TabContent>> {
    tabs: T
    slug: string;
    defaultSlug: keyof T
}

// LinkTabRenderer renders content based on a given slug. Helpful when creating url based tabs
export default function LinkTabRenderer<T extends Record<string, TabContent>>(props: ServerTabProps<T>) {
    const { tabs, slug, defaultSlug } = props
    const slugs = objectKeys(tabs)
    const isSlugValid = slugs.includes(slug)
    if (!isSlugValid) {
        // we cannot guarantee user inputs a valid slug, redirect to the default if not
        redirect(tabs[defaultSlug].href)
    }
    const tabLinks = slugs.map(tab => ({title: tabs[tab].title, href: tabs[tab].href}))
    return <div>
        <div className="flex justify-between">
            <LinkTab tabs={tabLinks}/>
        </div>
        <div>
            {tabs[slug].component}
        </div>
    </div>
}