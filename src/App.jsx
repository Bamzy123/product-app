import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import ProductDescription from "./components/productdescription/ProductDescription";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDescription />} />
    </Routes>
  </Router>
);

export default App;