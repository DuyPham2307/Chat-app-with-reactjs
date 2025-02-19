import { useState, useRef, useEffect } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");

	const endRef = useRef();

	useEffect(() => {
		endRef.current.scrollIntoView({ behavior: "smooth" });
	},[endRef]);

	const handleEmoji = (e) => {
		setText((prev) => prev + e.emoji);
		setOpen(false);
	};

	return (
		<div className="chat">
			<div className="top">
				<div className="user">
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<span>Jane Doe</span>
						<p>Lorem ipsum</p>
					</div>
				</div>
				<div className="icons">
					<img src="./phone.png" alt="" />
					<img src="./video.png" alt="" />
					<img src="./info.png" alt="" />
				</div>
			</div>
			<div className="center">
      <div className="message">
					<img src="./avatar.png" alt="" />
					<div className="texts">
            <img src="https://www.life-source.org/wp-content/uploads/2022/11/The-Grieving-Process.jpg" alt="" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
							ullam nemo tempora molestiae temporibus ipsa ratione. Aut itaque
							nisi consequatur vero saepe qui repellat excepturi, error laborum
							accusamus magni incidunt.
						</p>
            <span>1 min ago</span>
					</div>
				</div>
				<div className="message own">
					<img src="./avatar.png" alt="" />
					<div className="texts">
            <img src="https://www.life-source.org/wp-content/uploads/2022/11/The-Grieving-Process.jpg" alt="" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
							ullam nemo tempora molestiae temporibus ipsa ratione. Aut itaque
							nisi consequatur vero saepe qui repellat excepturi, error laborum
							accusamus magni incidunt.
						</p>
            <span>1 min ago</span>
					</div>
				</div>
        <div className="message">
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
							ullam nemo tempora molestiae temporibus ipsa ratione. Aut itaque
							nisi consequatur vero saepe qui repellat excepturi, error laborum
							accusamus magni incidunt.
						</p>
            <span>1 min ago</span>
					</div>
				</div>
        <div className="message">
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
							ullam nemo tempora molestiae temporibus ipsa ratione. Aut itaque
							nisi consequatur vero saepe qui repellat excepturi, error laborum
							accusamus magni incidunt.
						</p>
            <span>1 min ago</span>
					</div>
				</div>
        <div className="message own">
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
							ullam nemo tempora molestiae temporibus ipsa ratione. Aut itaque
							nisi consequatur vero saepe qui repellat excepturi, error laborum
							accusamus magni incidunt.
						</p>
            <span>1 min ago</span>
					</div>
				</div>
        <div className="message">
					<img src="./avatar.png" alt="" />
					<div className="texts">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
							ullam nemo tempora molestiae temporibus ipsa ratione. Aut itaque
							nisi consequatur vero saepe qui repellat excepturi, error laborum
							accusamus magni incidunt.
						</p>
            <span>1 min ago</span>
					</div>
				</div>
				<div ref={endRef}></div>
			</div>
			<div className="bottom">
				<div className="icons">
					<img src="./img.png" alt="" />
					<img src="./camera.png" alt="" />
					<img src="./mic.png" alt="" />
				</div>
				<input
					type="text"
					value={text}
					placeholder="Type some text..."
					onChange={(e) => setText(e.target.value)}
				/>
				<div className="emoji">
					<img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
					<div className="picker">
						<EmojiPicker open={open} onEmojiClick={handleEmoji} />
					</div>
				</div>
				<button className="sendButton">Send</button>
			</div>
		</div>
	);
};

export default Chat;
