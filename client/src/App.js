import "./App.css";
import Nav from "./components/Nav";
import Characters_List from "./components/Characters_List";
import AddHero from "./components/AddHero";
import AddSigil from "./components/AddSigil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import weaponList from "./components/images/weapon_list.gif";
import weapon from "./components/images/weapon.gif";
import weapon_suggest from "./components/images/weapon_suggest.png";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Main">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/character/:occupation" component={Characters_List} />
            <Route path="/addHero" component={AddHero} />
            <Route path="/addSigil" component={AddSigil} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="Home">
      <h1>克魯賽德戰記</h1>
      <div>
        在這款手遊中因為同一角色在PVP、PVE中需要使用的能力素質不同，武器需要不同的屬性，所以根據網路資料會有多個建議屬性跟自身已有的武器。
      </div>
      <div>
        但是因遊戲UI問題，每次新增武器或是改變原有武器，比對資料繁瑣，所以我想自己寫一個方便記錄武器的網頁
      </div>
      <img src={weaponList} alt="weapon list" style={{ width: "50%" }} />
      <img src={weapon} alt="weapon" style={{ width: "50%" }} />
      <img src={weapon_suggest} alt="weapon_suggest" />
      <p/>
      <div>
        武器建議屬性資料來源:{" "}
        <a href="https://wiki.biligame.com/cq/%E9%A6%96%E9%A1%B5">
          {" "}
          克魯賽德戰記wiki
        </a>
        , Discord 討論群
      </div>
    </div>
  );
};

export default App;
