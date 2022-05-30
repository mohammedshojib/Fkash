import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";
import auth from "../../firebase.init";

const Profile = () => {
  const [user, loading, errorHook] = useAuthState(auth);
  const [newMyUser, setNewMyUser] = useState([]);
  const email = user?.email;

  const updateDetails = (event) => {
    event.preventDefault();

    const updatedData = {
      name: event.target.name.value,
      number: event.target.number.value,
      education: event.target.education.value,
      address: event.target.address.value,
      link: event.target.link.value,
    };

    const url = `http://localhost:5000/updatedata/${email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ updatedData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Data updated succsessfully");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesToken")}`,
        },
      })
      .then((response) => {
        const myUser = response.data.filter((user1) => user1.email == email);
        setNewMyUser(myUser);
      });
  }, []);

  console.log(newMyUser);

  return (
    <div className="card w-96 m-auto bg-base-100 shadow-xl">
      <h2 className="text-bold text-xl mt-5 uppercase">Profile</h2>
      <form action="" onSubmit={updateDetails}>
        <div class="card-body">
          <div class="form-control">
            <input
              type="text"
              placeholder="Your Name"
              class="input input-bordered"
              name="name"
              defaultValue={newMyUser[0]?.updatedData?.name}
            />
          </div>
          <div class="form-control">
            <input
              type="text"
              placeholder="email"
              class="input input-bordered"
              value={user?.email}
              disabled
            />
          </div>
          <div class="form-control">
            <input
              type="text"
              placeholder="Address"
              class="input input-bordered"
              name="address"
              defaultValue={newMyUser[0]?.updatedData?.address}
            />
          </div>
          <div class="form-control">
            <input
              type="text"
              placeholder="education"
              class="input input-bordered"
              name="education"
              defaultValue={newMyUser[0]?.updatedData?.education}
            />
          </div>
          <div class="form-control">
            <input
              type="number"
              placeholder="phone number"
              class="input input-bordered"
              name="number"
              defaultValue={newMyUser[0]?.updatedData?.number}
            />
          </div>
          <div class="form-control">
            <input
              type="text"
              placeholder="Linkdin Link"
              class="input input-bordered"
              name="link"
              defaultValue={newMyUser[0]?.updatedData?.link}
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
      <div class="divider">OR</div>
      <button onClick={() => signOut(auth)} className="btn">
        SingOut
      </button>
    </div>
  );
};

export default Profile;
