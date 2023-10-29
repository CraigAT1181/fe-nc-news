import axios from "axios";

const api = axios.create({
  baseURL: "https://northcoders-project.onrender.com/api",
});

export default api;

export const getArticles = async (queryString) => {
  const { data } = await api.get(`/articles?${queryString}`);

  return data;
};

export const getTopics = async () => {
  const { data } = await api.get("/topics");

  return data;
};

export const getArticleByID = async (article_id) => {
  const { data } = await api.get(`/articles/${article_id}`);

  return data;
};

export const getComments = async (article_id) => {
  const { data } = await api.get(`/articles/${article_id}/comments`);

  return data;
};