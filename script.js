const SHEET_ID = '2PACX-1vSUFXWjG5LGAQS9lNLYmIglJxESb4jo3F0nQzix13KDa5kY1_BlvhBroSjTDjONdd9sEPQBhfMKHpJ8'
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

let items = [];
const columnIndex = {
  name: 0,
  category: 1,
  price: 2,
  quantity: 3,
  stockStatus: 4,
  onHold: 5,
  imageURL: 6
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
    //items = rows.map(row => Object.fromEntries(header.map((h, i) => [h.toLowerCase(), row[i] || ''])));
    //console.log(items)
//    fetch(SHEET_URL)
//      .then(response => response.text())
//      .then(data => {
//        const rows = data.split("\n").map(row => row.trim().split(","));
//        console.log(rows); // Now you can use this data for your inventory
//      });
    renderCategories();
    renderItems();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
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

function renderItems() {
  const container = document.getElementById('items');
  container.innerHTML = '';

  const search = document.getElementById('search').value.toLowerCase();
  console.log("search value: " + search)
  const filter = document.getElementById('categoryFilter').value;
  console.log("filter by: " + filter)
  const sort = document.getElementById('sortFilter').value;
  console.log("sort by: " + sort)

    console.log("before filter: ")
    console.log(items)

  let filtered = items.filter(item =>
    (filter === 'All' || item[columnIndex.category] === filter) &&
    item[0].toLowerCase().includes(search)
  );
    console.log("after filtered: ")
    console.log(filtered)
    let sortBy = sort === 'name' ? columnIndex.name : columnIndex.stockStatus;

  filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

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
        <p class="stock-status">${item[columnIndex.stockStatus]}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', renderItems);
document.getElementById('categoryFilter').addEventListener('change', renderItems);
document.getElementById('sortFilter').addEventListener('change', renderItems);

fetchData();
