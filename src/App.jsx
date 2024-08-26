import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Routes/Home"
import Search from "./Routes/Search"
import Tv from "./Routes/TV"


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/movie/:id'} element={<Home />} />
        <Route path="/Tv" element={<Tv />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
