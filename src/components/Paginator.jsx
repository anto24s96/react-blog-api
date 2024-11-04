export default function ({ currPage, totalPages, setCurrPage }) {
    return (
        <div className="paginator">
            {currPage - 1 > 0 && (
                <button
                    onClick={() => setCurrPage((curr) => curr - 1)}
                    className="my-button"
                >
                    -
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
                    +
                </button>
            )}
        </div>
    );
}
