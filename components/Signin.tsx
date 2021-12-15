import Link from "next/link";

export default function Signin() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="flex p-5 shadow-lg rounded-lg flex-col justify-around h-[70%] w-[90%] md:w-[60%] lg:w-[35%]">
        <h2 className=" text-sky-600 lg:text-center">Welcome to AlgoWallet</h2>
        <p className="text-gray-700 lg:text-center">
          login to view your wallets.
        </p>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">username</span>
          <input type="text" name="username" />
        </div>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">password</span>
          <input type="password" name="password" />
        </div>

        <a className="btn-sky text-center w-[50%] self-center hover:scale-105">
          sign in
        </a>

        <p className="text-center">
          don't have an account yet?{" "}
          <Link href="/sign-up">
            <a className="text-sky-400 hover:underline">register</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
