import { useState } from "react";

const PetForm = ({ handleAddPet, handleUpdatePet, selected }) => {
	const intitialState = {
		name: "",
		age: "",
	};
	const [formData, setFormData] = useState(selected ? selected : intitialState);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (selected) handleUpdatePet(formData, selected._id);
		else handleAddPet(formData);
	};

	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name: </label>
				<input
					type="text"
					name="name"
					id="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<label htmlFor="age">Age: </label>
				<input
					type="text"
					name="age"
					id="age"
					value={formData.age}
					onChange={handleChange}
				/>
				<button type="submit">{selected ? "Update Pet" : "Add new Pet"}</button>
			</form>
		</div>
	);
};

export default PetForm;
