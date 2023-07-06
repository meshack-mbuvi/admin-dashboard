import Text from "@/components/Text"
interface ColumnHeaderProps {
  children: string
}
export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ children }) => (
  <Text className="text-sm font-normal text-gray-3 leading-5">{children}</Text>
)
