interface StructArgProps {
  struct: { [key: string]: unknown }
}

export default function StructArg(props: StructArgProps) {
  const { struct } = props
  return (
    <div>
      &#123;
      {Object.entries(struct).map(([key, value]) => (
        <p key={key} className="ml-4">
          {key}: {value?.toString() || "error parsing input"}
        </p>
      ))}
      &#125;
    </div>
  )
}
