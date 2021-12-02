import TopBar from "./TopBar";
import Card from "./Card";
import {useState, useEffect} from "react";

const imgAssets = {}; 
const imgImport  = require.context("./assets/player-images", false, /.*\.jpg$/);
imgImport.keys().forEach((key) => {
  imgAssets[key.replace("./","").replace(".jpg","") ] = imgImport(key).default;
});

function App() {
  const [players,setPlayers] = useState([]);
  const [playerDisp,setPlayerDisp] = useState([]);
  const [filters, setFilters] = useState({
    search: null,
    sort: "Value",
    order: 1
  });


  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c",{
      method: "GET"
    })
    .then(r => r.json())
    .then(res => {
      let p = res.playerList.map(p => ({...p,img: imgAssets[p.Id]}));
      setPlayers(p);
      let filtered = p.sort((a,b) => parseFloat(a.Value) - parseFloat(b.Value));
      setPlayerDisp(filtered);
    });
  
  },[]);

  useEffect(() => {
    let newList = 
      players.filter(p => {
        if(!filters.search) return true;
        let s = filters.search.toLowerCase();
        return p.TName.toLowerCase().includes(s) || p.PFName.toLowerCase().includes(s);
      })
      .sort((a,b) => {
        if(filters.sort == '') return 0;
        if(filters.sort == "Value"){
          return (parseFloat(a.Value) - parseFloat(b.Value)) * filters.order;
        }
        else {
          return (a.PFName.toLowerCase() < b.PFName.toLowerCase() ? -1 : 1) * filters.order;
        }
      });
      setPlayerDisp(newList);
  },[filters]);

  const onSortFilter = (e) => {
    let newVal = {...filters}
    newVal[e["event"]] = e["val"];
    setFilters(newVal);
  }

  return (
    <div className="App">
      <div className="container">
        <TopBar sortFilter={onSortFilter}/>

        <div className="w-100 grid card_cont">
          {
            playerDisp.map(p => <Card key={p.Id} player={p}/>)
          }
          
        </div>

      </div>
    </div>
  );
}

export default App;
