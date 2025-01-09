import React from "react";
import ArticleList from "./ArticleList"; // Importa il componente ArticleList

const Homepage = ({ articles, onRemoveArticle }) => {
    return (
        <div>
            <h1>Handle Blog's Articles</h1>
            <ArticleList articles={articles} onRemoveArticle={onRemoveArticle} />
        </div>
    );
};

export default Homepage;