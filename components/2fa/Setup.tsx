import clsx from "clsx"

export default function Setup() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">
        Scan this QR code with your authenticator app
      </div>
      <div className="border border-gray-6 p-5 w-fit rounded-lg bg-white/[.02] mt-8">
        <div className="w-52 h-52 bg-gray-6"></div>
      </div>
      <div className="mt-12">or, enter this code manually:</div>
      <div
        className={clsx(
          "w-full border border-gray-6 rounded-lg",
          "bg-white/[.02] mt-5 px-6 py-4 font-mono"
        )}
      >
        293F 78PB XDR3 0ZF5 60X9 Z812 R6X2 91CT
      </div>
    </div>
  )
}
