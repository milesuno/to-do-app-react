import React, { Component } from "react";
import "./list.css";

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: JSON.parse(localStorage.getItem("items")) || [],
		};
	}

	componentDidMount() {
		const addItems = document.querySelector(".add-items");
		//itemsList is used as event trigger as it exists before any list item is added.

		const itemsList = document.querySelector(".list");
		addItems.addEventListener("submit", this.handleForm);

		itemsList.addEventListener(
			"click",
			(e) => {
				if (!e.target.dataset.index) return;
				let index = e.target.dataset.index;
				let items = [...this.state.items];
				items[index].done = e.target.checked;
				this.setState({ items });
				localStorage.setItem("items", JSON.stringify(this.state.items));
			},
			true
		);
	}

	componentWillUnmount() {
		let items = [...this.state.items];
		localStorage.setItem("items", JSON.stringify(items));
	}

	handleForm = (e) => {
		e.preventDefault();

		let name = e.target.querySelector("[name='item']").value;
		let item = { name, done: false };
		let items = [...this.state.items];
		items.push(item);


		this.setState({ items });
		localStorage.setItem("items", JSON.stringify(this.state.items));
		e.target.reset();
	};

	deleteItem = (index) => {
		let items = [...this.state.items];
		items = items.filter((item, i) => i !== index);
		this.setState({ items });
		localStorage.setItem("items", JSON.stringify(items));
	};

	render() {
		return (
			<>
				<div class="wrapper">
					<h2>"To-Do" Bot</h2>
					<p></p>
					<ul class="list">
						{this.state.items.length > 0 ? (
							this.state.items.map((item, i) => {
								let checked = !item.done;
								return (
									<li>
										<input
											type="checkbox"
											data-index={i}
											id={`item${i}`}
										/>
										<label for={`item${i}`}>
											{item.name}
										</label>
										<span
											onClick={() => this.deleteItem(i)}
										>
											X
										</span>
									</li>
								);
							})
						) : (
							<li>Add items to list...</li>
						)}
					</ul>
					<form class="add-items">
						<input
							type="text"
							name="item"
							placeholder="Item Name"
							required
						/>
						<input type="submit" value="+ Add Item" />
					</form>
				</div>
			</>
		);
	}
}

export default List;
