import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import '../styles/review.css';

export default function review() {

    const [book, setBook] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);

    const { addReview } = useContext(AuthContext);
    const id = useParams();

    const handleSubmit = async () => {
        if (!comment.trim() || rating < 1) {
            alert("Please enter a rating and review.");
            return;
        }

        const newReview = { book, rating, comment };
        let response = await addReview(newReview, id);
        console.log(response);
        setReviews([newReview, ...reviews]);

        // Clear form
        setRating(0);
        setComment("");
    };

    return (
        <div style={{backgroundColor:"rgb(230, 239, 245)", padding:'0.6rem'}}>
            <div className="top d-flex justify-content-between p-3">
                <p className="fw-bold fs-4">Rating & Reviews</p>
                <p>Book</p>
            </div>
            <div className="review-container">
                <div className="left-panel" style={{width:'35%'}}>
                    <h6>What makes a good review</h6>
                    <h6>Have you used this product?</h6>
                    <p>Your review should be about your experience with the product.</p>

                    <h6>Why review a product?</h6>
                    <p>Your valuable feedback will help fellow shoppers decide!</p>

                    <h6>How to review a product?</h6>
                    <p>
                        Your review should include facts. An honest opinion is always appreciated.
                        If you have an issue with the product or service please contact us from the
                        <a href="#"> help centre</a>.
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