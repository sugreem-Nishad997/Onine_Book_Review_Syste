import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/addBook.css';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


export default function AddBook() {

  const { addBook } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: [],
    price: "",
    category: "",
    publishAt: ""
  });

  const availableGenres = [
    "Fantasy", "Science Fiction", "Mystery", "Suspense", "Horror",
    "Biography", "Autobiography", "Science & Technology", "History",
    "Poetry", "Thriller", "Adventure", "Drama", "Travel",
    "Self-Help", "Philosophy", "Children", "Novel", "Fiction"
  ];

  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
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
        genre: [],
        price: "",
        category: "",
        publishAt: Date
      });
      setCoverImage(null);
      navigate("/");
    } catch (error) {
      console.log(error)
      setMessage("Failed to add book: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false)
    }
  };

  const handleGenreCheckboxChange = (genre) => {
    if (form.genre.includes(genre)) {
      setForm(prev => ({
        ...prev,
        genre: prev.genre.filter(g => g !== genre)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        genre: [...prev.genre, genre]
      }));
    }
  };

  return (
    <div className="add-book-container">
      <h5>Add New Book</h5>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <CircularProgress color="primary" />
        </div>
      )}

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
            type="text"
            value={form.genre ? form.genre.join(", ") : ""}
            readOnly
            placeholder="Selected Genres"
            className="ms-2"
          />
          <div className='ms-2'>
            <FormGroup style={{ overflowY: 'hidden', width: '200px', maxHeight: '50px', marginTop: '1rem' }}>
              {availableGenres.map((genre, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={form.genre.includes(genre)}
                      onChange={() => handleGenreCheckboxChange(genre)}
                    />
                  }
                  label={genre}
                />
              ))}
            </FormGroup>
          </div>

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

        <input type="file" accept="image/*" onChange={handleFileChange} name='coverImage' />

        <button type="submit">Add Book</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
