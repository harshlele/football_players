function Card({player}) {

  const getMatch = () => {
    let m = player.UpComingMatchesList[0];
    if(!m.CCode || !m.VsCCode) return "N/A";
    return `${m.CCode} vs. ${m.VsCCode}`;
  };

  const getMatchDate = () => {
    let d = new Date(player.UpComingMatchesList[0].MDate);
    if(d.toString() == "Invalid Date") return "";
    let utcDate = new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()));
    return "At " + utcDate.toLocaleString();
  }

  return (
    <div
      className="card flex"
      key={player.Id}
      style={{ backgroundImage: `url(${player.img})` }}
    >
      <div className="card_details">
        <div className="w-100 flex">
          <span className="red">{player.PFName}</span>
        </div>
        <div className="w-100 flex player_stats">
          <span>{player.SkillDesc}</span>
          <span className="green">{`$${player.Value}M`}</span>
        </div>
        <div className="w-100 flex player_stats">
          <span className="red">Upcoming Match</span>
        </div>
        <div className="w-100 flex player_stats">
          <span>{getMatch()}</span>
        </div>
        <div className="w-100 flex player_stats">
          <span>{getMatchDate()}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
