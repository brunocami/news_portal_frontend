import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Aos from "aos";
import Navbar from "./components/Navbar/navbar";
import GetNews from "./components/get_news";
import GetArgNews from "./components/getArgNews";
import GetOneNews from "./components/getOneNews";
import SearchNews from "./components/searchNews";
import GetTechnoNews from "./components/getTechnoNews";
import Error404 from "./components/error404";
import Bottombar from "./components/Bottombar/bottombar";

function App() {
  useEffect(() => {
    Aos.init()
  }, [])
  return (
      <Router>
        <Navbar />  
          <Routes>
            <Route path="/" Component={GetNews} />
            <Route path="/news/ar" Component={GetArgNews} />
            <Route path="/news/:id" Component={GetOneNews} />
            <Route path="/news/search" Component={SearchNews} />
            <Route path="/news/technology" Component={GetTechnoNews} />
            <Route Component={Error404} />
          </Routes>
          <Bottombar/>
      </Router>
  );
}

export default App;
