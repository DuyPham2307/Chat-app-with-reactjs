import "./login.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { uploadImage } from './../../lib/storage';

const Login = () => {

	const [loading, setLoading] = useState(false);

	const [avatar, setAvatar] = useState({
		file: null,
		url: "",
	});

	const handleAvatar = (e) => {
		if (e.target.files[0]) {
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.target);

		const { email, password } = Object.fromEntries(formData);

		try {
			await signInWithEmailAndPassword(auth, email, password);
			toast.success("Login successfully");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}

	};

	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.target);

		const { username, email, password } = Object.fromEntries(formData);

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);

			const imgUrl = await uploadImage(avatar.file);

			await setDoc(doc(db, "users", res.user.uid), {
				username,
				email,
				avatar: imgUrl,
				id: res.user.uid,
				blocked: [],
			});

			await setDoc(doc(db, "userChats", res.user.uid), {
				chat: [],
			});

			toast.success("Signup successfully");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login">
			<div className="item">
				<h2>Welcome back</h2>
				<form onSubmit={handleLogin}>
					<input type="text" name="email" placeholder="Email" />
					<input type="password" name="password" placeholder="Password" />
					<button disabled={loading}>{loading ? "Loading..." : "Sign in"}</button>
				</form>
			</div>
			<div className="separator"></div>
			<div className="item">
				<h2>Create an account</h2>
				<form onSubmit={handleSignup}>
					<label htmlFor="file">
						<img src={avatar.url || "./avatar.png"} alt="" />
						Upload an image
					</label>
					<input type="file" id="file" hidden onChange={handleAvatar} />
					<input type="text" name="username" placeholder="Username" />
					<input type="text" name="email" placeholder="Email" />
					<input type="password" name="password" placeholder="Password" />
					<button disabled={loading}>{loading ? "Loading..." : "Sign up"}</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
