import React, { useState } from 'react'
import axios from 'axios';
import Form from './components/Form';
import ArticleList from './components/ArticleList';

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        setArticles(response.data);
      } catch (err) {
        setError('Errore durante il recupero degli articoli.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  //AddArticle
  const addArticle = async (article) => {
    try {
      const response = await axios.post('http://localhost:3000/posts', article);
      setArticles([...articles, response.data]);
    } catch (err) {
      console.error('Errore durante l\'aggiunta dell\'articolo:', err);
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
    <div className='container'>
      <h1>Handle Blog's Articles</h1>
      <Form onAddArticle={addArticle} />
      <ArticleList articles={articles} onRemoveArticle={removeArticle} />
    </div>
  );
}

export default App;
