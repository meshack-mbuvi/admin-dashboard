export const getAuthRedirectURL = () => {
  console.log(process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL)
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
  if (isPreview) {
    const previewURL = process.env.NEXT_PUBLIC_VERCEL_URL
    return `https://${previewURL}/authenticate`
  }

  return process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL
}
