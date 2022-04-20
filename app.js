// Search-Phones
const searchPhones = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // Main-Api-Load
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((results) => loadPhonesInfo(results.data.slice(0, 20)));
  searchField.value = "";
};
// Phones Information
const loadPhonesInfo = (phones) => {
  // Empty-Previous Result
  document.getElementById("phones-container").innerHTML = "";
  // Phones Not Found Error Massage
  if (phones.length === 0) {
    document.getElementById("resultFound-error").style.display = "block";
  } else {
    phones.forEach((phone) => {
      //Apply Destructing
      const { slug, brand, image, phone_name } = phone;
      // All-Phones Container
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
  // Unique-Api Load
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((result) => uniquePhoneDetail(result.data));
};
// Single Phone Information
const uniquePhoneDetail = (detail) => {
  // Apply Destructing Methods
  const { name, image, releaseDate } = detail;
  const { chipSet, displaySize, memory, sensors, storage } =
    detail.mainFeatures;
  const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = detail.others;
  // single-phone-Container
  const phoneDetailContainer = document.getElementById("phone-container");
  phoneDetailContainer.textContent = "";
  const phoneDetail = document.createElement("div");
  phoneDetail.innerHTML = `
    <div class="card text-center p-2 border-0 my-3">
            <img class="card-img-top card-image" src="${image}" alt="Card image cap" />
            <h3 class="my-2 fw-bold">${name}</h3>
            <div class="card-body">
                <h6 class='fw-normal'>ReleaseDate:${
                  releaseDate ? releaseDate : "No release Found!!!"
                }</h6>
                <h4 class="fw-bold">MainFeatures:</h4>
                <h6>Storage:${storage}</h6>
                <h6>ChipSet:${chipSet}</h6>
                <h6>DisplaySize:${displaySize}</h6>
                <h6>Memory:${memory}</h6>
                <h6>Sensors:${
                  sensors ? [...sensors] : "No sensors data Found"
                }</h6>
                <h4 class="fw-bold">Others Information:</h4>
                <h6>Bluetooth:${Bluetooth}</h6>
                <h6>Gps:${GPS}</h6>
                <h6>Nfc:${NFC}</h6>
                <h6>Radio:${Radio}</h6>
                <h6>USB:${USB}</h6>
                <h6>WLAN:${WLAN}</h6>
            </div>
    </div>
  `;
  phoneDetailContainer.appendChild(phoneDetail);
};
