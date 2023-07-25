export const DOMAIN_CONNECTIONS =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? // TODO: ADD production domain connections here
      [
        {
          orgName: "syndicate.io",
          orgId: "organization-live-c85e9994-696d-4b11-ae36-1472f6a20934",
        },
        { orgName: "nike.com", orgId: "" },
      ]
    : [
        {
          orgName: "syndicate.io",
          orgId: "organization-test-2f932663-014a-438c-8b2f-11722cdaae3a",
        },
      ]
