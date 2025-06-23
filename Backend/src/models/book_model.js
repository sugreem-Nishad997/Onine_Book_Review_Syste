import mongoose,{Schema} from "mongoose";

const bookSchema = new Schema({
    title : { type : String, required : true},
    author : {type : String, required : true},
    publishAt : Date,
    description : { type : String},
    genre : [{ type : String}],
    category : { type : String, required : true},
    price : { type : Number, required : true},
    coverImage : {type : String, required: true}
   
});

const Book = mongoose.model("Book",bookSchema);

export {Book};