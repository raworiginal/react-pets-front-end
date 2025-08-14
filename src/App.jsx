import * as petService from "./services/petService";
import { useState, useEffect } from "react";
import PetList from "./components/PetList/PetList";
import PetDetail from "./components/PetDetail/PetDetail";
import PetForm from "./components/PetForm/PetForm";

const App = () => {
	const [pets, setPets] = useState([]);
	const [selected, setSelected] = useState(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const fetchedPets = await petService.index();
				if (fetchedPets.error) {
					throw new Error(fetchedPets.error);
				}
				setPets(fetchedPets);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPets();
	}, []);

	const handleSelect = (pet) => {
		setSelected(pet);
		setIsFormOpen(false);
	};

	const handleFormView = (pet) => {
		if (!pet._id) setSelected(null);
		setIsFormOpen(!isFormOpen);
	};

	const handleAddPet = async (formData) => {
		try {
			const newPet = await petService.create(formData);
			if (newPet.error) {
				throw new Error(newPet.err);
			}
			setPets([newPet, ...pets]);
			setIsFormOpen(false);
			setSelected(newPet);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdatePet = async (formData, petId) => {
		try {
			const updatedPet = await petService.update(formData, petId);
			if (updatedPet.error) throw new Error(updatedPet.error);

			const updatedPetList = pets.map((pet) =>
				pet._id !== updatedPet._id ? pet : updatedPet
			);

			setPets(updatedPetList);
			setSelected(updatedPet);
			setIsFormOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeletePet = async (petId) => {
		try {
			const deletedPet = await petService.deletePet(petId);
			if (deletedPet.error) throw new Error(deletedPet.error);
			const updatedPetList = pets.filter((pet) => pet._id !== petId);
			setPets(updatedPetList);
			setIsFormOpen(false);
			setSelected(null);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<PetList
				pets={pets}
				handleSelect={handleSelect}
				handleFormView={handleFormView}
				isFormOpen={isFormOpen}
			/>
			{isFormOpen ? (
				<PetForm
					handleAddPet={handleAddPet}
					handleUpdatePet={handleUpdatePet}
					selected={selected}
				/>
			) : (
				<PetDetail
					selected={selected}
					handleFormView={handleFormView}
					handleDeletePet={handleDeletePet}
				/>
			)}
		</>
	);
};

export default App;
