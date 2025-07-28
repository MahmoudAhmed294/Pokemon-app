import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <main className='app-content'>
            <Routes>
              <Route path='/' element={<PokemonList />}>
                <Route path='pokemon/:id' element={<PokemonDetail />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
