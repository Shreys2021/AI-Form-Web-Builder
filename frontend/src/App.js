import { useState } from "react";
import WebsiteForm from "./components/WebsiteForm";
import Suggestions from "./components/Suggestions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuggestionsPage from "./pages/SuggestionsPage";

function App() {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebsiteForm />} />
        <Route path="/aiSuggestions" element={<SuggestionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
