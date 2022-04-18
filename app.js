const searchPhones=()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res=>res.json())
    .then(data=>console.log(data))
    searchField.value='';
}