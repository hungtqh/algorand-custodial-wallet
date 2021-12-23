import { FormikProps, Form, Field, withFormik } from "formik";
import Link from "next/link";
import useUser from "lib/useUser";
import axios from "axios";
import UserLogin from "schema/UserLogin";

interface LoginValues {
  username: string;
  password: string;
}

interface LoginFormPorps {}

export default function Signin() {
  const { user, mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  const InnerForm = (props: FormikProps<LoginValues>) => {
    const { touched, errors, isSubmitting, status } = props;
    return (
      <Form className="flex p-5 shadow-lg rounded-lg flex-col justify-around h-[70%] w-[90%] md:w-[60%] lg:w-[35%]">
        <h2 className=" text-sky-600 lg:text-center">Welcome to AlgoWallet</h2>
        <p className="text-gray-700 lg:text-center">
          login to view your wallets.
        </p>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">username</span>
          <Field type="text" name="username" />
          {touched.username && errors.username && (
            <div className="text-red-400">{errors.username}</div>
          )}
        </div>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">password</span>
          <Field type="password" name="password" />
          {touched.username && errors.username && (
            <div className="text-red-400">{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn-sky text-center w-[50%] self-center hover:scale-105"
          disabled={isSubmitting}
        >
          sign in
        </button>

        {status && <p className="text-center text-red-400">{status}</p>}

        <p className="text-center">
          don't have an account yet?{" "}
          <Link href="/signup">
            <a className="text-sky-400 hover:underline">register</a>
          </Link>
        </p>
      </Form>
    );
  };

  const LoginForm = withFormik<LoginFormPorps, LoginValues>({
    mapPropsToValues: () => {
      return {
        username: "",
        password: "",
      };
    },
    validationSchema: UserLogin,
    handleSubmit: async ({ username, password }, { setStatus }) => {
      try {
        const result = await axios.post("/api/user/login", {
          username,
          password,
        });
        mutateUser(result.data);
      } catch (error) {
        if (error.response) {
          setStatus(error.response.data.error);
        }
      }
    },
  })(InnerForm);

  return <LoginForm />;
}
