import clsx from "clsx"

import Button, { LightButtonStyles } from "@/components/Buttons"
import Clipboard from "@/components/icons/Clipboard"
import DownloadIcon from "@/components/icons/Download"
import FileIcon from "@/components/icons/File"
import Operating from "@/components/icons/Operating"
import Warning from "@/components/icons/Warning"

const codes = [
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
  "120F7 8PBXE",
]

export default function BackupCodes({
  setDone,
}: {
  setDone: (done: boolean) => void
}) {
  return (
    <div className="flex flex-col items-center max-w-[31rem]">
      <div className="text-2xl">Save backup codes</div>
      <div className="mt-2 text-gray-3">
        {
          " You'll need these backup codes if you ever lose access to your authenticator device or app."
        }
      </div>
      <div className="flex space-x-4 mt-10 bg-warning/10 px-5 py-4 rounded-2lg">
        <span>
          <Warning className=" text-warning w-5" />
        </span>
        <div className="text-sm text-left">
          {
            "Treat these codes like a password. Never share them or any other 2FA code, even in conversations with the Syndicate team. We'll never ask for them."
          }
        </div>
      </div>
      <div className="max-w-fit grid justify-items-center place-content-center auto-cols-max grid-cols-2 gap-4 mt-10 font-mono">
        {codes.map((code, index) => {
          return (
            <div
              className="border border-gray-6 rounded-lg
               bg-white/[.02] py-4 px-6 w-fit tracking-[0.175rem]"
              key={index}
            >
              {code}
            </div>
          )
        })}
      </div>
      <div className="mt-10 space-y-2">
        <div className="text-xs text-gray-4">
          Created on June 16, 2023 at 8:00 pm ET. 0/10 used.
        </div>
        <button className="text-blue-1 text-sm flex justify-center w-full space-x-2">
          <Operating className="h-4 w-4" />
          <span>Regenerate codes</span>
        </button>
      </div>
      <div className="flex justify-between text-base mt-10 w-full">
        <Button className={LightButtonStyles} onClick={() => setDone(true)}>
          <div className="flex items-center space-x-2">
            <Clipboard className="h-4 w-4" />
            <span>Copy</span>
          </div>
        </Button>
        <Button className={LightButtonStyles} onClick={() => setDone(true)}>
          <div className="flex items-center space-x-2">
            <DownloadIcon className="h-4 w-4" />
            <span>Download</span>
          </div>
        </Button>
        <Button className={LightButtonStyles} onClick={() => setDone(true)}>
          <div className="flex items-center space-x-2">
            <FileIcon className="h-4 w-4" />
            <span>Print</span>
          </div>
        </Button>
      </div>
      <div className="mt-5 text-gray-3">
        Copy, download, or print these codes to continue
      </div>
    </div>
  )
}
