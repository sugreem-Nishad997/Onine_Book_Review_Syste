import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function authentication() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const [formState, setFormState] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { handleRagister, handleLogIn } = React.useContext(AuthContext);

    const navigate = useNavigate();


    let handleAuth = async () => {
        try {
            setLoading(true)
            if (!formState) {
                let result = await handleLogIn(email, password);
                if (result.success) {
                    setMessage(result.message);
                    setError("");
                    navigate("/");
                } else {
                    setError(result.message || "Login failed");
                }
            } else {
                if (!name || !email || !password) {
                    setError("All fields are required");
                } else {
                    let result = await handleRagister(name, email, password);
                    console.log(result);
                    setMessage(result);
                    setEmail("");
                    setOpen(true);
                    setFormState(false);
                    setPassword("");
                    setError('');
                }

            }
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "An error occurred");
        } finally {
            setLoading(false)
        }
    }

    const handleClick = () => {
        setFormState(!formState);
        setError("")
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <CircularProgress color="primary" />
                </div>
            )}
            <Grid container component="main" sx={{ height: '100%', justifyContent: 'center', marginTop:'2rem'}}>
                <Grid component={Paper} elevation={6} >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <div>
                            <Button variant={formState === false ? "contained" : ""} onClick={() => { handleClick() }}>Sign In</Button>
                            <Button variant={formState === true ? "contained" : ""} onClick={() => { handleClick() }}>Sign Up</Button>
                        </div>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === true ?
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                /> : <></>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete='false'
                                value={email}
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p style={{ color: "red" }}>{error}</p>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === false ? "LogIn" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </ThemeProvider>
    );
}
