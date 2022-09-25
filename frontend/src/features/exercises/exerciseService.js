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

const exerciseService = {
  createExercise,
  getExercise,
};

export default exerciseService;
