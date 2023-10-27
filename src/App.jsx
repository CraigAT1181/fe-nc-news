import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Users from "./components/Users";
import SingleArticle from "./components/SingleArticle";
import CommentCard from "./components/CommentsCard";
import ErrorHandling from "./components/ErrorHandling";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Articles />}
          />
          <Route
            path="/home"
            element={<Articles />}
          />
          <Route
            path="/articles"
            element={<Articles />}
          />
          <Route
            path="/users"
            element={<Users />}
          />
          <Route
            path="/articles/:article_id"
            element={<SingleArticle />}
          />
          <Route
            path="/comments/:comment_id"
            element={<CommentCard />}
          />
          <Route
            path="/*"
            element={<ErrorHandling />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
