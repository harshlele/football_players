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
  const [teams,setTeams] = useState([]);

  console.log(imgAssets);

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c",{
      method: "GET"
    })
    .then(r => r.json())
    .then(res => {
      let p = res.playerList.map(p => ({...p,img: imgAssets[p.Id]}));
      setPlayers(p);
      setTeams(res.teamsList);
    });
  
  },[]);

  const onSortFilter = (filter) => {
    console.log(filter);
  }

  return (
    <div className="App">
      <div className="container">
        <TopBar sortFilter={onSortFilter}/>

        <div className="w-100 grid card_cont">
          {
            players.map(p => <Card key={p.Id} player={p}/>)
          }
          
        </div>

      </div>
    </div>
  );
}

export default App;
