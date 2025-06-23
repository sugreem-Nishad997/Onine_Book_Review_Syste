import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import Header from "./header.jsx";
import '../styles/home.css';

export default function home() {

    const { getAllBooks } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [loading, setLoading] = useState(false);
   

    const navigate = useNavigate();
    useEffect(() => {
        let fetchAllBooks = async () => {
            setLoading(true);
            try {
                const book = await getAllBooks();
                setBooks(book);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchAllBooks();
    }, [])

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = genreFilter ? book.genre?.includes(genreFilter) : true;
        const matchesCategory = categoryFilter ? book.category === categoryFilter : true;
        return matchesSearch && matchesGenre && matchesCategory;
    });

    const genreSet = new Set();
    books.forEach(book => book.genre?.forEach(g => genreSet.add(g)));
    const uniqueGenres = Array.from(genreSet);

    const uniqueCategories = [...new Set(books.map(book => book.category))];

    const handleClick = (id) => {
        console.log(id)

        navigate(`/books/${id}`);
    }

    

    return (
        <div>
            <div className="home-container">
                <Header search={search} setSearch={setSearch} />
                <div className="my-2">
                    <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                        <option value="">All Genres</option>
                        {uniqueGenres.map((g, idx) => (
                            <option key={idx} value={g}>{g}</option>
                        ))}
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="ms-3">
                        <option value="">All Categories</option>
                        {uniqueCategories.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (

                    <div className="books-grid">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map(book => (
                                <div className="book-card" key={book._id} onClick={() => handleClick(book._id)}>
                                    <div className="image">
                                        <img src={book.coverImage} alt={book.title} />
                                    </div>
                                    <p className="Font">{book.title}</p>
                                    <p style={{ fontSize: "0.9rem" }}>by <span className="fw-bold">{book.author}</span></p>
                                    <p>₹{book.price}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-books">No books found.</p>
                        )}
                    </div>
                )}
            </div>

           
        </div>
    )
}