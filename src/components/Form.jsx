import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "./Form.module.css"

const Form = ({ onAddArticle }) => {
    //Variabili di stato per i campi dei post
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [state, setState] = useState("");

    //Riferimento per input di file
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    //Metodo per gestione immagini
    const HandleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file!");
                return;
            }
            setImage(URL.createObjectURL(file));
        }
    }
    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setTags((prevTags) => {
            if (checked) {
                return [...prevTags, value];
            } else {
                return prevTags.filter((tag) => tag !== value);
            }
        });
    };

    const handleFileReset = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Check if the title is provided
        if (!title.trim()) return alert("Title is required");

        // Create a new article object with the form data
        const newArticle = {
            titolo: title,
            contenuto: content,
            tags: tags,
            image: image,
            author: author,
            category: category,
            status: status
        };

        try {
            const response = await axios.post("http://localhost:3000/posts", newArticle, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Nuovo post aggiunto:", response.data);

            // Ripristino stato del form
            setTitle("");
            setAuthor("");
            setStatus("");
            setImage(null);
            setContent("");
            setCategory("");
            setTags([]);
            setState("");
            handleFileReset();
            navigate("/");
        }
        catch (error) {
            console.error("Errore:", error);
            alert("Errore durante l'aggiunta del post");
        }

    };


    return (
        <>
            <h1>Add New Article</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter article title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Author:</label>
                        <input
                            type="text"
                            placeholder="Enter article author"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="" disabled>Choose a status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            name="Image"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={HandleImage}

                        />
                        {image && <img src={image} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
                    </div>
                    <div>
                        <label>Content:</label>
                        <br />
                        <textarea
                            name="Content"
                            placeholder="Enter article content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>Choose a category</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="cooking">Cooking</option>
                            <option value="travel">Travel</option>
                            <option value="sport">Sport</option>
                            <option value="music">Music</option>
                            <option value="art">Art</option>
                            <option value="formation">Formation</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="finance">Finance</option>
                        </select>
                    </div>
                    <div>
                        <label>Tags:</label>
                        <div className={styles.tagsContainer}>
                            <label>
                                <input
                                    className={styles.tags}
                                    type="checkbox"
                                    value="Technology"
                                    onChange={handleTagChange}
                                />
                                Technology
                            </label>
                            <label>
                                <input
                                    className={styles.tags}
                                    type="checkbox"
                                    value="Health"
                                    onChange={handleTagChange}
                                />
                                Health
                            </label>
                            <label>
                                <input
                                    className={styles.tags}
                                    type="checkbox"
                                    value="Business"
                                    onChange={handleTagChange}
                                />
                                Business
                            </label>
                            <label>
                                <input
                                    className={styles.tags}
                                    type="checkbox"
                                    value="Lifestyle"
                                    onChange={handleTagChange}
                                />
                                Lifestyle
                            </label>
                        </div>
                    </div>
                    <button type="submit">Add Article</button>
                </form>
            </div>

        </>

    );
};

export default Form;