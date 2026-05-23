const data = {
    "produtos": [
      {
        "id": 1,
        "nome": "Iphone 17",
        "preco": 8650.00,
        "categoria": "Celulares",
        "imagem": "https://www.pngall.com/wp-content/uploads/20/iPhone-17-Pro-Max-Concept-Art-PNG.png",
        "descricao": "Celular de ultima geração da marca americana Apple.",
        "emEstoque": true
      },
      {
        "id": 2,
        "nome": "Galaxy S25 Ultra",
        "preco": 5200.00,
        "categoria": "Celulares",
        "imagem": "https://png.pngtree.com/png-clipart/20241215/original/pngtree-samsung-s25-ultra-pro-mobile-phone-png-image_17883915.png",
        "descricao": "Celular de ultima geração da marca sul coreana Samsung.",
        "emEstoque": true
      },
      {
        "id": 3,
        "nome": "Alienware",
        "preco": 24000.00,
        "categoria": "Notebooks",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBK9bfx_QvQ3Rcql7K_RrRgbN_iAgUf5ok7g&s",
        "descricao": "Notebook de alta capacidade para diversas tarefas",
        "emEstoque": true
      },
      {
        "id": 4,
        "nome": "MacBook Air",
        "preco": 7500.00,
        "categoria": "Notebooks",
        "imagem": "https://st2.depositphotos.com/1001146/5593/i/450/depositphotos_55936049-stock-photo-apple-macbook.jpg",
        "descricao": "Notebook de ultima geração da marca americana Apple",
        "emEstoque": false
      },
      {
        "id": 5,
        "nome": "Headset Gamer",
        "preco": 250.00,
        "categoria": "Acessórios",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ispHtc5nbsiWja_ZQM5NJMFyXxXS44FvBQ&s",
        "descricao": "Headset RGB para jogos virtuais",
        "emEstoque": true
      },
      {
        "id": 6,
        "nome": "Liquidificador",
        "preco": 400.00,
        "categoria": "Acessórios",
        "imagem": "https://png.pngtree.com/png-clipart/20240312/original/pngtree-electrical-blender-grinder-in-black-png-image_14578114.png",
        "descricao": "Liquidificador portátil",
        "emEstoque": true
      },
      {
        "id": 7,
        "nome": "PlayStation 5",
        "preco": 4200.00,
        "categoria": "Games",
        "imagem": "https://www.skinwraps.com.au/cdn/shop/products/ps5digi-sc-white_1000x.jpg?v=1631464236",
        "descricao": "Console Sony de ultima geração",
        "emEstoque": false
      },
      {
        "id": 8,
        "nome": "Xbox Series X",
        "preco": 4600.00,
        "categoria": "Games",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8cbjOrbK7rVIE33a_OPJ8aoYm7dbcm2LSrg&s",
        "descricao": "Console Microsoft de ultima geração",
        "emEstoque": true
      }
   ]
};

const lista = document.getElementById("product-list");
const detalhes = document.getElementById("product-details");

const busca = document.querySelector("#search");
const categoria = document.querySelector("#category");

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {

    const card = document.createElement("div");

    card.classList.add("card");

    card.setAttribute("data-id", produto.id);

    card.style.padding = "10px";

    card.innerHTML = `
        <h3>${produto.nome}</h3>
        <img src="${produto.imagem}">
        <p>${formatPrice(produto.preco)}</p>
        <p>${produto.categoria}</p>
        <button class="detalhes">Ver detalhes</button>
        <button class="destaque">Destacar</button>
    `;

    card.querySelector(".detalhes").addEventListener("click", () => {
        showProductDetails(produto);
    });

    card.querySelector(".destaque").addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    return card;
}

function renderProducts(produtos) {

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.appendChild(createProductCard(produto));
    });

    document.querySelectorAll(".card").forEach(card => {
        console.log(card.dataset.id);
    });
}

function renderCategories() {

    const categorias = ["Todas"];

    data.produtos.forEach(p => {

        if (!categorias.includes(p.categoria)) {
            categorias.push(p.categoria);
        }
    });

    categoria.innerHTML = "";

    categorias.forEach(cat => {
        categoria.innerHTML += `<option>${cat}</option>`;
    });
}

function showProductDetails(produto) {

    detalhes.innerHTML = `
        <h2>${produto.nome}</h2>
        <p>${formatPrice(produto.preco)}</p>
        <p>${produto.categoria}</p>
        <p>${produto.emEstoque ? "Em estoque" : "Sem estoque"}</p>
        <p>${produto.descricao}</p>
    `;
}

function filterProducts() {

    return data.produtos.filter(p => {

        const nome = p.nome.toLowerCase().includes(busca.value.toLowerCase());

        const cat =
            categoria.value == "Todas" ||
            p.categoria == categoria.value;

        return nome && cat;
    });
}

busca.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categoria.addEventListener("change", () => {
    renderProducts(filterProducts());
});

document.getElementById("btnRender").addEventListener("click", () => {
    renderProducts(filterProducts());
});

renderCategories();

renderProducts(data.produtos);



  