import CloseCircle from "@/components/icons/CloseCircle"
import SearchIcon from "@/components/icons/Search"

interface SearchProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  placeholder: string
}

const Search = (props: SearchProps) => {
  const { searchTerm, setSearchTerm, placeholder } = props

  const clearInputField = (): void => {
    setSearchTerm("")
  }

  return (
    <div className="mb-4 md:mb-4">
      <div className="relative mt-2 rounded-md shadow-sm w-full focus:border focus:border-b-white">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 bg-black ring-0 ">
          <SearchIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search-transactions"
          className="block w-full rounded-md border-0 py-1.5 pl-10 pr-8 text-white bg-black outline-none focus:ring-gray-4 placeholder:text-gray-400 sm:leading-6 "
          placeholder={placeholder}
          onChange={(e): void => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer text-gray-400 hover:text-white"
            onClick={(): void => clearInputField()}
          >
            <CloseCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Search
