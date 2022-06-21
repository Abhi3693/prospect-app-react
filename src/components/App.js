import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Header";
import Prospects from "./Prospects";
import NotFound from "./NotFound";
import NoData from "./NoData";
import AddProspect from "./AddProspect";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Prospects />}/>
          <Route path="/add" element={<AddProspect />}/>
          <Route path="/email" element={<NoData />}/>
          <Route path="/event" element={<NoData />}/>
          <Route path="/compaign" element={<NoData />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App; 