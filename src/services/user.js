export const loadUser = () => {

  try {
    const user = JSON.parse(localStorage.getItem("user") || "");
    return user;
  }
  catch (ex) {
    return null;
  }
}

export const saveUser = (name) => {
  localStorage.setItem("user", JSON.stringify({ name }))
}