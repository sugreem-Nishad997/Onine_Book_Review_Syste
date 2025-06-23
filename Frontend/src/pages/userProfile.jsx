import { useContext, useEffect, useState } from 'react';
import { Button, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import FilterFramesSharpIcon from '@mui/icons-material/FilterFramesSharp';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/profileInfo.css';


export default function userProfile() {
    const [nameEdit, setNameEdit] = useState(true);
    const [emailEdit, setEmailEdit] = useState(true);

    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: "",
        email: ""
    })

    const { getProfile, userData, updateProfile } = useContext(AuthContext);

    const id = useParams();


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormState((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await updateProfile(id, formState)
            console.log(response);
        } catch (error) {
            console.error("Update failed", error);
            alert("Something went wrong");
        }
    };



    useEffect(() => {
        const getUser = async () => {
            let response = await getProfile(id);
            if (response?.user) {
                const { name, email } = response.user;
                setFormState({ name, email });
            }
        }
        getUser();
    }, [id])

    return (
        <div className='d-flex'>
            <div style={{ backgroundColor: 'rgb(234, 240, 245)', padding: '0.9rem 0.9rem 0.9rem 2rem', width: '30%' }}>
                <div className="clientContainer">
                    <div className='profile'>
                        <div style={{ margin: '0.9rem' }}>
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ fontSize: '0.7rem', marginBottom: '0rem' }}>Hello,</p>
                            <h6>Sugreem Nishad</h6>
                        </div>
                    </div>
                    <div className='profileManagement'>
                        <div onClick={() => navigate("/")}>
                            <div className='icon-div order'>
                                <FilterFramesSharpIcon sx={{ color: 'rgb(5, 101, 190)' }} />
                                <h6 className='icon-tag'>HOME</h6>
                            </div>
                        </div>
                        <div>
                            <div className='icon-div'>
                                <PersonIcon sx={{ color: 'rgb(5, 101, 190)' }} />
                                <h6 className='icon-tag'>ACCOUNT SETTINGS</h6>
                            </div>
                            <div className='accountSettings'>
                                <p>Profile Information</p>
                            </div>
                        </div>

                        <div>
                            <div className='icon-div'>
                                <PowerSettingsNewSharpIcon sx={{ color: 'rgb(5, 101, 190)' }} />
                                <h6 className='icon-tag logout' onClick={() => {
                                    localStorage.removeItem("token")
                                    navigate('/');
                                }}>LOGOUT</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: 'rgb(234, 240, 245)', padding: '0.9rem', width: '70%' }}>
                <div style={{ backgroundColor: 'white' }} className="p-5">
                    <div className="mb-3 d-flex">
                        <h6>Personal Information</h6>
                        <span className="ms-5 edit" onClick={() => setNameEdit(!nameEdit)}>{nameEdit ? 'Edit' : 'Cancel'}</span>
                    </div>
                    <div>
                        <TextField id={nameEdit ? "outlined-basic" : "outlined-disabled"} variant="outlined" label={nameEdit ? "" : "First Name"} name='name' value={formState.name} disabled={nameEdit} size="small" onChange={handleChange} />

                        {!nameEdit && <Button variant="contained" className="ms-3" onClick={handleUpdate}>save</Button>}
                    </div>
                    <div className="mb-3 d-flex mt-5">
                        <h6>Email Address</h6>
                        <span className="ms-5 edit" onClick={() => setEmailEdit(!emailEdit)}>{emailEdit ? 'Edit' : 'Cancel'}</span>
                    </div>
                    <div>
                        <TextField id={emailEdit ? "outlined-basic" : "outlined-disabled"} variant="outlined" label={emailEdit ? "" : "Email"} name='email' value={formState.email} disabled={emailEdit} size="small" onChange={handleChange} />
                        {emailEdit ? "" : <Button variant="contained" className="ms-3" onClick={handleUpdate} >save</Button>}
                    </div>

                    <div className="mt-5">
                        <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Delete Account</button>


                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Enter the following text to delte account <span className="text-danger">"DELETEMYACCOUNT"</span></h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>

                                            <div class="mb-3">

                                                <textarea class="form-control" id="message-text"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}