import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Users from "./components/Users";
import SingleArticle from "./components/SingleArticle";
import Home from "./components/Home";
import CommentCard from "./components/CommentsCard";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/home"
            element={<Home />}
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
        </Routes>
      </main>
    </>
  );
}

export default App;
