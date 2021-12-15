import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="flex p-5 shadow-lg rounded-lg flex-col justify-around h-[80%] w-[90%] md:w-[60%] lg:w-[35%]">
        <h2 className=" text-sky-600 lg:text-center">Welcome to AlgoWallet</h2>
        <p className="text-gray-700 lg:text-center">singup to create wallet.</p>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">username</span>
          <input type="text" name="username" />
        </div>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">password</span>
          <input type="password" name="password" />
        </div>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">password confirmation</span>
          <input type="password" name="password-confirm" />
        </div>

        <a className="btn-sky text-center w-[50%] self-center hover:scale-105">
          sign up
        </a>

        <p className="text-center">
          already have an account?{" "}
          <Link href="sign-in">
            <a className="text-sky-400 hover:underline">login</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
