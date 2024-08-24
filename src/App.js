import './App.css';
import Header from './components/header.js';
import Home from './pages/home.js';
import Footer from './components/footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer/>
    </div>
  );
}

export default App;
