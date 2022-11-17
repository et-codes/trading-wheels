import { Routes, Route } from 'react-router-dom';
import { NotFound } from './pages';


function App() {
  return (
    <div>
      <header>
        <h1 className="text-primary">Trading Wheels</h1>
        <p>A fantasy stock-trading app.  See what you can do with $100k of virual cash!</p>
      </header>
      <Routes>
        <Route path="/" element={<p>Home page.</p>} />
        <Route path="/trade" element={<p>Trading page.</p>} />
        <Route path="/portfolio" element={<p>Portfolio page.</p>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
