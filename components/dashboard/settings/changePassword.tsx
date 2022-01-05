import { FormikProps, Form, Field, withFormik } from "formik";
import axios from "axios";
import ChangePasswordSchema from "schema/ChangePassword";
import { useDispatch } from "react-redux";
import { pushNotification } from "redux/actions/notificationsAction";

interface ChangePasswordValues {
  password: string;
  password_confirm: string;
}

interface ChangePasswordFormPorps {}

export default function ChangePassword() {
  const dispatch = useDispatch();

  const InnerForm = (props: FormikProps<ChangePasswordValues>) => {
    const { touched, errors, isSubmitting, status } = props;

    return (
      <Form className="flex p-5 shadow-lg rounded-lg flex-col justify-around h-[80%] w-[90%] md:w-[60%] lg:w-[35%]">
        <h2 className=" text-sky-600 lg:text-center">Change user password</h2>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">new password</span>
          <Field type="password" name="password" />
          <div>
            {touched.password && errors.password && (
              <div className="text-red-400">{errors.password}</div>
            )}
          </div>
        </div>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">confirm new password</span>
          <Field type="password" name="password_confirm" />
          <div>
            {touched.password_confirm && errors.password_confirm && (
              <div className="text-red-400">{errors.password_confirm}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn-sky text-center w-[50%] self-center hover:scale-105"
          disabled={isSubmitting}
        >
          Change password
        </button>

        {status && <p className="text-center text-red-400">{status}</p>}
      </Form>
    );
  };

  const RegisterForm = withFormik<
    ChangePasswordFormPorps,
    ChangePasswordValues
  >({
    mapPropsToValues: () => {
      return { password: "", password_confirm: "" };
    },
    validationSchema: ChangePasswordSchema,
    handleSubmit: async (
      { password, password_confirm },
      { setStatus, setValues }
    ) => {
      try {
        await axios.post("/api/user/changePassword", {
          password,
          password_confirm,
        });

        setValues({ password: "", password_confirm: "" });

        dispatch(pushNotification("success", "password changed"));
      } catch (error) {
        if (error.response) {
          setStatus(error.response.data.error);
        }
      }
    },
  })(InnerForm);

  return <RegisterForm />;
}
