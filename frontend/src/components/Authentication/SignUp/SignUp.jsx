import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import authenticationTheme from "../../../theme/Authentication.theme.ts"
import { signUpThunk } from '../../../redux/slices/authenticationSlice';

import "./SignUp.css";

function SignUp() {
    const accessToken = useSelector(state => state.authenticationSlice.accessToken)
    const loading = useSelector(state => state.authenticationSlice.loading)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Please enter your first name'),
        lastName: Yup.string().required('Please enter your last name'),
        email: Yup.string().email('Invalid email').required('Please enter your email'),
        phoneNumber: Yup.string().matches(/^[^a-z]+$/i, 'Invalid phone number').required('Please enter your phone number'),
        password: Yup.string()
            .required('Please enter a password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
                'Password must be stronger'
            ),
        confirmPassword: Yup.string()
            .required('Please enter the password again')
            .oneOf([Yup.ref('password'), null], 'Password confirmation does not match'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const formValues = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                password: values.password,
            };
            dispatch(signUpThunk(formValues)).then(res => console.log(res))
            // resetForm();
        },
    });


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleNavigateSignIn = () => {
        navigate('/signin')
    }

    return !accessToken ? (
        <ThemeProvider theme={authenticationTheme}>
            <div className="signup-block">
                <form className="signup-container" onSubmit={formik.handleSubmit}>
                    {loading && <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%'
                    }}>
                        <LinearProgress sx={{ height: 5 }} />
                    </Box>}
                    <div className="signup-container-header">
                        <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="BFr46e xduoyf"><g id="qaEJec"><path fill="#ea4335" d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"></path></g><g id="YGlOvc"><path fill="#34a853" d="M58.193.67h2.564v17.44h-2.564z"></path></g><g id="BWfIk"><path fill="#4285f4" d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"></path></g><g id="e6m3fd"><path fill="#fbbc05" d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"></path></g><g id="vbkDmc"><path fill="#ea4335" d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"></path></g><g id="idEJde"><path fill="#4285f4" d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"></path></g></svg>
                        <h2 className="signup-title">Create a Google Account</h2>
                    </div>
                    <h3 className="signup-subtext">Enter your name</h3>
                    <div className="two-field">
                        <div className="text-field-group-left">
                            <TextField
                                id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? <span className="error-validation">{formik.errors.firstName}</span> : <span className="error-validation"></span>}
                        </div>

                        <div className="text-field-group-right">
                            <TextField
                                id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? <span className="error-validation">{formik.errors.lastName}</span> : <span className="error-validation"></span>}
                        </div>
                    </div>

                    <h3 className="signup-subtext">Create your own email address</h3>
                    <div className="text-field-group">
                        <TextField
                            id="outlined-basic"
                            label="Create a email address"
                            placeholder="nguyenvana@gmail.com"
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                        />
                        {formik.touched.email && formik.errors.email ? <span className="error-validation">{formik.errors.email}</span> : <span className="error-validation"></span>}
                    </div>

                    <h3 className="signup-subtext">Create strong password</h3>
                    <span className="signup-subtext-password-condition">Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be at least 8 characters long</span>
                    <div className="two-field">
                        <div className="text-field-group-left">
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}

                                />
                            </FormControl>
                            {formik.touched.password && formik.errors.password ? <span className="error-validation">{formik.errors.password}</span> : <span className="error-validation"></span>}
                        </div>

                        <div className="text-field-group-left">
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm"
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                />
                            </FormControl>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <span className="error-validation">{formik.errors.confirmPassword}</span> : <span className="error-validation"></span>}
                        </div>
                    </div>

                    <h3 className="signup-subtext">Enter your phone number</h3>
                    <div className="text-field-group">
                        <TextField
                            id="outlined-basic"
                            label="Phone number"
                            placeholder="0912345678"
                            variant="outlined"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <span className="error-validation">{formik.errors.phoneNumber}</span> : <span className="error-validation"></span>}
                    </div>

                    <div className="signup-bottom-group">
                        <span className="already-account-text" onClick={handleNavigateSignIn}>I have already an account</span>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "#1A73E8" }}
                            role="button"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    ) : <Navigate to="/" />;
}

export default SignUp;
