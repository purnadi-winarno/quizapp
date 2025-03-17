import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ... existing content ... */}
      
      {/* Add the Footer at the bottom */}
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

export default App; 