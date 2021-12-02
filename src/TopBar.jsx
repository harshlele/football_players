import {useState, useEffect} from "react";

function TopBar(props) {
  const [searchText,setSearch] = useState("");
  const [order,setOrder] = useState(1);

  const callSort = (event,val) => {
    if(event == "order") setOrder(val);
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
        <button className="input btn-search" onClick={() => {callSort("search",'');setSearch('');}}>╳</button>
      </div>
      <div className="sort_col flex">
        <select name="sort" id="sort" defaultValue="Value"  className="input input_sel" onChange={(e) => callSort("sort",e.target.value)}>
          <option value="Value">Value</option>
          <option value="PFName">Name</option>
        </select>
        <div className="btn-group">
          <button className="input btn" onClick={() => callSort("order",1)} style={{backgroundColor: order == 1 ? 'grey' : 'initial'}}>▲</button>
          <button className="input btn" onClick={() => callSort("order",-1)} style={{backgroundColor: order == -1 ? 'grey' : 'initial'}}>▼</button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
