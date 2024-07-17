import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useLoginMutation } from "../store/slices/api/authApiSlice";
import { toastManager } from "@/utils/toastManager";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toastManager.loading("Logging in...");
    try {
      const { token } = await login({ email, password }).unwrap();
      dispatch(setCredentials(token));
      router.push("/");
      toastManager.updateStatus(toastId, {
        render: "Logged in successfully",
        type: "success",
      });
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Something went wrong!";
      toastManager.updateStatus(toastId, {
        render: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLoading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
}
