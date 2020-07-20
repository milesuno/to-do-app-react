import React from "react";
import "./App.css";
import botImg from "./icons/icons8-bot-100.png"
import List from "./components/list/list";

//TODO: Add delete and edit functionality
//TODO: Add audio for adding and removing items
//TODO: Create employee tag for "To-do" bot.
function App() {
	return (
		<div className="App">
      <img src={botImg} />
			<List />
		</div>
	);
}

export default App;
