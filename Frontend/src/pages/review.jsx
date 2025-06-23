import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import '../styles/review.css';

export default function review() {

    const [book, setBook] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(false);

    const navigate = useNavigate();

    const { addReview, getBookDetails} = useContext(AuthContext);
    const id = useParams();

    const handleSubmit = async () => {
        if (!comment.trim() || rating < 1) {
            alert("Please enter a rating and review.");
            return;
        }

        const newReview = {rating, comment };
        
        await addReview(newReview, id);
       
        setReviews([newReview, ...reviews]);

        // Clear form
        setRating(0);
        setComment("");
        navigate(`/books/${book._id}`)
    };

    useEffect(()=>{
        const fetchBook = async() => {
            let response = await getBookDetails(id);
            if(response.success){
                setBook(response.book)
            }
           
        }
        setPage(true)
        fetchBook();
    },[])

    return (
        <div style={{backgroundColor:"rgb(230, 239, 245)", padding:'0.6rem'}}>
            <Header page={page}/>
            <div className="top d-flex justify-content-between p-3 mx-3">
                <p className="fw-bold fs-4">Rating & Reviews</p>
               <div className="d-flex align-items-center"> 
                 <p className="mx-3">{book?book.title:""}</p>
                 <div style={{height:"5rem", width:"5rem"}}>
                    <img src={book?book.coverImage:""} alt="" style={{width:'100%', height:"100%", objectFit:"contain"}}/>
                 </div>
               </div>
            </div>
            <div className="review-container">
                <div className="left-panel" style={{width:'35%'}}>
                    <h6>What makes a good review</h6>
                    <h6>Have you read this book?</h6>
                    <p>Your review should be about your experience with the Book.</p>

                    <h6>Why review a Book?</h6>
                    <p>Your valuable feedback will help fellow Authors decide!</p>

                    <h6>How to review a Book?</h6>
                    <p>
                        Your review should include facts. An honest opinion is always appreciated.
            
                    </p>
                </div>

                <div className="right-panel" style={{width:'65%'}}>
                    <h6>Rate this product</h6>
                    <Rating
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />

                    <h6>Review this product</h6>
                    <textarea
                        placeholder="Description..."
                        rows={6}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                   

                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>

    )
}