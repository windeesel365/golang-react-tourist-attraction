import { useState, useEffect } from 'react';
import axios from 'axios';

const useTrips = (initialKeyword = '') => {
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async (keywords) => {
      try {
        const response = await axios.get(`http://localhost:4001/trips?keywords=${keywords}`);
        setResults(response.data.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch trips');
        setResults([]);
      }
    };

    fetchTrips(searchTerm);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, results, error };
};

export default useTrips;
