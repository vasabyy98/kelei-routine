import axios from "axios";

const API_URL = "/api/plans/";

// create new plan
const createPlan = async (planData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, planData, config);

  return response.data;
};

// get plans
const getPlans = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// remove plans
const deletePlan = async (planId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + planId, config);

  return response.data;
};

const planService = {
  createPlan,
  getPlans,
  deletePlan,
};

export default planService;
