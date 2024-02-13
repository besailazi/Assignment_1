

document.addEventListener("DOMContentLoaded", function() {
	const backButton = document.querySelector("#backButton");
	const categories = document.querySelector("#categories");
	const contentDiv = document.querySelector("#content");

	// ADD LISTENER FOR THE BACK BUTTON
	backButton.addEventListener("click", function() {
		 backButton.style.display = "none";
		 categories.style.display = "block";
		 contentDiv.innerHTML = "";
	});

	// SELECT AND ADD LISTENERS TO FETCH DATA 
	const categoryButtons = document.querySelectorAll(".categoryButton");
	categoryButtons.forEach(button => {
		 button.addEventListener("click", async function() {
			  const category = button.dataset.category;
			  backButton.style.display = "block";
			  categories.style.display = "none";
			  try {

				// FETCH DATA FROM SWAPI
					const response = await fetch(`https://swapi.dev/api/${category}/`);
					const data = await response.json();
					const items = data.results.slice(0, 6);
					items.forEach(async item => {
						 const itemDiv = document.createElement('div');
						 itemDiv.classList.add('item');

						 const title = document.createElement('h2');
						 title.textContent = item.name || item.title.replace(/^./, str => str.toUpperCase());

						 const propertiesDiv = document.createElement('div');
						 propertiesDiv.classList.add('properties');

						 const propertiesToShow = Object.keys(item).slice(0, 6);
						 propertiesToShow.forEach(property => {
							  const propertyElement = document.createElement('p');
							  propertyElement.textContent = `${property.replace(/_/g, " ").replace(/^./, str => str.toUpperCase())}: ${item[property]}`;
							  propertiesDiv.appendChild(propertyElement);
						 });

						 itemDiv.appendChild(title);
						 itemDiv.appendChild(propertiesDiv);

						 // FETCH IMAGE FOR EACH ITEM
						 const imageUrl = await fetchImageForItem(item, category);
						 if (imageUrl) {
							  const image = document.createElement('img');
							  image.src = imageUrl;
							  image.alt = item.name || item.title;
							  itemDiv.appendChild(image);
						 }

						 contentDiv.appendChild(itemDiv);
					});
			  } catch (error) {
					console.error('Error fetching data:', error);
			  }
		 });
	});
});

async function fetchImageForItem(item, category) {
	let imageName;
    if (item.name) {
        imageName = item.name.replace(/ /g, "_");
    } else if (item.title) {
        imageName = item.title.replace(/ /g, "_");
    } else {

        return null;
    }

    const imageUrl = `assets/${category}/${imageName}.jpeg`;
    
	 return imageUrl;
}