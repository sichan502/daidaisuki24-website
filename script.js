const pageName = window.location.pathname.split('/')[2].split('.')[0];
//console.log(pageName)

let gid = 0;

switch(pageName) {
    case 'promotion':
        gid = 387982343;
        break;
    case 'coming-soon':
        gid = 1757031130;
        break;
    default:
        gid = 0;
}

const SHEET_ID = '2PACX-1vSUFXWjG5LGAQS9lNLYmIglJxESb4jo3F0nQzix13KDa5kY1_BlvhBroSjTDjONdd9sEPQBhfMKHpJ8'
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?gid=${gid}&single=true&output=csv`;
//console.log(SHEET_URL)

let items = [];
const columnIndex = {
  name: 0,
  category: 1,
  imageURL: 2,
  character: 3,
  price: 4,
  quantity: 5,
  stockStatus: 6,
  onHold: 7
};


async function fetchData() {
  try {
    const response = await axios.get(SHEET_URL);
    const data = response.data
    console.log("data: ")
    console.log(data)
    items = data.split("\n").slice(1).map(row => row.trim().split(","));
    console.log("items: ")
    console.log(items)

    renderCharacters();
    renderCategories();

    if (pageName === 'index')
    {
        renderStatus();
        renderItems();
    }


  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function renderCharacters() {
  const characters = ['All', ...new Set(items.map(item => item[columnIndex.character]))];
  console.log("characters: ")
  console.log(characters)
  const select = document.getElementById('characterFilter');
  select.innerHTML = '';
  characters.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function renderCategories() {
  const categories = ['All', ...new Set(items.map(item => item[columnIndex.category]))];
  console.log("categories: ")
  console.log(categories)
  const select = document.getElementById('categoryFilter');
  select.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function renderStatus() {
  const status = ['All', ...new Set(items.map(item => item[columnIndex.stockStatus]))];
  console.log("status: ")
  console.log(status)
  const select = document.getElementById('statusFilter');
  select.innerHTML = '';
  status.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function renderItems() {
  const container = document.getElementById('items');
  container.innerHTML = '';

  const character = document.getElementById('characterFilter').value;
  console.log("filter by character: " + character)
  const filter = document.getElementById('categoryFilter').value;
  console.log("filter by category: " + filter)
  const status = document.getElementById('statusFilter').value;
  console.log("filter by status: " + status)
  const sort = document.getElementById('sortFilter').value;
  console.log("sort by: " + sort)

    console.log("before filter: ")
    console.log(items)

    let filtered = items.filter(item =>
        (filter === 'All' || item[columnIndex.category] === filter) &&
        (status === 'All' || item[columnIndex.stockStatus] === status) &&
        (character === 'All' || item[columnIndex.character] === character)
      );

    console.log("after filtered: ")
    console.log(filtered)

    switch (sort)
    {
        case 'name':
            filtered.sort((a, b) => a[columnIndex.name].localeCompare(b[columnIndex.name]));
            break;
        case 'price':
            filtered.sort((a, b) => Number(a[columnIndex.price]) - Number(b[columnIndex.price]));
            break;
        default:
    }

    console.log("after sort: ")
    console.log(filtered)

  filtered.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item[columnIndex.imageURL]}" alt="${item[columnIndex.name]}" />
      ${item[columnIndex.stockStatus].toLowerCase().includes("out") ? '<div class="badge">Out of Stock</div>' : ''}
      <div class="card-content">
        <h2>${item[columnIndex.name]}</h2>
        <p>${item[columnIndex.category]}</p>
        <p>${item[columnIndex.price]}</p>
        <p class="stock-status">${item[columnIndex.stockStatus]}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById('characterFilter').addEventListener('change', renderItems);
document.getElementById('categoryFilter').addEventListener('change', renderItems);
document.getElementById('statusFilter').addEventListener('change', renderItems);
document.getElementById('sortFilter').addEventListener('change', renderItems);

fetchData();
