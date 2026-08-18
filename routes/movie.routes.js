const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json('No movie found by this id');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/title/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const movieByTitle = await Movie.find({ title });
    return res.status(200).json(movieByTitle);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/genre/:genre', async (req, res) => {
  const { genre } = req.params;

  try {
    const movieByGenre = await Movie.find({ genre });
    return res.status(200).json(movieByGenre);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/year/:year', async (req, res) => {
  const { year } = req.params;

  try {
    const movieByYear = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movieByYear);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// a partir de aquí es lo nuevo del proyecto 5: crear, modificar y borrar
router.post('/movies', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie) {
      return res.status(404).json('No movie found by this id');
    }
    return res.status(200).json(updatedMovie);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json('No movie found by this id');
    }
    return res.status(200).json(deletedMovie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
