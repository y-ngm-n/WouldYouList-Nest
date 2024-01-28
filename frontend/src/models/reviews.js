import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8000";

const getReviews = async () => {
  const res = await axios.get(`${url}/reviews`);
  console.log(res.data);
  return res.data;
}

const createReview = async (review) => {
  const res = await axios.post(`${url}/reviews`, review, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  console.log(res);
  return res.data;
}

export { getReviews, createReview };