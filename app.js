const searchPhones = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((results) => loadPhonesInfo(results.data));
  searchField.value = "";
};
const loadPhonesInfo = (phones) => {
  if (phones.length === 0) {
    document.getElementById("resultFound-error").style.display = "block";
  } else {
    phones.forEach((phone) => {
      const { slug, brand, image, phone_name } = phone;
      const phonesContainer = document.getElementById("phones-container");
      const singlePhoneContainer = document.createElement("div");
      singlePhoneContainer.classList.add("col-lg-4");
      singlePhoneContainer.innerHTML = `
           <div class="card shadow-sm p-2">
                <img class="card-img-top card-image" src="${image}" alt="Card image cap" />
                <div class="card-body">
                  <h5 class="card-title text-uppercase fw-bold">${phone_name}</h5>
                  <h6 class='fw-normal'>${brand}</h6>
                  <button onclick="loadUniquePhone('${slug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
           `;
      phonesContainer.appendChild(singlePhoneContainer);
      document.getElementById("resultFound-error").style.display = "none";
    });
  }
};
