import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialValue = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieForm = props => {
    const [updateMovie, setUpdateMovie] = useState(initialValue);

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setUpdateMovie(res.data))
        .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleChange = e => {
        setUpdateMovie({
            ...updateMovie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${updateMovie.id}`, updateMovie)
        .then(res => {
            setUpdateMovie(initialValue)
            props.history.push(`/movies/${props.match.params.id}`)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Update Movies</h1>
            <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="title"
            placeholder="Movie title"
            value={updateMovie.title}
            onChange={handleChange}
            />
            <input 
            type="text"
            name="director"
            placeholder="Movie Director"
            value={updateMovie.director}
            onChange={handleChange}
            />
            <input 
            type="number"
            name="metascore"
            placeholder="Metascore"
            value={updateMovie.metascore}
            onChange={handleChange}
            />
            <input 
            type="text"
            name="stars"
            placeholder="Stars"
            value={updateMovie.stars}
            onChange={handleChange}
            />
        <button type="submit"> Update Movie</button>
            </form>
        </div>
    )
}

export default MovieForm;