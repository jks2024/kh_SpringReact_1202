import './App.css';
import Login from './Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Home" element={<Home />} />
            </Routes>
        </Router>
    );
}
export default App;
