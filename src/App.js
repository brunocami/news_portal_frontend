import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Aos from "aos";
import Navbar from "./components/navbar";
import GetNews from "./functions/get_news";
import GetArgNews from "./functions/getArgNews";
import GetOneNews from "./functions/getOneNews";
import SearchNews from "./functions/searchNews";
import GetTechnoNews from "./functions/getTechnoNews";

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
          </Routes>
      </Router>
  );
}

export default App;
