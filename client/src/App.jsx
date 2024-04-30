import React from 'react';
import './App.css';
import useTrips from './hooks/useTrips';
import Header from './components/Header';
import Tripcard from './components/Tripcard';


function App() {
  const { searchTerm, setSearchTerm, results, error } = useTrips();

  // click tag จะเพิ่มคำไป searchTerm
  const handleTagClick = (tag) => {
    const newSearchTerm = `${searchTerm}${searchTerm ? ' ' : ''}${tag}`;
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="app">
      <Header title="เที่ยวไหนดี" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />      
      <div className="results-container">
        {results.map(trip => (
          <Tripcard key={trip.eid} trip={trip} handleTagClick={handleTagClick} />
        ))}
      </div>     
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;


