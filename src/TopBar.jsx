import {useState, useEffect} from "react";

function TopBar(props) {
  const [searchText,setSearch] = useState("");
  const [sortBy,setSort] = useState("*");
  const [sortOrder, setOrder] = useState(1);


  const callSort = () => {
    props.sortFilter({
      search: searchText,
      sort: sortBy,
      order: sortOrder
    });
  }
    
  

  return (
    <div className="w-100 flex">
      <div className="search_col flex">
        <input
          type="text"
          name="search"
          id="search"
          className="input input_txt"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="input btn-search" onClick={callSort}>🔍</button>
      </div>
      <div className="sort_col flex">
        <select name="sort" id="sort" className="input input_sel" value={sortBy} onChange={(e) => {setSort(e.target.value);callSort();}}>
          <option value="">Sort By</option>
          <option value="Value">Value</option>
          <option value="PFName">Name</option>
        </select>
        <div className="btn-group">
          <button className="input btn" onClick={() => {setOrder(1);callSort();}}>▲</button>
          <button className="input btn" onClick={() => {setOrder(-1);callSort();}}>▼</button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
