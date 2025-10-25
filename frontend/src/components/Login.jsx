import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      dispatch(setUser({ uid: user.uid, email: user.email, token }));
      navigate("/transactions");
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Finance Tracker</h1>
      <button className="login-btn" onClick={handleLogin}>
        <FcGoogle size={28} />
        Sign in with Google
      </button>
    </div>
  );
}
