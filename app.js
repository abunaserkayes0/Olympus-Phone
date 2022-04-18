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
const loadUniquePhone = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((result) => uniquePhoneDetail(result.data));
};

const uniquePhoneDetail = (detail) => {
  console.log(detail);
  const { image, releaseDate } = detail;
  const phoneDetailContainer = document.getElementById("phone-container");
  phoneDetailContainer.textContent='';
  const phoneDetail = document.createElement("div");
  phoneDetail.innerHTML = `
    <div class="card text-center p-2 border-0 my-3">
            <img class="card-img-top card-image" src="${image}" alt="Card image cap" />
            <div class="card-body">
                <h6 class='fw-normal'>${
                  releaseDate ? releaseDate : "No release Found!!!"
                }</h6>
            </div>
    </div>
  `;
  phoneDetailContainer.appendChild(phoneDetail);
};
