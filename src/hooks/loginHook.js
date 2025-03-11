import { API_BASE_URL, LOGIN_USER, LOGIN_PASSWORD } from "../config";

const login = async (force_login) => {
  // función asíncrona para iniciar sesión
  if (force_login) {
    // Si `force_login` es verdadero, se solicitará la contraseña otra vez
    localStorage.removeItem("token");
  }
  if (localStorage.getItem("token" && localStorage.getItem("user_id"))) {
    // la primera vez que se inicia sesión, se almacena el token en el almacenamiento local o devuelve el token almacenado
    return {
      token: localStorage.getItem("token"),
    };
  }
  // Si no hay un token almacenado, se solicitará la contraseña
  const response = await fetch(`${API_BASE_URL}/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: LOGIN_USER, password: LOGIN_PASSWORD }),
  });

  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    // Almacena el token en el almacenamiento local y devuelve el token
    return data.token;
  } else {
    throw new Error("Error al iniciar sesión");
  }
};
export default login;
