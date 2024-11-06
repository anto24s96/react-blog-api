import { FaMinus as Meno, FaPlus as Piu } from "react-icons/fa";

export default function ({ currPage, totalPages, setCurrPage }) {
    return (
        <div className="paginator">
            {currPage - 1 > 0 && (
                <button
                    onClick={() => setCurrPage((curr) => curr - 1)}
                    className="my-button"
                >
                    <Meno />
                </button>
            )}
            <span style={{ display: "inline-block" }}>
                Pagina corrente {currPage}
            </span>
            {currPage + 1 <= totalPages && (
                <button
                    onClick={() => setCurrPage((curr) => curr + 1)}
                    className="my-button"
                >
                    <Piu />
                </button>
            )}
        </div>
    );
}
