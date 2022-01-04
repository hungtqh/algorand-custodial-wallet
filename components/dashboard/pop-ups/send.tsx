import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { FormikProps, Form, Field, withFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loadWallets } from "redux/actions/walletsAction";
import { loadTransactions } from "redux/actions/transactionsAction";
import { pushNotification } from "redux/actions/notificationsAction";

//TODO: check if address is valid
//TODO: check max amount

type Props = {
  setSendActive: (state: boolean) => void;
};

type SendAlgoProps = {
  amount: number;
  address: string;
};

type FormProps = {};

export default function Send({ setSendActive }: Props) {
  const dispatch = useDispatch();
  const { currentWallet } = useSelector((state: RootState) => state.customer);

  const SendAlgoSchema = Yup.object().shape({
    amount: Yup.number()
      .required("amount is required")
      .moreThan(0, "amount must be greater than 0")
      .lessThan(currentWallet.balance, "must be less than wallet balance"),
    address: Yup.string().required("address is required"),
  });

  const handleExit = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains("pop-up")) {
      setSendActive(false);
    }
  };

  const InnerForm = (props: FormikProps<SendAlgoProps>) => {
    const { touched, errors, isSubmitting, status } = props;

    return (
      <Form className="bg-white w-[30rem] h-[30rem] rounded-3xl flex flex-col justify-around items-center">
        <h3>Receive</h3>

        <div className="w-[95%]">
          <p className="mb-2">Amount</p>
          <div className="border-2 border-sky-300 rounded-md flex h-14">
            <div className="w-[40%] bg-sky-100 mr-2 flex justify-around items-center">
              <p>balance</p>
              <p>{currentWallet.balance}</p>
            </div>
            <Field
              className="border-none p-0 w-[70%] focus:ring-0"
              placeholder="0.0"
              type="number"
              name="amount"
            />
          </div>{" "}
          {touched.amount && errors.amount && (
            <div className="text-red-400">{errors.amount}</div>
          )}
        </div>

        <div className="w-[95%]">
          <p className="mb-2">Address</p>
          <Field
            type="text"
            name="address"
            className="py-4 px-2 border-2 rounded-md flex items-center justify-between "
          />
          {touched.address && errors.address && (
            <div className="text-red-400">{errors.address}</div>
          )}
        </div>

        <button
          type="submit"
          className="px-20 py-2 rounded-lg bg-sky-600 text-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={
            (Object.keys(errors).length !== 0 ||
              Object.keys(touched).length !== 2) &&
            !isSubmitting
          }
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        {status && <p className="text-center text-red-400">{status}</p>}
      </Form>
    );
  };

  const SendAlgoForm = withFormik<FormProps, SendAlgoProps>({
    mapPropsToValues: () => {
      return {
        amount: 0,
        address: "",
      };
    },
    validationSchema: SendAlgoSchema,
    handleSubmit: async ({ address, amount }, { setStatus }) => {
      try {
        await axios.post("/api/wallet/transactions", {
          from: currentWallet.address,
          to: address,
          amount,
        });
        dispatch(loadWallets(false));
        setSendActive(false);
        dispatch({ type: "LOADING_TRANSACTIONS" });
        dispatch(loadTransactions(currentWallet.address));
        dispatch(pushNotification("success", "sent successfully"));
      } catch (error) {
        if (error.response) {
          setStatus(error.response.data.error);
        }
      }
    },
  })(InnerForm);

  return (
    <div
      onClick={handleExit}
      className="pop-up fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <SendAlgoForm />
    </div>
  );
}
