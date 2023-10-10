export default function Footer() {
  return (
    <footer className="mx-10 pb-8 pt-16 text-xs font-extralight flex gap-6 justify-end">
      <a
        href="https://syndicate.io/privacy-policy"
        className="hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Privacy
      </a>
      <a
        href="https://syndicate.io/terms"
        className="hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Terms
      </a>
      <p>© Syndicate {new Date().getFullYear()}</p>
    </footer>
  )
}
