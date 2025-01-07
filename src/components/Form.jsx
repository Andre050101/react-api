import React, { useState, useRef } from "react";
import styles from "./Form.module.css"

const Form = ({ onAddArticle }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [state, setState] = useState("");

    const fileInputRef = useRef(null);
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
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Check if the title is provided
        if (!title.trim()) {
            e.preventDefault();
            if (!title.trim())
                return alert("Title is required");
        }

        // Create a new article object with the form data
        const newArticle = {
            id: Date.now(),
            title,
            author,
            status,
            image,
            content,
            category,
            tags,
            state
        };

        // Add the new article using the provided callback
        onAddArticle(newArticle);

        // Reset form fields to their initial states
        setTitle("");
        setAuthor("");
        setStatus("");
        setImage(null);
        setContent("");
        setCategory("");
        setTags([]);
        setState("");

        // Reset the file input
        handleFileReset();
    };
    /******  455d775c-d99e-4d93-b7d9-70028bf3c0e7  *******/

    return (
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
    );
};

export default Form;