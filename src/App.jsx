import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Topics from "./components/Topics";
import Users from "./components/Users";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <Routes>
          <Route
            path="/topics"
            element={<Topics />}
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
        </Routes>
      </main>
    </>
  );
}

export default App;
