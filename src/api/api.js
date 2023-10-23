import axios from "axios";

export const fetchArticles = () => {
  return axios
    .get(`https://northcoders-project.onrender.com/api/articles`)
    .then(({ data }) => {
      return data;
    });
};
