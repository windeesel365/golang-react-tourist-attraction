import React from 'react';
import './App.css';
import useTrips from './hooks/useTrips';



function App() {
  const { searchTerm, setSearchTerm, results, error } = useTrips();



  return (
    <div className="app">
     
    </div>
  );
}

export default App;
