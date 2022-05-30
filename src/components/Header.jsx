import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../firebase.init";

const Header = ({ children }) => {
  const [user, loading, errorHook] = useAuthState(auth);

  return (
    <div class="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div class="w-full z-10 fixed top-0 left-0 right-0 bg-white navbar">
          <div class="flex-1 px-2 mx-2 uppercase font-bold">
            <Link className="uppercase font-bold text-black" to="/">
              MicroByte
            </Link>
          </div>
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
              {/* <!-- Navbar menu content here --> */}
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "rounded text-primary font-bold uppercase hover:bg-white"
                      : "rounded text-black font-bold uppercase  hover:bg-white"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "rounded text-primary font-bold uppercase hover:bg-white"
                      : "rounded text-black font-bold uppercase  hover:bg-white"
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "rounded text-primary font-bold uppercase hover:bg-white"
                      : "rounded text-black font-bold uppercase  hover:bg-white"
                  }
                  to="/q&a"
                >
                  Q&A
                </NavLink>
              </li>
              <li>
                {!user?.email ? (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "rounded text-primary font-bold uppercase hover:bg-white"
                        : "rounded text-black font-bold uppercase  hover:bg-white"
                    }
                    to="/Login"
                  >
                    Login
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "rounded text-primary font-bold uppercase hover:bg-white"
                        : "rounded text-black font-bold uppercase  hover:bg-white"
                    }
                    to="/dashboard"
                  >
                    DashBoard
                  </NavLink>
                )}
                {user?.email ? (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "rounded text-primary font-bold uppercase hover:bg-white"
                        : "rounded text-black font-bold uppercase  hover:bg-white"
                    }
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        {children}
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "rounded text-primary font-bold uppercase hover:bg-white"
                  : "rounded text-black font-bold uppercase  hover:bg-white"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "rounded text-primary font-bold uppercase hover:bg-white"
                  : "rounded text-black font-bold uppercase  hover:bg-white"
              }
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "rounded text-primary font-bold uppercase hover:bg-white"
                  : "rounded text-black font-bold uppercase  hover:bg-white"
              }
              to="/portfolio"
            >
              PortFolio
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "rounded text-primary font-bold uppercase hover:bg-white"
                  : "rounded text-black font-bold uppercase  hover:bg-white"
              }
              to="/q&a"
            >
              Q&A
            </NavLink>
          </li>
          <li>
            {!user?.email ? (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "rounded text-primary font-bold uppercase hover:bg-white"
                    : "rounded text-black font-bold uppercase  hover:bg-white"
                }
                to="/Login"
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "rounded text-primary font-bold uppercase hover:bg-white"
                    : "rounded text-black font-bold uppercase  hover:bg-white"
                }
                to="/dashboard"
              >
                DashBoard
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
