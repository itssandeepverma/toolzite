import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
  );

  const navigate = useNavigate();

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Avatar Uploaded");
      window.location.href = "/me/profile";
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      avatar,
    };

    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
      <MetaData title={"Upload Avatar"} />
      <div className="row wrapper" style={{ marginBottom: "120px" }}>
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded form-dark"
            onSubmit={submitHandler}
            style={{ backgroundColor: "rgba(30,30,30,0.6)", color: "#e0e0e0", padding: 20 }}
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
          <style>{`
            .form-dark .form-label, .form-dark h2 { color: #eaeaea; }
            .form-dark .form-control {
              background-color: #f1f3f5; /* light gray */
              color: #111;
              border: 1px solid rgba(255,255,255,0.15);
            }
            .form-dark .form-control:focus { outline: none; box-shadow: none; }
            .form-dark .form-control::placeholder { color: #cfcfcf; }
            .btn-gradient {
              background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
              color: #111;
              border: none;
              transition: transform .15s ease, box-shadow .15s ease, filter .2s;
            }
            .btn-gradient:hover {
              filter: brightness(1.05);
              box-shadow: 0 8px 24px rgba(0,0,0,0.35);
              color: #111;
            }
          `}</style>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;
