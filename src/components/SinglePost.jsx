export default function ({ title, image, category, content, tags, published }) {
    return (
        <li className="blog-item">
            <div className="title-image-container">
                <span style={{ display: "inline-block", textAlign: "center" }}>
                    {title}
                </span>
                {image && (
                    <img src={image} alt={title} className="blog-image" />
                )}
            </div>
            <div className="blog-info-container">
                <span>Categoria: {category}</span>
                <p>Descrizione: {content}</p>
                <p>
                    {tags.length > 0
                        ? tags.map((tag, index) => (
                              <span key={index} className="tag-block">
                                  #{tag}
                              </span>
                          ))
                        : "Nessun tag"}
                </p>
                <p>Stato: {published ? "Pubblicato" : "Non pubblicato"}</p>
            </div>
        </li>
    );
}
