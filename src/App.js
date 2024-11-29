import logo from './logo.svg';
import './App.css';
import RenderCards from './Components/Rendercards';
import Deck from "./Components/Deck"

function App() {
  return (
    <div className="App">
      <RenderCards />
      <Deck />
    </div>
  );
}

export default App;
