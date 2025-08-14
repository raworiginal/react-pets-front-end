import * as petService from "./services/petService";
import { useState, useEffect } from "react";
import PetList from "./components/PetList/PetList";

const App = () => {
	const [pets, setPets] = useState([]);
	const [selected, setSelected] = useState(null);

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
	};

	return (
		<>
			<PetList pets={pets} handleSelect={handleSelect} />
		</>
	);
};

export default App;
