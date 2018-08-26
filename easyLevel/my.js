const store = {
	prevPage: "",
	nextPage: ""
}

document.getElementById('forward').addEventListener("click", () => { 
	if (store.nextPage) {
		getCharacters(store.nextPage);
	}
});

document.getElementById('backward').addEventListener("click", () => { 
	if (store.prevPage) {
		getCharacters(store.prevPage);
	}
});

const getCharacters = (url = "https://rickandmortyapi.com/api/character") => {
	axios
		.get(url)
		.then(result => {
			store.nextPage = result.data.info.next;
			store.prevPage = result.data.info.prev;
			console.log(store);
			createCharactersList(result.data.results);
		})
		.catch(err => {
			console.log(err);
		});
};
getCharacters();


const createSingleCard = character => {
	const characterWrapper = document.createElement("div");
	characterWrapper.classList.add("character-container");
	characterWrapper.classList.add("card");

	const characterImage = document.createElement("img");
	characterImage.classList.add("character-image");
	characterImage.classList.add("card-image");
	characterImage.src = character.image;

	const characterBody = document.createElement("div");
	characterBody.classList.add("character-body");
	characterBody.classList.add("card-title");
	characterBody.innerText = character.name;

	const characterRace = document.createElement("div");
	characterRace.classList.add("character-body");
	characterRace.classList.add("btn-floating,halfway-fab,waves-effect,waves-light,red");
	characterRace.innerText = character.species;

	characterWrapper.appendChild(characterImage);
	characterWrapper.appendChild(characterBody);
	characterWrapper.appendChild(characterRace);
	return characterWrapper;
};


const createCharactersList = charactersArray => {
	if (document.getElementById("wrapper")) {
		document.body.removeChild(document.getElementById("wrapper"));
	}
	const charactersNodes = charactersArray.map(character => 
		createSingleCard(character)
	);

	const charactersListWrapper = document.createElement("div");
	charactersListWrapper.classList.add("character-list-wrapper");
	charactersListWrapper.id = "wrapper";
	charactersNodes.forEach(characterNode => 
		charactersListWrapper.appendChild(characterNode)
	);

	document.body.appendChild(charactersListWrapper)
};