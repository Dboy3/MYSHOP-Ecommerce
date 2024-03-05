// A mock function to mimic making an async request for data
export default function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://severdeployment.onrender.com/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  console.log("the received id : " , id );
  return new Promise(async (resolve) => {
    const response = await fetch(`https://severdeployment.onrender.com/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // TODO : WILL support multiple sorting functions
  // the filter : {"category" : ["smartphones","laptops"]}
  // pagination = _pages=1&_limit=10

  let query = "";
  for (let key in filter) {
    const catVals = filter[key];
    if (catVals.length > 0) {
      const lastVal = catVals[catVals.length - 1];
      query += `${key}=${lastVal}&`;
    }
  }

  for (let key in sort) {
    query += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    query += `${key}=${pagination[key]}`;
  }

  console.log(query);

  return new Promise(async (resolve) => {
    const response = await fetch(`https://severdeployment.onrender.com/products?${query}`);
    const data = await response.json();
    // this is feature of json server to get total items
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://severdeployment.onrender.com/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://severdeployment.onrender.com/brands ");
    const data = await response.json();
    resolve({ data });
  });
}
