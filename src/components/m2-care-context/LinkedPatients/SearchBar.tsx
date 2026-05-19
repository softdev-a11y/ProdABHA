interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="relative w-full lg:w-auto">

      <input
        type="text"
        placeholder="Search by name, UHID, ABHA"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full lg:w-[320px]
          border border-gray-300
          rounded-xl
          py-3 pl-4 pr-12
          text-sm
          outline-none
          focus:ring-2
          focus:ring-[#008080]
        "
      />

      <button
        className="
          absolute right-1 top-1
          bg-[#008080]
          hover:bg-[#006d6d]
          text-white
          px-3 py-2
          rounded-lg
          text-sm
        "
      >
        🔍
      </button>

    </div>
  );
};

export default SearchBar;