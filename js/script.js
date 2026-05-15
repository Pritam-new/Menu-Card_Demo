const menuGrid = document.getElementById("menuGrid")
const categoryFilters = document.getElementById("categoryFilters")
const typeFilters = document.getElementById("typeFilters")

let menuItems = []

let selectedCategory = "All"
let selectedType = "All"

fetch("js/menu.csv")
    .then(response => response.text())
    .then(data => {

        const rows = data.trim().split("\n").slice(1)

        menuItems = rows.map(row => {

            const cols = row.split(",")

            return {
                id: cols[0],
                category: cols[1],
                item_name: cols[2],
                description: cols[3],
                price: cols[4],
                type: cols[5],
                image: cols[6]
            }

        })

        generateCategoryFilters()

        renderMenu()

    })

function generateCategoryFilters(){

    const categories = [
        "All",
        ...new Set(menuItems.map(item => item.category))
    ]

    categories.forEach(category => {

        const button = document.createElement("button")

        button.classList.add("filter-btn")

        if(category === "All"){
            button.classList.add("active")
        }

        button.innerText = category

        button.addEventListener("click", () => {

            selectedCategory = category

            document
                .querySelectorAll("#categoryFilters .filter-btn")
                .forEach(btn => btn.classList.remove("active"))

            button.classList.add("active")

            renderMenu()

        })

        categoryFilters.appendChild(button)

    })

}

typeFilters.querySelectorAll(".filter-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        selectedType = button.dataset.type

        typeFilters
            .querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"))

        button.classList.add("active")

        renderMenu()

    })

})

function renderMenu(){

    menuGrid.innerHTML = ""

    const filteredItems = menuItems.filter(item => {

        const categoryMatch =
            selectedCategory === "All" ||
            item.category === selectedCategory

        const typeMatch =
            selectedType === "All" ||
            item.type === selectedType

        return categoryMatch && typeMatch

    })

    filteredItems.forEach(item => {

        const card = document.createElement("div")

        card.classList.add("card")

        card.innerHTML = `

            <img src="${item.image}" alt="${item.item_name}">

            <div class="card-content">

                <div class="card-top">

                    <div>

                        <h3>${item.item_name}</h3>

                        <span class="badge ${item.type === "Veg" ? "veg" : "nonveg"}">
                            ${item.type}
                        </span>

                        <p class="desc">
                            ${item.description}
                        </p>

                    </div>

                    <div class="price">
                        ₹${item.price}
                    </div>

                </div>

            </div>

        `

        menuGrid.appendChild(card)

    })

}