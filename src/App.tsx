import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='app-container'>
          <header className='app-header'>
            <h1>PokeReact</h1>
          </header>
          <main className='app-content'>
            <Routes>
              <Route path='/' element={<Navigate to='/pokemon' />} />
              <Route path='/pokemon' element={<PokemonList />} />
              <Route path='/pokemon/:id' element={<PokemonDetail />} />
              <Route path='*' element={<Navigate to='/pokemon' />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
