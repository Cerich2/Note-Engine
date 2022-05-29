import "./App.css";
import Header from "./components/Header/Header"
import LandingPage from "./Pages/LandingPage"
import MyNotes from "./Pages/MyNotes";
import Login from "./Pages/Login"
import Signup from "./Pages/SignUp"
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./components/Footer/Footer"
import Snackbar from "./components/Styles/Snackbar"


const App = () => {
  return (
    <Box>
      <Header />
      <Snackbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/my-notes" element={<MyNotes/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Signup/>} />
        </Routes>
          <Footer/>
    </Box>
    )
}

export default App;
