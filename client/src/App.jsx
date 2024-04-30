import React from 'react';
import './App.css';
import useTrips from './hooks/useTrips';
import Header from './components/Header';
import Tripcard from './components/Tripcard';


function App() {
  const { searchTerm, setSearchTerm, results, error } = useTrips();



  return (
    <div className="app">
      <Header title="เที่ยวไหนดี" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />      
     
     
    </div>
  );
}

export default App;


