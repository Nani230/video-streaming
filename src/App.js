import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Player from "./component/Player";
import Register from "./component/Register";
import Videos from "./component/Videos";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/player/:id" element={<Player />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
