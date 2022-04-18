const searchPhones = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((results) => loadPhones(results.data));
  searchField.value = "";
};
const loadPhones = (phones) => {
  phones.forEach((phone) => {
      const {brand,image,phone_name}=phone;
      console.log(brand);
    const phonesContainer = document.getElementById("phones-container");
    const singlePhoneContainer = document.createElement("div");
    singlePhoneContainer.classList.add("col-lg-4");
    singlePhoneContainer.innerHTML = `
       <div class="card shadow-sm p-2">
            <img class="card-img-top card-image" src="${image}" alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title text-uppercase fw-bold">${phone_name}</h5>
              <h6 class='fw-normal'>${brand}</h6>
              <button class="btn btn-primary">Details</button>
            </div>
        </div>
       `;
    phonesContainer.appendChild(singlePhoneContainer);
  });
};
