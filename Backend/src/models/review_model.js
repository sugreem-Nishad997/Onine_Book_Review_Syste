import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    book:{
        type:Schema.Types.ObjectId,
        ref:"Book",
        required: true
    },
    rating: {
        type: Number,
        required : true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Review = mongoose.model("Review", reviewSchema);

export {Review}