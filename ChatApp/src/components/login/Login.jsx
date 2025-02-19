import "./login.css";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
	const [avatar, setAvatar] = useState({
		file: null,
		url: "",
	});

  const handleAvatar = (e) => {
    if(e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

	const handleLogin = (e) => {
		e.preventDefault();
		toast.success("Login successfully");
	};

	const handleSignup = (e) => {
		e.preventDefault();
		toast.success("Signup successfully");
	};

	return (
		<div className="login">
			<div className="item">
				<h2>Welcome back</h2>
				<form onSubmit={handleLogin}>
					<input type="text" name="email" id="" placeholder="Email" />
					<input type="password" name="password" id="" placeholder="Password" />
					<button>Sign in</button>
				</form>
			</div>
			<div className="separator"></div>
			<div className="item">
				<h2>Create an account</h2>
				<form onSubmit={handleSignup}>
					<label htmlFor="file">
						<img src={avatar.url || "./avatar.png" } alt="" />
						Upload an image
					</label>
					<input type="file" id="file" hidden onChange={handleAvatar} />
					<input type="text" name="username" id="" placeholder="Username" />
					<input type="text" name="email" id="" placeholder="Email" />
					<input type="password" name="password" id="" placeholder="Password" />
					<button>Sign up</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
