import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Login = () => {
  const [signInWithEmailAndPassword, user2, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user, loading2, errorHook] = useAuthState(auth);
  const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
  const [semail, setEmail] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  const handleReset = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, semail);
    toast.success("Link sended succsesfully");
  };
  const email = user?.email;
  useEffect(() => {
    if (user) {
      const userData = async () => {
        const { data } = await axios.post(
          "https://rocky-everglades-90190.herokuapp.com/login",
          {
            email,
          }
        );
        localStorage.setItem("accesToken", data);
        // <===== store user to database ====>
        const res = await axios.put(
          `https://rocky-everglades-90190.herokuapp.com/user/${email}`,
          {
            email: email,
          }
        );
        navigate(from);
      };
      userData();
    }
  }, [user]);

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
          <p class="py-6">
            Login to change your lifestyle and build your buisness with us.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 characters or longer",
                    },
                  })}
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              {signInError}
              <a onClick={handleReset} class="label-text-alt link link-hover">
                Forgot password?
              </a>
              <input
                className="btn w-full btn-primary max-w-xs text-white"
                type="submit"
                value="Login"
              />
            </form>
            <div class="divider">OR</div>
            <p>
              Create account!{" "}
              <Link className="text-primary" to="/signup">
                Signup
              </Link>
            </p>
            <button onClick={() => signInWithGoogle()} className="btn">
              Contunu With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
