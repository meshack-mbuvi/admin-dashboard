import Section from "./Section"

export default function PageLoading() {
  return (
    <div className="flex justify-center h-full">
      <Section className="my-auto py-8 px-8">
        <p className="text-2xl text-white text-center ">Loading...</p>
      </Section>
    </div>
  )
}
