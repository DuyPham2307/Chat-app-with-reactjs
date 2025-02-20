import "./addUser.css";
import { useState } from "react";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
	const [user, setUser] = useState(null);
	const {currentUser} = useUserStore();

	const handleSearch = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username  = formData.get("username");

		try {
			const userRef = collection(db, "users");
			const q = query(userRef, where("username", "==", username));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				setUser(querySnapshot.docs[0].data());
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleAdd = async () => {

		const chatRef = collection(db, "chats");
		const userChatsRef = collection(db, "userChats");

		try {
			const newChatRef = doc(chatRef);

			await setDoc(newChatRef, {
				createAt: serverTimestamp(),
				messages: [],
			});

			await updateDoc(doc(userChatsRef, currentUser.id), {
				chats: arrayUnion({
					chatId: newChatRef.id,
					lastMessage: "",
					receiverId: user.id,
					updateAt: Date.now()
					}),
			});

			await updateDoc(doc(userChatsRef, user.id), {
				chats: arrayUnion({
					chatId: newChatRef.id,
					lastMessage: "",
					receiverId: currentUser.id,
					updateAt: Date.now()
					}),
			});

			console.log("Chat created", newChatRef.id);
			
		} catch (error) {
			console.log("add user err: ",  error);
			
		}
	}

	return (
		<div className="addUser">
			<form onSubmit={handleSearch}>
				<input type="text" name="username" placeholder="Username" />
				<button>Search</button>
			</form>
			{user && <div className="user">
				<div className="detail">
					<img src={user.avatar || "./avatar.png"} alt="" />
					<p>{user.username}</p>
				</div>
				<button onClick={handleAdd}>Add User</button>
			</div>}
		</div>
	);
};

export default AddUser;
