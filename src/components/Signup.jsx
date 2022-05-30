import axios from "axios";
import React, { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Signup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
  const [user2, loading2, errorHook] = useAuthState(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const signupHandle = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pass = event.target.pass.value;
    createUserWithEmailAndPassword(email, pass);
  };

  useEffect(() => {
    const email = user2?.email;
    if (user2) {
      const userData = async () => {
        const { data } = await axios.post(
          "https://microbyte.herokuapp.com/login",
          {
            email,
          }
        );
        localStorage.setItem("accesToken", data);
        // <===== store user to database ====>
        const res = await axios.put(
          `https://microbyte.herokuapp.com/user/${email}`,
          {
            email: email,
          }
        );
        navigate(from);
      };
      userData();
    }
  }, [user2]);
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Singup now!</h1>
          <p class="py-6">
            Singup to change your lifestyle and build your buisness with us.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <form action="" onSubmit={signupHandle}>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  class="input input-bordered"
                  name="email"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  class="input input-bordered"
                  name="pass"
                />
                <label class="label">
                  <p className="text-error">
                    {error?.message || error1?.message}
                  </p>
                </label>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-primary" type="submit">
                  Signup
                </button>
              </div>
            </form>
            <div class="divider">OR</div>{" "}
            <p>
              Allready Have Account!{" "}
              <Link className="text-primary" to="/login">
                Login
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

export default Signup;
