import "./App.css";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";
import { Questions } from "./pages/Questions/Questions";
import { Users } from "./pages/Users/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-nav">
          <NavigationBar />
        </div>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
