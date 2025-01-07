import React from "react";
import styles from "./ArticleList.module.css"

const ArticleList = ({ articles, onRemoveArticle }) => {
    if (articles.length === 0) {
        return <p className={styles.noArticles}>No articles yet</p>;
    }

    return (
        <ul>
            {articles.map((article) => (
                <li key={article.id}>
                    <div>
                        <h3>{article.title}</h3>
                        <p><strong>Author:</strong> {article.author}</p>
                        <p><strong>Status:</strong> {article.status}</p>
                        <p><strong>Image:</strong></p>
                        {article.image && (
                            <img
                                src={article.image}
                                alt={article.title}
                                className={styles.articleImage} // Aggiunto stile
                            />
                        )}
                        <p className={styles.content}><strong>Content:</strong> {article.content}</p>
                        <p><strong>Category:</strong> {article.category}</p>
                        <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
                    </div>
                    <button className={styles.btn} onClick={() => onRemoveArticle(article.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ArticleList;