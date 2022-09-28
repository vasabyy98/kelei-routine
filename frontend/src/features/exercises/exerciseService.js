import axios from "axios";

const API_URL = "/api/exercises/";

// create new exercise
const createExercise = async (exerciseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, exerciseData, config);

  return response.data;
};

// get user exercises
const getExercise = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// delete exercise
const deleteExercise = async (exerciseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + exerciseId, config);

  return response.data;
};

// update exercise
const updateExercise = async (data, token) => {
  const { id, exercise } = data;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, exercise, config);

  return response.data;
};

const exerciseService = {
  createExercise,
  getExercise,
  deleteExercise,
  updateExercise,
};

export default exerciseService;
