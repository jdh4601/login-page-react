import Register from './Register';
import Login from './Login';
import Home from './home';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </BrowserRouter>
    </main>
  );
}

export default App;
