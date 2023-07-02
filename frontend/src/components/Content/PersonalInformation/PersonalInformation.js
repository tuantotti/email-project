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
import { changeAvatar, changePassword, editUserInformation, getUserInformation, getAvatar } from '../../../redux/slices/userInfoSlice';

const ModalProfilePicture = ({ setShowModalPicture, setSelectedFile, previewImage, setPreviewImage }) => {
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    const { userAvatar } = useSelector(state => state.userInfoSlice)

    const handleFileChange = (event) => {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append("avatar", file);

        setSelectedFile(file);
        dispatch(changeAvatar(formData)).then(() => {
            dispatch(getAvatar())
        })

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
                <img src={previewImage || userAvatar} alt="Avatar" className="profile-picture__img" />
            </div>
            <div className="profile-picture__bottom" onClick={() => { inputRef.current.click() }}>
                <input type="file" hidden accept="image/*" ref={inputRef} onChange={handleFileChange} />
                <AddAPhotoOutlinedIcon />
                <span>Add profile picture</span>
            </div>
            <div className="profile-picture__close" onClick={() => setShowModalPicture(false)}>
                <IconButton aria-label="delete">
                    <CloseOutlinedIcon />
                </IconButton>
            </div>
        </div>
    </div>
}
const ModalChangePassword = ({ setShowModalPassword }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userInfoSlice)
    const [showOldPassword, setOldShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const validationSchema = Yup.object({
        oldPassword: Yup.string()
            .required('Please enter your old password'),
        newPassword: Yup.string()
            .required('Please enter your new password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
                'Password must be stronger'
            ),
        confirmNewPassword: Yup.string()
            .required('Please enter the new password again')
            .oneOf([Yup.ref('newPassword'), null], 'Password confirmation does not match'),
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const formValues = {
                email: user.email,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmNewPassword,
            };

            dispatch(changePassword(formValues)).then(res => setShowModalPassword(false))
        },
    });

    const handleClickShowOldPassword = () => setOldShowPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return <form className="profile-picture__container" onSubmit={formik.handleSubmit}>
        <div className="change-pass__group">
            <span className="profile-picture__title">Change your password</span>
            <span className="signup-subtext-password-condition" style={{ margin: "16px 0px" }}>Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be at least 8 characters long</span>

            <div className="text-field-change-pass">
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Old password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showOldPassword ? 'text' : 'password'}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Old password"
                        name="oldPassword"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}

                    />
                </FormControl>
                {formik.touched.oldPassword && formik.errors.oldPassword ? <span className="error-validation">{formik.errors.oldPassword}</span> : <span className="error-validation"></span>}
            </div>
            <div className="text-field-change-pass">
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="New password"
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    />
                </FormControl>
                {formik.touched.newPassword && formik.errors.newPassword ? <span className="error-validation">{formik.errors.newPassword}</span> : <span className="error-validation"></span>}
            </div>
            <div className="text-field-change-pass">
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Confirm new password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="New password"
                        name="confirmNewPassword"
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                    />
                </FormControl>
                {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? <span className="error-validation">{formik.errors.confirmNewPassword}</span> : <span className="error-validation"></span>}
            </div>
            <div className="change-pass__save">
                <Button
                    variant="contained"
                    sx={{ bgcolor: "#1A73E8" }}
                    role="button"
                    type="submit"
                >
                    Save
                </Button>
            </div>
            <div className="profile-picture__close" onClick={() => setShowModalPassword(false)}>
                <IconButton aria-label="delete">
                    <CloseOutlinedIcon />
                </IconButton>
            </div>
        </div>
    </form>
}
function PersonalInformation() {
    const dispatch = useDispatch();
    const { user, userAvatar } = useSelector(state => state.userInfoSlice)
    const [showModalPicture, setShowModalPicture] = useState(false)
    const [showModalPassword, setShowModalPassword] = useState(false)
    const [showExtentName, setShowExtentName] = useState(false);
    const [showExtentEmail, setShowExtentEmail] = useState(false);
    const [showExtentPhone, setShowExtentPhone] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Please enter your first name'),
        lastName: Yup.string().required('Please enter your last name'),
        email: Yup.string().email('Invalid email').required('Please enter your email'),
        phoneNumber: Yup.string().matches(/^[^a-z]+$/i, 'Invalid phone number').required('Please enter your phone number'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
        },
        validationSchema,
        onSubmit: (values) => {
            const { firstName, lastName, phoneNumber } = values
            const newInfo = { ...user, firstName, lastName, phoneNumber };

            dispatch(editUserInformation(newInfo))
        },
    });

    useEffect(() => {
        formik.setValues({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
        })
    }, [user])

    useEffect(() => {
        dispatch(getUserInformation())
        dispatch(getAvatar())
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
                    <div className="personal-info__block-group" onClick={() => setShowModalPicture(true)}>
                        <div className="personal-info__block-group-main">
                            <span className="personal-info__block-cate">
                                Profile Picture
                            </span>
                            <span className="personal-info__block-infor">
                                Add a profile picture to personalize your account
                            </span>
                            <div className="personal-info__block-avatar">
                                <Avatar alt="avt" src={userAvatar} />
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
                        <div className="personal-info__block-group-main" onClick={() => setShowModalPassword(true)}>
                            <span className="personal-info__block-cate">
                                Password
                            </span>
                            <span className="personal-info__block-infor">
                                Change your password
                            </span>

                            <IconButton aria-label="delete">
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </div>
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
            {showModalPicture && <ModalProfilePicture
                setShowModalPicture={setShowModalPicture}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
            />}
            {showModalPassword && <ModalChangePassword setShowModalPassword={setShowModalPassword} />}
        </ThemeProvider>
    );
}

export default PersonalInformation;
