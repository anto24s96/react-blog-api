import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Multiform from "./components/Multiform";
import Posts from "./components/Posts";
import Paginator from "./components/Paginator";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function () {
    //State per aprire e chiudere il form
    const [isOpen, setIsOpen] = useState(false);
    //State per contenere i post
    const [posts, setPosts] = useState([]);
    //State per la pagina corrente
    const [currPage, setCurrPage] = useState(1);
    //State per settare il numero totale delle pagine
    const [totalPages, setTotalPages] = useState(0);
    //State per contenere le categorie
    const [categories, setCategories] = useState([]);
    //State per contenere i tag
    const [tags, setTags] = useState([]);
    //State per la modale di conferma per l'eliminazione
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostSlug, setSelectedPostSlug] = useState(null);

    //Funzione per aprire il form
    const openForm = () => {
        setIsOpen(!isOpen);
    };

    // Funzione per aprire la modale di eliminazione
    const openDeleteModal = (slug) => {
        setSelectedPostSlug(slug);
        setIsModalOpen(true);
    };

    // Funzione per chiudere la modale di eliminazione
    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setSelectedPostSlug(null);
    };

    // Funzione per confermare l'eliminazione
    const confirmDeletePost = async () => {
        if (selectedPostSlug) {
            await deletePost(selectedPostSlug);
            closeDeleteModal();
        }
    };

    //Fetch per recuperare i post
    const fetchPosts = async (page = currPage) => {
        try {
            const url = `${apiUrl}/posts?page=${page}&limit=5`;
            const { data } = await axios.get(url);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
            setCurrPage(page);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    //Fetch delle categorie
    const fetchCategories = async () => {
        try {
            const url = `${apiUrl}/categories`;
            const { data } = await axios.get(url);
            setCategories(data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    //Fetch dei tag
    const fetchTags = async () => {
        try {
            const url = `${apiUrl}/tags`;
            const { data } = await axios.get(url);
            setTags(data.tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    //Fetch per eliminare il singolo post
    const deletePost = async (slug) => {
        try {
            const url = `${apiUrl}/posts/${slug}`;
            await axios.delete(url);
            setPosts((prevPost) =>
                prevPost.filter((post) => post.slug !== slug)
            );
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchCategories();
        fetchTags();
    }, [currPage]);

    return (
        <>
            <Header onOpenForm={openForm} isOpen={isOpen} />

            {isOpen && (
                <Multiform
                    categories={categories}
                    tags={tags}
                    onClose={() => setIsOpen(false)}
                    reFetchPosts={() => fetchPosts(1)}
                />
            )}
            <Paginator
                currPage={currPage}
                totalPages={totalPages}
                setCurrPage={setCurrPage}
            />
            <Posts posts={posts} onDelete={openDeleteModal} />

            {/* Modale di conferma eliminazione */}
            <Dialog open={isModalOpen} onClose={closeDeleteModal}>
                <DialogTitle>{"Conferma Eliminazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sei sicuro di voler eliminare questo post? Questa azione
                        non può essere annullata.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteModal} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={confirmDeletePost} color="error">
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
