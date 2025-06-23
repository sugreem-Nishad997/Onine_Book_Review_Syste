import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import server from "../environment";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: server
})



export const AuthProvider = ({ children }) => {


    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookDetails, setBookDetails] = useState(null);

    const handleRagister = async (name, email, password) => {
        try {
            let request = await client.post("/users/register", {
                name: name,
                email: email,
                password: password
            });
            if (request.data) {
                console.log(request.data);
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogIn = async (email, password) => {

        try {
            let request = await client.post("/users/login", {
                email: email,
                password: password
            });
            if (request.data.success) {
                const { token, user } = request.data;
                localStorage.setItem("token", token);
                setUserData(user)
                return request.data;
            } else {
                return request.data
            }
        } catch (err) {
            throw err;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUserData(null)
    }

    const getProfile = async (userId) => {
        try {
           
            let id = userId.id
            let token = localStorage.getItem("token");
            let request = await client.get(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return request.data.success ? request.data : request.data.message;
        } catch (error) {
            throw error;
        }
    }

    const updateProfile = async (userId, formState) => {
        try {
            console.log(userId.id);
            let id = userId.id;
            let token = localStorage.getItem("token");
            let response = await client.post(`/users/${id}`, formState, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(response);
            if (response.data.success) {
                alert("Profile updated!");
                setUserData(response.data.user);
                return response.data;
            } else {
                alert(response.data.message);
                response.data.message
            }

        } catch (error) {
            throw error
        }
    }

    let getAllBooks = async () => {
        try {
            const request = await client.get("/books");
            return request.data;
        } catch (error) {
            throw error
        }

    }

    let getBookDetails = async (bookId) => {
        try {
            console.log(bookId.id)
            let id = bookId.id;
            const request = await client.get(`/books/${id}`);
            setBookDetails(request.data.book);
            return request.data
        } catch (error) {
            throw error;
        }
    }

    const addBook = async (formData) => {
       for (let pair of formData.entries()) {
  console.log(pair[0] + ':', pair[1]);
}
        try {
            console.log(formData)
            let token = localStorage.getItem("token");
            let response = await client.post("/books", formData,{
                 headers: {
                   
                    Authorization: `Bearer ${token}`,
                },
                
            
            });
            console.log(response, token)
            return response.data.message
        } catch (error) {
            throw error;
        }
    }

    let getReviews = async (bookId) => {
        try {
            let id = bookId.id;
            const request = await client.get(`/reviews/${id}`);
            return request.data.review;
        } catch (error) {
            throw error;
        }
    }

    const addReview = async (newReview, bookId) => {
        try {
            console.log(newReview)
            let token = localStorage.getItem("token");
            let response = await client.post(`/reviews/${bookId.id}`, newReview, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data.success ? response.data : response.data.message
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode(token); // decode the JWT
                    const result = await getProfile(decoded);

                    if (result.user) {
                        setUserData(result.user);
                    }
                } catch (err) {
                    console.error("Invalid token or fetch failed:", err);
                    localStorage.removeItem("token");
                    setUserData(null);
                }
            }
            setLoading(false);
        };
       
        fetchUserData();
    }, []);

    const data = { getAllBooks, getBookDetails, getReviews, handleLogIn, handleRagister, getProfile, userData, setUserData, updateProfile, addReview, logout, addBook, loading, bookDetails};

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

