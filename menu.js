// Select all menu elements
const categoryButtons = document.querySelectorAll(".category-btn");
const foodCards = document.querySelectorAll(".food-card");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

// Category filtering
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.category;

        filterFood(category, searchInput.value);
    });
});

// Search food
searchInput.addEventListener("input", () => {
    const activeButton = document.querySelector(
        ".category-btn.active"
    );

    const category = activeButton ? activeButton.dataset.category : "all";
    filterFood(category, searchInput.value);
});

// Display matching food
function filterFood(category, search) {

    let visibleCount = 0;

    foodCards.forEach(card => {

        const foodName = card.querySelector("h3")
            .textContent.toLowerCase();

        const matchesCategory =
            category === "all" || card.dataset.category === category;

        const matchesSearch = foodName.includes(
            search.toLowerCase().trim()
        );

        if (matchesCategory && matchesSearch) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleCount !== 0;
}

// Filter food by category and search
function filterFood(category, search) {

    let visibleCount = 0;

    foodCards.forEach(card => {

        const foodName = card.querySelector("h3")
            .textContent.toLowerCase();

        const foodCategory = card.dataset.category;

        const matchesCategory =
            category === "all" || foodCategory === category;

        const matchesSearch =
            foodName.includes(search.trim().toLowerCase());

        if (matchesCategory && matchesSearch) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleCount > 0;
}

// Get existing cart
function getCart() {
    return JSON.parse(
        localStorage.getItem("campusBitesCart") || "[]"
    );
}

// Update cart count
function updateCartCount() {
    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Add food to cart
document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        let cart = getCart();

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem(
            "campusBitesCart",
            JSON.stringify(cart)
        );

        updateCartCount();

        alert(name + " has been added to your cart!");
    });
});

// Show saved cart quantity when page opens
updateCartCount();
