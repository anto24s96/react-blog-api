import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function ({ categories, tags, onClose, reFetchPosts }) {
    // Dati di default per un nuovo blog
    const initialData = {
        title: "",
        image: "",
        content: "",
        categoryId: "",
        tags: [],
        published: false,
    };

    // State per memorizzare i dati dell'articolo corrente in fase di creazione
    const [formData, setFormData] = useState(initialData);
    //State per memorizzare gli errori
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        const errors = {};

        // Validazione del titolo
        if (!formData.title.trim()) {
            errors.title = "Il titolo è obbligatorio.*";
        } else if (formData.title.length < 5) {
            errors.title = "Il titolo deve avere almeno 5 caratteri.";
        }

        // Validazione dell'immagine
        if (!formData.image.trim()) {
            errors.image = "L'immagine è obbligatoria.*";
        } else if (!/^https?:\/\/\S+\.\S+$/.test(formData.image)) {
            errors.image = "Il campo immagine deve essere un URL valido.";
        }

        // Validazione del contenuto
        if (!formData.content.trim()) {
            errors.content = "Il contenuto è obbligatorio.*";
        } else if (formData.content.length < 10) {
            errors.content = "Il contenuto deve avere almeno 10 caratteri.";
        }

        return errors;
    };

    //Funzione per gestire il submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return; //Blocco invio
        }

        const url = `${apiUrl}/posts`;

        try {
            const res = await axios.post(url, formData);
            // Resetto i campi input
            setFormData(initialData);
            setErrors({});
            reFetchPosts();
            onClose();
        } catch (error) {
            console.error("Errore durante la creazione del post:", error);
            console.error("Dettagli:", error.response?.data); // Eventuali dettagli dall'API
        }
    };

    // Funzione per aggiornare un campo specifico nel form dell'articolo
    const handleField = (key, newValue) => {
        setFormData((data) => ({ ...data, [key]: newValue }));
    };

    // Funzione per gestire l'aggiunta o rimozione di un tag nell'articolo
    const handleTagChange = (tag) => {
        setFormData((prevData) => {
            // Controllo se il tag è già presente
            const isTagSelected = prevData.tags.includes(tag);
            const newTags = isTagSelected
                ? prevData.tags.filter((t) => t !== tag) // Rimuovo il tag se era selezionato
                : [...prevData.tags, tag]; // Aggiungo il tag se non era selezionato

            return { ...prevData, tags: newTags };
        });
    };

    return (
        <>
            <div className="main-container">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-element">
                            {/* title */}
                            <label htmlFor="title">Titolo Blog: </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Inserisci il titolo del blog"
                                value={formData.title}
                                className={`input-field ${
                                    errors.title ? "error" : ""
                                }`}
                                onChange={(e) =>
                                    handleField("title", e.target.value)
                                }
                            />
                            {errors.title && (
                                <p className="errors-text">{errors.title}</p>
                            )}
                        </div>
                        <div className="form-element">
                            {/* image */}
                            <label htmlFor="image">URL Immagine: </label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                placeholder="Inserisci l'URL dell'immagine"
                                value={formData.image}
                                className={`input-field ${
                                    errors.image ? "error" : ""
                                }`}
                                onChange={(e) =>
                                    handleField("image", e.target.value)
                                }
                            />
                            {errors.image && (
                                <p className="errors-text">{errors.image}</p>
                            )}
                        </div>
                        <div className="form-element">
                            {/* content */}
                            <label htmlFor="content">Descrizione: </label>
                            <textarea
                                id="content"
                                value={formData.content}
                                rows="10"
                                placeholder="Inserisci una descrizione per il Blog..."
                                onChange={(e) =>
                                    handleField("content", e.target.value)
                                }
                                className={`input-field ${
                                    errors.content ? "error" : ""
                                }`}
                            />
                            {errors.content && (
                                <p className="errors-text">{errors.content}</p>
                            )}
                        </div>
                        <div className="form-element">
                            {/* category */}
                            <label htmlFor="category">Categoria: </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.categoryId}
                                onChange={(e) =>
                                    handleField(
                                        "categoryId",
                                        Number(e.target.value)
                                    )
                                }
                                className="input-field"
                            >
                                <option value="" disabled>
                                    Seleziona una categoria
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="checkbox-container">
                            <div className="form-element tags">
                                {/* tags */}
                                <label>Tags: </label>
                                {tags.map((tag) => (
                                    <div key={tag.id} className="tag-item">
                                        <input
                                            type="checkbox"
                                            id={tag.id}
                                            checked={formData.tags.includes(
                                                tag.id
                                            )}
                                            onChange={() =>
                                                handleTagChange(tag.id)
                                            }
                                            className="checkbox"
                                        />
                                        <label
                                            htmlFor={tag.id}
                                            className="tag-label"
                                            style={{ marginBottom: "0" }}
                                        >
                                            {tag.name}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="publish-container">
                                {/* published */}
                                <label
                                    htmlFor="published"
                                    style={{ marginBottom: "0" }}
                                >
                                    Pubblica:
                                </label>
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) =>
                                        handleField(
                                            "published",
                                            e.target.checked
                                        )
                                    }
                                    className="checkbox"
                                />
                            </div>
                        </div>

                        <div className="button-container">
                            {/* button submit */}
                            <button type="submit" className="my-button">
                                <span>Aggiungi</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
