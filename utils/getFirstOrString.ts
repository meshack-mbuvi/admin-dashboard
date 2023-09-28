export default function getFirstOrString(value: string | string[]) {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}
