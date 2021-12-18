import * as Yup from "yup";

const UserLogin = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
});

export default UserLogin;
