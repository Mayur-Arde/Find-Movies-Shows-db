import React, { useState, useContext, useEffect } from 'react';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
console.log(API_ENDPOINT);

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ show: true, msg: '' });
  const [query, setQuery] = useState('Thor');

  const fetchMovies = async (url) => {
    setIsloading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError({ show: false, msg: '' });
        // setIsloading(false);
      } else {
        setError({ show: true, msg: data.Error });
      }
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, movies, error, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
