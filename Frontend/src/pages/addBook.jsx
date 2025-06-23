import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/addBook.css';
import { useNavigate } from 'react-router-dom';

export default function AddBook() { 

  const { addBook } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    price: "",
    category: "",
    publishAt: ""
  });

  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    if (coverImage) {
        console.log(coverImage)
      formData.append("coverImage", coverImage);
    }


    try {
      const res = await addBook(formData);
      setMessage(res); 
      setForm({
        title: "",
        author: "",
        description: "",
        genre: "",
        price: "",
        category: "",
        publishAt: Date
      });
      setCoverImage(null);
      navigate("/");
    } catch (error) {
        console.log(error)
      setMessage("Failed to add book: " + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <div className="add-book-container">
      <h5>Add New Book</h5>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className='d-flex'>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
            className='ms-4'
          />
        </div>

        <div className='d-flex'>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            className='ms-4'
            type="text"
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />
        </div>

        <div className='d-flex'>
          <input
            type="date"
            name="publishAt"
            placeholder="Publish Date"
            value={form.publishAt}
            onChange={handleChange}
            required
          />
          <input
            className='ms-4'
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Book Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} name='coverImage'/>

        <button type="submit">Add Book</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
