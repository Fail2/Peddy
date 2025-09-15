let petss = document.querySelector('.pets');
//console.log(petss);
let likedPets = document.querySelector('.likedPets');
let ViewMore = document.querySelector('.ViewMore');
let categories = document.querySelector('#categories');


function NormalButton() {
    let buttons = categories.querySelectorAll('button');
    for (let button of buttons) {
        button.classList.remove('active');
    }
}

//console.log(categories);
console.log(ViewMore);
ViewMore.onclick = () => {
    alert('Clicked');
}
const thumbsUp = [];
async function getAllPets(id = '') {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets/${id}`);
    const data = await res.json();
    petss.classList.remove('grid');
    petss.classList.add('flex')
    petss.innerHTML = '<span class="loading loading-bars loading-xl"></span>';
    setTimeout(() => {
        DisplayPets(data.pets);
    }, 2000);

}





async function getCategories() {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    //console.log(data.categories);
    DisplayCategories(data.categories);
}

function DisplayCategories(categor) {
    for (let category of categor) {
        //console.log(category.id);
        let btn = document.createElement('button');
        btn.className = `${category.category} flex items-center justify-center cursor-pointer border w-50 h-15 border-gray-200 rounded`;
        btn.innerHTML += `<img class="h-10 w-10" src='${category.category_icon}'/>${category.category}`;
        console.log(btn);


        categories.append(btn);
        btn.onclick = () => {
            NormalButton();
            btn.classList.add('active');
            getPetByCategory(`${category.category}`);
        }

    }

}

async function getPetByCategory(category) {
    category = category.toLowerCase();
    //console.log(category);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();
    //console.log(data);
    petss.classList.remove('grid');
    petss.classList.add('flex')
    petss.innerHTML = '<span class="loading loading-bars align-center loading-xl"></span>';

    setTimeout(() => {
        DisplayPets(data.data);
    }, 2000);

}

function DisplayPets(pets) {
    if (pets.length == 0) {
        petss.innerHTML = `<div class="w-full h-100 flex justify-center items-center  rounded-lg bg-gray-900/5"><img src="assets/error.webp"/>
        <p class="font-semibold text-lg" >No Information Available</p></div>`;
        return;
    }
    petss.classList.add('grid');
    petss.innerHTML = '';
    for (let i = 0; i < pets.length; i++) {
        petss.innerHTML += `
        <div class="card bg-base-100 w-full h-auto shadow-sm" style="padding:20px 20px;">
        <figure>
        <img class="img h-40 w-60 object-cover"
        src="${pets[i].image}"
        alt="Shoes" />
        </figure>
       <div class="">
       <p class="text-xl" style="font-weight:600">${pets[i].pet_name}</p>
       <p><i class="fa-solid fa-table-cells-large"></i> Breed: ${pets[i].breed?pets[i].breed:'Not Found'}</p>
       <p><i class="fa-solid fa-calendar-week"></i> Birth: ${pets[i].date_of_birth?pets[i].date_of_birth:'Not Found'}</p>
       <p><i class="fa-solid fa-mercury"></i> Gender: ${pets[i].gender?pets[i].gender:'Not Found'}</p>
       <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pets[i].price?pets[i].price:'Not Found'}</p>
       <div class="card-actions justify-between " style="padding:10px;">
       <button class="thumbsUp btn p-5 text-gray-500 w-1/4" style="padding:5px;"><i class="fa-solid fa-thumbs-up"></i></button>
       <button class="adopt btn p-5 text-[#0E7A81] " style="padding:5px;">Adopt</button>
       <button class=" Details btn p-5 text-[#0E7A81] w-1/4" style="padding:5px;">Details</button>
      </div>
     </div>
     </div>
         `;

        let like = document.querySelectorAll('.thumbsUp');
        let img = document.querySelectorAll('.img');
        let adopt = document.querySelectorAll('.adopt');
        //console.log(like);

        for (let i = 0; i < like.length; i++) {
            like[i].onclick = () => {
                console.log(img[i].src);
                thumbsUp.push(img[i].src);
                let image = document.createElement('img');
                let div = document.createElement('div');
                image.src = img[i].src;
                image.classList = 'rounded-md';
                likedPets.classList.add('border-2');
                likedPets.appendChild(image);

            }
            adopt[i].onclick = () => {
                adopt[i].textContent = 'Adopted'
                adopt[i].classList += 'bg-[#0E7A81] text-white rounded';
                adopt[i].classList.add('curson-none');
            }
        }


    }

}

// for (const i of thumbsUp) {
//     let image = document.createElement('img');
//     image.src = 'i';
//     console.log(image);
//     likedPets.innerHTML += image;
// }
getAllPets();
getCategories();
//console.log(thumbsUp);
// thumbsUp.forEach(x => console.log(x));