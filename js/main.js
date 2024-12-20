let categoryList = document.querySelector(".category-list")
let productList = document.querySelector(".preoduct-list") 
let elSearchInput = document.querySelector(".search-input")
let elSingleData = document.querySelector(".get-single-data") 

const request = async (API) => {
    const resolve = await fetch(API)
    const data = await resolve.json()
    return data
}

request("https://api.escuelajs.co/api/v1/categories").then(data => data.map(item => {
    let elItem = document.createElement("li")
    elItem.className = "cursor-pointer text-white"
    elItem.textContent = item.name
    categoryList.appendChild(elItem)

    elItem.addEventListener("click",function(){
        productList.innerHTML = "Loading..."
        setTimeout(() => renderProduct(item.id), 1000)
            

    })
}))

function renderProduct(title, id) {
    request(`https://api.escuelajs.co/api/v1/products/?title=${title}&categoryId=${id}`).then(data => {
        productList.innerHTML = null;
        data.map(item => {
            let elItem = document.createElement("li");
            elItem.className = "w-[300px] bg-li cursor-pointer bg-slate-300 rounded-[30px] p-5 px-5";
            elItem.innerHTML = `
                <strong>${item.category.id}</strong>
                <h2 class="font-bold mb-2 text-white text-[22px]">${item.title}</h2>
                <p class="line-clamp-3 text-white">${item.description}</p>
            `;
            productList.appendChild(elItem);

            elItem.addEventListener("click", function() {
                renderSingleData(item.id, elSingleData);
            });
        });
    });
}

renderProduct("", 0);

elSearchInput.addEventListener("input", function (e) {
    setTimeout(() => renderProduct(e.target.value, 0), 1000);
    productList.innerHTML = "Loading...";
});

function renderSingleData(id, list) {
    request(`https://api.escuelajs.co/api/v1/products/${id}`).then(res => {
        list.innerHTML = `
            <strong class="hidden">${res.category.id}</strong>
            <h2 class="text-white text-center px-[100px] mt-[400px] font-bold mb-2 text-[22px]">${res.title}</h2>
            <p class="text-white text-center px-[100px] mt-[50px] ">${res.description}</p>
        `;
    });
}



