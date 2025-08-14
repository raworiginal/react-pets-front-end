const PetList = ({ pets, handleSelect }) => {
	return (
		<div>
			<h1>Pet List</h1>
			<div>
				{!pets.length ? (
					<h2>No Pets Yet!</h2>
				) : (
					<ul>
						{pets.map((pet) => (
							<li
								key={pet._id}
								style={{ cursor: "pointer", color: "#646cff" }}
								onClick={() => {
									handleSelect(pet);
								}}>
								{pet.name}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default PetList;
