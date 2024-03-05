// this take input
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://severdeployment.onrender.com/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// updating the item
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://severdeployment.onrender.com/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// delete the item
export function deleteCartItem(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://severdeployment.onrender.com/cart/" + id, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: id } });
  });
}

// this give me output for given user
export function fetchItemsbyUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://severdeployment.onrender.com/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

//resetting cart
export async function resetCart(userId) {
  // get all items of user and then delete each item
  return new Promise(async (resolve) => {
    const response = await fetchItemsbyUserId(userId);
    const items = response.data;
    console.log("checking .data format ",items);
    for (let i of items) {
      await deleteCartItem(i.id);
    }
    resolve({ status: "success" });
  });
}
