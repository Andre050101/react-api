import React, { useState } from 'react'
import Form from './components/Form';
import ArticleList from './components/ArticleList';

function App() {
  const [articles, setArticles] = useState([]);

  //AddArticle
  const addArticle = (article) => {
    setArticles([...articles, article]);
  };

  //RemoveArticle
  const removeArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div className='container'>
      <h1>Handle Blog's Articles</h1>
      <Form onAddArticle={addArticle} />
      <ArticleList articles={articles} onRemoveArticle={removeArticle} />
    </div>
  );
}

export default App
