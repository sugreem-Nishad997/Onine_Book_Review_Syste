import { Book } from "../models/book_model.js";
import httpStatus from 'http-status';
import { Review } from "../models/review_model.js";

const getReviewByBook = async(req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
       
        if(!book){
            return res.status(httpStatus.NOT_FOUND).json({message:"bad requested book id", success:false});
        }
        const review = await Review.find({book:id}).populate('user','name');
        res.status(httpStatus.OK).json({message:"review fetched", success:true, review});
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error);
    }
}

const addReview = async(req, res) => {
    try {
        console.log(req.params)
        const id = req.params.id;
        const {rating, comment} = req.body;
        if (!rating || !comment) {
            return res.status(httpStatus.BAD_REQUEST).json({message:"Fields required", success:false});
        }
        const review = new Review({
            user: req.user.id,
            book: id,
            rating,
            comment
        });
        await review.save();
        res.status(httpStatus.CREATED).json({message:"Review created", success:true, review});
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log(error);
    }
}

export {addReview, getReviewByBook};