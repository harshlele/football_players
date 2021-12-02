import {useState, useEffect} from "react";

function TopBar(props) {
  const [searchText,setSearch] = useState("");

  const callSort = (event,val) => {
    props.sortFilter({event,val});
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
        <button className="input btn-search" onClick={() => callSort("search",searchText)}>🔍</button>
      </div>
      <div className="sort_col flex">
        <select name="sort" id="sort" defaultValue="Value"  className="input input_sel" onChange={(e) => callSort("sort",e.target.value)}>
          <option value="">Sort By</option>
          <option value="Value">Value</option>
          <option value="PFName">Name</option>
        </select>
        <div className="btn-group">
          <button className="input btn" onClick={() => callSort("order",1)}>▲</button>
          <button className="input btn" onClick={() => callSort("order",-1)}>▼</button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
