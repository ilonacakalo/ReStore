import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                await dispatch(signInUser(FormData)); // Login first
                navigate('/'); // Redirect to home page before refresh
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.log(error);
            }
        };

        if (user) {
            handleRedirect(); // Redirect after the refresh
        }
        else {
            navigate('/login')
        }
    }, [dispatch, navigate, user]);

    const submitForm = async (formData: FieldValues) => {
        try {
            await dispatch(signInUser(formData)); // Pass formData as argument
            localStorage.setItem('login', 'true'); // Set a flag to indicate login
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        {...register('username', { required: 'Username is required.' })}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: 'Password is required.' })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log in
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to='/register'>
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
