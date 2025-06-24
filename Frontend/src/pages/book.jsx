import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext.jsx"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import Header from "./header.jsx";
import Spinner from "../Loader/Spinner.jsx";


export default function book() {

    const id = useParams();
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);
    const { getBookDetails, getReviews } = useContext(AuthContext);
    const [page, setPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        const getBook = async () => {
            try {
                let result = await getBookDetails(id);
                setBook(result.book);
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        const fetchReviews = async () => {
            try {
                let result = await getReviews(id);
                setReviews(result)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        setPage(true);
        getBook();
        fetchReviews();
    }, [id])

    const getBackgroundColor = (rating) => {
        if (rating >= 4) return 'green'
        if (rating >= 2) return 'orange'
        return red;
    }

    const getDate = (d) => {
        const date = new Date(d);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        return formattedDate;
    }

    return (
        <div>
            <Header page={page} />
            <div className="d-flex p-3" style={{ height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
                <div className="d-flex flex-column" style={{
                    width: "40%", position: "sticky",
                    top: "20px",
                    alignSelf: "flex-start"
                }}>
                    <div style={{ width: '25rem', height: '20rem' }}>
                        {loading && (
                            <Spinner />
                        )}
                        <img src={book.coverImage} alt="" style={{ width: '100%', objectFit: 'contain', height: '100%' }} />
                    </div>
                    <div className="mt-2 p-3">
                        <button className="btn btn-primary " style={{ width: "35%" }}>Preview</button>
                        <h6 className="my-3">Rate this product</h6>
                        <Rating onChange={() => localStorage.getItem("token") ? navigate(`/reviews/${id.id}`) : navigate("/auth")} />
                    </div>
                </div>

                <div style={{ width: "60%", paddingLeft: '2rem' }}>
                    <div>
                        <div>
                            <h2 className="fw-bold">{book.title}</h2>
                            <p className="fw-bold"><span style={{ color: "gray" }}>Author: </span>{book.author}</p>
                            <p>₹ <span style={{ fontSize: "1.7rem", fontWeight: "bolder" }}>{book.price}</span></p>
                            <span style={{ color: "gray" }}>Genre: </span><span className="fw-bold fs-6 ">{book.genre ? book.genre.join(", ") : ""}</span>
                            <p style={{ fontSize: "0.8rem", fontWeight: "500" }} className="mt-2">Description: </p>
                            <p style={{ fontWeight: "600" }}>  {book.description}, <span className="fw-bold">Published:  </span>{getDate(book.publishAt)}</p>
                            <p style={{ fontSize: "0.8rem", fontWeight: "500" }}>Category:  <span className="fw-bold fs-6">{book.category}</span></p>
                        </div>
                    </div>
                    <div>Readers Also enjoyed</div>
                    <hr />
                    <div>
                        <h2>{reviews ? "Rating & Reviews" : ""}</h2>
                        {reviews.map((rev) => {
                            return (
                                <div style={{ border: '1px solid rgb(227, 227, 227)' }} className="p-3" key={rev._id}>

                                    <div className="d-flex">
                                        <div>
                                            <Button variant="contained" endIcon={<StarOutlineOutlinedIcon sx={{ fontSize: '0.2rem' }} />}
                                                sx={{
                                                    fontSize: '0.6rem',
                                                    width: '2.5rem',
                                                    height: '1rem',
                                                    minWidth: '1rem', // important to prevent default button min width
                                                    backgroundColor: (getBackgroundColor(rev.rating)),
                                                    color: 'white',
                                                    padding: 1.5,
                                                    '&:hover': {
                                                        backgroundColor: 'darkgreen',
                                                    },
                                                }}>{rev.rating}</Button>
                                        </div>
                                        <span className="fw-bold ms-4">Fabulous</span>
                                    </div>
                                    <p className="mt-4">{rev.comment}</p>
                                    <div className="mt-4 d-flex" style={{ color: 'gray', fontSize: '0.9rem', fontWeight: "500" }}>
                                        <p >{rev.user.name}</p>
                                        <p className="ms-5">{getDate(rev.date)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}