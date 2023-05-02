import Text from "components/Text"
export default function index() {
  return (
    <div className="flex mb-4 rounded-md px-6 py-7 bg-gray-7 bg-opacity-20 border border-gray-8">
      <div className="flex justify-between md:w-1/2">
        <Text>Smart contract</Text>
        <Text className="text-gray-4 ordinal slashed-zero">
          0x29023983094309349034023982349845
        </Text>
      </div>
    </div>
  )
}
