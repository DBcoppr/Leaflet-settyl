import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BasicMap from './component/Leafmap';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<BasicMap/>}></Route>
    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
