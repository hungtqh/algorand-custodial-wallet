import * as Yup from "yup";

const UserRegister = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string()
    .required("password is required")
    .min(6, "password too short, Must be at least 6 characters"),
  password_confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("password confirmation is required"),
});

export default UserRegister;
