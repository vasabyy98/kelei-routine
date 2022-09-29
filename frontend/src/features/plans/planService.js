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

// get user plans
const getPlans = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// delete plan
const deletePlan = async (planId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + planId, config);

  return response.data;
};

// update plan
const updatePlan = async (data, token) => {
  const { id, plan } = data;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, plan, config);

  return response.data;
};

const planService = {
  getPlans,
  createPlan,
  deletePlan,
  updatePlan,
};

export default planService;
