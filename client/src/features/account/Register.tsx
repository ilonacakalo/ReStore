import { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error });
                } else if (error.includes('Email')) {
                    setError('email', { message: error });
                } else if (error.includes('Username')) {
                    setError('username', { message: error });
                }
            });
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component={Paper} maxWidth="sm" sx={{
                display: 'flex',
                flexDirection: 'column', alignItems: 'center', p: 4
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration successful! Go ahead and log in.')
                        navigate('/login')

                    })
                    .catch(error => handleApiErrors(error)))}
                    noValidate sx={{ mt: 1 }}>
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
                        label="Email"
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                                message: 'Not a valid email adress.'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors?.email?.message as string}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: 'Password is required.',
                            pattern: {
                                value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;/?/>.<,])(?!.*\s).*$/,
                                message: 'Not a valid password.'
                            }
                        })}
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
                        Register
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to='/login'>
                                {"Already have an account? Log in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
