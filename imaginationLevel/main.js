const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
	const username = document.getElementById('username-input').value
	const age = document.getElementById('age-input').value
  
	personData(username, age);
})


function personData(username, age){	
	if (username !== "" || age !== "") {
		fetch(`http://localhost:3000/users?name=${username}&age=${age}`)
			.then((response) => {
				console.log(response)
				return response.json();
			})
			.then ((obj) => {
				obj.map((item,key) => {
					for(var prop in item){
						document.getElementById("result").innerHTML += `${prop}: ${item[prop]}<br>`;
					}
				})	
			})
			.catch((err) => {
				console.log(err)
			})
	}
};