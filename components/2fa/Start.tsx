import TwoFactorIcon from "../icons/TwoFactor"

export default function Start() {
  return (
    <div className="flex flex-col justify-center items-center m-5 max-w-[614px]">
      <TwoFactorIcon className="w-[204px] py-5" />
      <div className="text-3xl mt-10">Set up 2-factor authentication</div>
      <div className="mt-2 text-gray-3">
        Two-factor authentication—or 2FA—helps keep your account secure by
        requiring an extra security code each time you sign in or view sensitive
        data.
      </div>
    </div>
  )
}
