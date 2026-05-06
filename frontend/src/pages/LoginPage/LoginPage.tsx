import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

type LoginInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginInputs) => {
    loginUser(form.userName, form.password);
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-lightBlue"
                  placeholder="Your username"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-lightBlue"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-lightBlue hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2.5 transition"
              >
                Sign in
              </button>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-lightBlue font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;