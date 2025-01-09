import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Form from './components/Form';
import ArticleList from './pages/ArticleList';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchArticles();
  }, []);
  function fetchArticles() {
    axios.get('http://localhost:3000/posts').then((response) => {
      console.log(response.data);
      setArticles(response.data);
    }).catch((err) => {
      setError('Errore durante il recupero degli articoli.');
    }).finally(() => {
      setLoading(false);
    });
  };
  //AddArticle
  const addArticle = async (article) => {
    try {
      console.log("Dati inviati al backend:", article);
      const response = await axios.post('http://localhost:3000/posts', article);
      console.log('Articolo aggiunto:', response.data);
      setArticles([...articles, response.data]);
    } catch (err) {
      console.error('Errore durante l\'aggiunta dell\'articolo:', err);
      alert("Errore nell'aggiungere l'articolo");
    }
  };

  //RemoveArticle
  const removeArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (err) {
      console.error('Errore durante l\'eliminazione dell\'articolo:', err);
    }
  };

  // Render in caso di errore
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // Render in caso di caricamento
  if (loading) {
    return <p>Caricamento degli articoli...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage articles={articles} onRemoveArticle={removeArticle} />} />
        <Route path="/new" element={<Form onAddArticle={addArticle} />} />
      </Routes>
    </BrowserRouter>
    /*<div className='container'>
      <h1>Handle Blog's Articles</h1>
      <Form onAddArticle={addArticle} />
      <ArticleList articles={articles} onRemoveArticle={removeArticle} />
    </div>*/
  );
}

export default App;
