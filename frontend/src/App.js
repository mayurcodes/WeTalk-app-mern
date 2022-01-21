import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ChatScreen from "./screen/ChatScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/chats">
            <ChatScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
