
export function createOrder(order) {
  return new Promise(async (resolve) => {
    // const response = await fetch("http://localhost:8080/orders", {
    const response = await fetch("https://severdeployment.onrender.com/orders", {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}