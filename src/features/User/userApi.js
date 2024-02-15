// this will fetch all info like addresses , orders etc .
export function fetchRegisteredUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/orders/?user.id=${userId}`
    );
    const data = await response.json();
    console.log({data});
    resolve({ data });
  });
}

// this will give the loggedin user whole detail 
export function fetchLoggedInUser (userId)
{
  return new Promise ( async (resolve) => {
    const response = await fetch ('http://localhost:8080/users/'+userId)
    const data = await response.json();
    resolve ({data})
  })
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
