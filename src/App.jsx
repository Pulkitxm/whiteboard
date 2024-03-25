import "./App.css";

import AppBar from "./components/AppBar";
import WhiteBoard from "./components/WhiteBoard";

const App = () => {
  return (
    <div className="app" >
      <AppBar />
      <WhiteBoard />
    </div>
  );
};

export default App;