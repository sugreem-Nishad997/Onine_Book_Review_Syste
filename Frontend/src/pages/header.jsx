import ArrowDown from '@mui/icons-material/KeyboardArrowDownSharp';
import ArrowUp from '@mui/icons-material/KeyboardArrowUpSharp';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddBox from '@mui/icons-material/AddBoxSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/header.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Header({ search, setSearch, page }) {

    const { userData, logout } = useContext(AuthContext);
    const [dropDown, setDropDown] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
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

    // SnackBar
    const handleSnackClick = () => {
        if (userData.isAdmin) {
            navigate("/add-book")
        } else {
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className="header">
            <div className="logo" onClick={() => navigate("/")}>
                <h4>BookNest</h4>
                <span>Where Books Get a Voice</span>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    disabled={page ? true : false}
                    className={page ? 'disabled-cursor' : 'inputClass'}

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
                    <li className='list-1' style={{ fontSize: '0.93rem', display: userData ? 'none' : '' }}>
                        <span >New Customer?</span>
                        <span onClick={() => navigate("/auth")} className="singup">SignUp</span>
                    </li>
                    <li>
                        <Button fullWidth sx={{ color: 'black', ':hover': { color: 'white' }, justifyContent: 'flex-start' }} startIcon={<AccountCircle />} onClick={() => { userData ? navigate(`/users/${userData._id}`) : navigate("/auth") }}>My Profile</Button>
                    </li>
                    <li>
                        <Button fullWidth sx={{ color: "black", ':hover': { color: 'white' }, justifyContent: 'flex-start' }} startIcon={<AddBox />} onClick={handleSnackClick}>Add Book</Button>
                    </li>
                    <li style={{ display: userData ? '' : 'none' }}>
                        <Button fullWidth sx={{ color: "black", ':hover': { color: 'white' }, justifyContent: 'flex-start' }} startIcon={<LogoutIcon />} onClick={() => handleLogout()}>Logout</Button>
                    </li>
                </ul>
            </div>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        You do not have permission to add a book.
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}