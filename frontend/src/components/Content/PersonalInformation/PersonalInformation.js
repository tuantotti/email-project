import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import * as Yup from "yup";
import headerImg from "../../../assets/img/personal-infor-header.png";
import personalInformationTheme from "../../../theme/PersonalInformation.theme";
import "./PersonalInformation.css";
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformation } from '../../../redux/slices/getUserInfoSlice';

const ModalProfilePicture = ({ setShowModal, setSelectedFile, previewImage, setPreviewImage }) => {
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);

        inputRef.current.value = null;
    }

    return <div className="profile-picture__container">
        <div className="profile-picture__group">
            <span className="profile-picture__title">Profile picture</span>
            <p className="profile-picture__desc">A picture helps people recognize you and lets you know when you’re signed in to your account</p>

            <div className="profile-picture__avatar">
                <img src={previewImage} alt="Avatar" className="profile-picture__img" />
            </div>
            <div className="profile-picture__bottom" onClick={() => { inputRef.current.click() }}>
                <input type="file" hidden accept="image/*" ref={inputRef} onChange={handleFileChange} />
                <AddAPhotoOutlinedIcon />
                <span>Add profile picture</span>
            </div>
            <div className="profile-picture__close" onClick={() => setShowModal(false)}>
                <IconButton aria-label="delete">
                    <CloseOutlinedIcon />
                </IconButton>
            </div>
        </div>
    </div>
}

function PersonalInformation() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.getUserInfoSlice.user)
    const [showModal, setShowModal] = useState(false)
    const [showExtentName, setShowExtentName] = useState(false);
    const [showExtentEmail, setShowExtentEmail] = useState(false);
    const [showExtentPhone, setShowExtentPhone] = useState(false);
    const [showExtentPassword, setShowExtentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Please enter your first name'),
        lastName: Yup.string().required('Please enter your last name'),
        email: Yup.string().email('Invalid email').required('Please enter your email'),
        phoneNumber: Yup.string().matches(/^[^a-z]+$/i, 'Invalid phone number').required('Please enter your phone number'),
        password: Yup.string()
            .required('Please enter your new password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
                'Password must be stronger'
            ),
        confirmPassword: Yup.string()
            .required('Please enter the new password again')
            .oneOf([Yup.ref('password'), null], 'Password confirmation does not match'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName ||"Nguyen Van",
            lastName: user?.lastName || "A",
            email: user?.email || "nguyenvana_hanoi@gmail.com",
            phoneNumber: user?.phoneNumber || "0912345678",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const formValues = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                password: values.password,
            };

            console.log("🚀 ~ file: PersonalInformation.js:107 ~ PersonalInformation ~ formValues:", formValues)
        },
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(getUserInformation())
    }, [])
    return (
        <ThemeProvider theme={personalInformationTheme}>
            <form className="personal-info__container" onSubmit={formik.handleSubmit} id="form">
                <div className="personal-info__header">
                    <div className="personal-info__header-left">
                        <h3 className="personal-info__header-left-title">Your profile info in Google services</h3>
                        <p className="personal-info__header-left-desc">Personal info and options to manage it. You can make some of this info, like your contact details, visible to others so they can reach you easily. You can also see a summary of your profiles.</p>
                    </div>
                    <div className="personal-info__header-right">
                        <img src={headerImg} className="personal-info__header-right-img" />
                    </div>
                </div>

                <div className="personal-info__block">
                    <div className="personal-info__block-header">
                        <span className="personal-info__block-title">Basic info</span>
                        <span className="personal-info__block-subtitle">Some info may be visible to other people using Google services.</span>
                    </div>
                    <div className="personal-info__block-group" onClick={() => setShowModal(true)}>
                        <div className="personal-info__block-group-main">
                            <span className="personal-info__block-cate">
                                Profile Picture
                            </span>
                            <span className="personal-info__block-infor">
                                Add a profile picture to personalize your account
                            </span>
                            <div className="personal-info__block-avatar">
                                <Avatar alt="avt" src={previewImage} />
                                <div className="personal-info__block-avatar-icon">
                                    <div className="personal-info__block-avatar-icon-camera"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="personal-info__block-divide"></div>
                    <div className="personal-info__block-group">
                        <div className="personal-info__block-group-main" onClick={() => setShowExtentName(prev => !prev)}>
                            <span className="personal-info__block-cate">
                                Name
                            </span>
                            <span className="personal-info__block-infor">
                                {formik.values.firstName}{" "}{formik.values.lastName}
                            </span>
                            <IconButton aria-label="delete">
                                {showExtentName ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </div>
                        {showExtentName && <div className="personal-info__block-group-expansion">
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
                        </div>}
                    </div>
                    <div className="personal-info__block-divide"></div>
                    <div className="personal-info__block-group">
                        <div className="personal-info__block-group-main" onClick={() => setShowExtentEmail(prev => !prev)}>
                            <span className="personal-info__block-cate">
                                Email
                            </span>
                            <span className="personal-info__block-infor">
                                {formik.values.email}
                            </span>
                            <IconButton aria-label="delete">
                                {showExtentEmail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </div>
                        {showExtentEmail && <span className="signup-subtext-password-condition" style={{ margin: "0px 24px" }}>Your email address can't edit!</span>}
                        {showExtentEmail && <div className="personal-info__block-group-expansion">
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
                                    disabled
                                />
                                {formik.touched.email && formik.errors.email ? <span className="error-validation">{formik.errors.email}</span> : <span className="error-validation"></span>}
                            </div>
                        </div>}
                    </div>
                    <div className="personal-info__block-divide"></div>
                    <div className="personal-info__block-group">
                        <div className="personal-info__block-group-main" onClick={() => setShowExtentPhone(prev => !prev)}>
                            <span className="personal-info__block-cate">
                                Phone Number
                            </span>
                            <span className="personal-info__block-infor">
                                {formik.values.phoneNumber}
                            </span>
                            <IconButton aria-label="delete">
                                {showExtentPhone ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </div>
                        {showExtentPhone && <div className="personal-info__block-group-expansion">
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
                        </div>}
                    </div>
                    <div className="personal-info__block-divide"></div>
                    <div className="personal-info__block-group">
                        <div className="personal-info__block-group-main" onClick={() => setShowExtentPassword(prev => !prev)}>
                            <span className="personal-info__block-cate">
                                Password
                            </span>
                            <span className="personal-info__block-infor">
                                Change your password
                            </span>

                            <IconButton aria-label="delete">
                                {showExtentPassword ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </div>
                        {showExtentPassword && <span className="signup-subtext-password-condition" style={{ margin: "0px 24px" }}>Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be at least 8 characters long</span>}
                        {showExtentPassword && <div className="personal-info__block-group-expansion">
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
                        </div>}
                    </div>

                    <div className="personal-info__save-info">
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "#1A73E8" }}
                            role="button"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>

            </form>
            {showModal && <ModalProfilePicture
                setShowModal={setShowModal}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
            />}
        </ThemeProvider>
    );
}

export default PersonalInformation;
