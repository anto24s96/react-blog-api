import { useState } from "react";
import SinglePost from "./SinglePost";

export default function ({ posts }) {
    return (
        <div className="posts">
            {posts === null && "Caricando i post"}
            {posts?.length === 0 && "Nessun post trovato"}

            <div className="blog-list-container">
                <ul className="blog-list">
                    {posts.map((p) => (
                        <SinglePost
                            key={p.id}
                            title={p.title}
                            image={
                                p.image
                                    ? p.image
                                    : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                            }
                            content={p.content}
                            category={p.category.name}
                            tags={p.tags.map((t) => t.name)}
                            published={p.published}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
