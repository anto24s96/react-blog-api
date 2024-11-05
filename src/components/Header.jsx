export default function ({ onOpenForm, isOpen }) {
    return (
        <header>
            <h1>Cooking Blog</h1>
            <div className="button-create-post">
                <button onClick={onOpenForm} className="my-button">
                    {isOpen ? "Chiudi" : "Crea"}
                </button>
            </div>
        </header>
    );
}
