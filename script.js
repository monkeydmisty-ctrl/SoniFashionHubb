// LOAD PRODUCTS
let products = JSON.parse(localStorage.getItem("products"));

if (!products || products.length === 0) {
    products = [
        {
            name: "Floral Kurti",
            image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
            link: "https://www.meesho.com/"
        },
        {
            name: "Casual Dress",
            image: "https://images.unsplash.com/photo-1542060748-10c28b62716f",
            link: "https://www.flipkart.com/"
        }
    ];

    localStorage.setItem("products", JSON.stringify(products));
}
function login() {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;

    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        adminSection.classList.remove("hidden");
        showAdminPanel();
    } else {
        alert("Wrong credentials");
    }
}

function logout() {
    localStorage.removeItem("adminLoggedIn");
    location.reload();
}

function showAdminPanel() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("product-panel").style.display = "block";
}

function displayProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";

    const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

    products.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <button class="buy-btn">View on Store</button>
            ${isAdmin ? `<button class="delete-btn">Delete</button>` : ""}
        `;

        div.querySelector(".buy-btn").onclick = () =>
            window.open(p.link, "_blank");

        if (isAdmin) {
            div.querySelector(".delete-btn").onclick = () => {
                products.splice(i, 1);
                localStorage.setItem("products", JSON.stringify(products));
                displayProducts();
            };
        }

        list.appendChild(div);
    });
}

function addProduct() {
    const name = document.getElementById("name").value;
    const image = document.getElementById("image").value;
    const link = document.getElementById("link").value;

    if (!name || !image || !link) return alert("Fill all fields");

    products.push({ name, image, link });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();

    document.getElementById("name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("link").value = "";
}

displayProducts();

