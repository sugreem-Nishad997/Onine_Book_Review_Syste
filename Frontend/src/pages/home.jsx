import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import ArrowDown from '@mui/icons-material/KeyboardArrowDownSharp';
import ArrowUp from '@mui/icons-material/KeyboardArrowUpSharp';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddBox from '@mui/icons-material/AddBoxSharp';
import { Button } from '@mui/material';

import '../styles/home.css';

export default function home() {

    const { getAllBooks, userData, logout } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [dropDown, setDropDown] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        let fetchAllBooks = async () => {
            try {
                const book = await getAllBooks();
                setBooks(book);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllBooks();
    }, [])

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = genreFilter ? book.genre === genreFilter : true;
        const matchesCategory = categoryFilter ? book.category === categoryFilter : true;
        return matchesSearch && matchesGenre && matchesCategory;
    });

    const uniqueGenres = [...new Set(books.map(book => book.genre))];
    const uniqueCategories = [...new Set(books.map(book => book.category))];

    const handleClick = (id) => {
        console.log(id)

        navigate(`/books/${id}`);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const handleMouseEnter = () => {
        setDropDown(true);
    }

    const handleMouseLeave = () => {
        setDropDown(false);
    }


    const token = localStorage.getItem("token");

    return (
        <div>
            <div className="home-container">
                <div className="header">
                    <div className="logo">
                        <h4>BookNest</h4>
                        <span>Where Books Get a Voice</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className='login' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <Button sx={{ color: 'black', ":hover": { backgroundColor: 'rgb(44, 89, 212)', color: 'white' } }}
                                startIcon={<AccountCircle />}
                                onClick={() => { userData ? navigate(`/users/${userData._id}`) : navigate("/auth") }}>
                                {userData ? userData.name : "LogIn"}{dropDown ? <ArrowUp /> : <ArrowDown />}</Button>
                        </div>
                        <ul className="dropDownList" style={{ display: dropDown === false ? 'none' : '' }}
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <li className='list-1' style={{ fontSize: '0.93rem' }}>
                                <span >New Customer?</span>
                                <span onClick={() => navigate("/auth")} className="singup">SignUp</span>
                            </li>
                            <li>
                                <Button sx={{ color: 'black' }} startIcon={<AccountCircle />} onClick={() => { userData ? navigate(`/users/${userData._id}`) : navigate("/auth") }}>My Profile</Button>
                            </li>
                            <li>
                                <Button sx={{color:"black"}} startIcon={<AddBox/>} onClick={() => navigate("/add-book")}>Add Book</Button>
                            </li>
                        </ul>
                    </div>

                </div>
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

                <div className="books-grid">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <div className="book-card" key={book._id}>
                                <img src={book.coverImage} alt={book.title} />
                                <h4>{book.title}</h4>
                                <p>by {book.author}</p>
                                <p>₹{book.price}</p>
                                <small>{book.genre} | {book.category}</small>
                            </div>
                        ))
                    ) : (
                        <p className="no-books">No books found.</p>
                    )}
                </div>
            </div>
            
        </div>
    )
}