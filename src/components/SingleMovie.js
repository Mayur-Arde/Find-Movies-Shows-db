import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from '../context';
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [movie, setMovie] = useState({});

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.Response === 'False') {
      setError({ show: true, msg: data.Error });
      setIsloading(false);
    } else {
      setMovie(data);
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isloading) {
    return <div className="loading"></div>;
  }

  if (error.show) {
    return <div className="page-error">{error.msg}</div>;
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year, imdbRating: rating } = movie;
  return (
    <section className="single-movie">
      <img src={poster === 'N/A' ? url : poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>⭐{rating}/10</h4>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
