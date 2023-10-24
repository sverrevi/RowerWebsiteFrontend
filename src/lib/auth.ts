import axios from "axios";

export function storeCredentials(token: string) {
  //const tokenJSON = JSON.stringify(token);
  sessionStorage.setItem("token", token);
}

export async function getAuthenticatedUserOrNull() {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  const usernameResponse = await axios.get(
    "https://rowerwebsite.azurewebsites.net/api/Auth/Username",
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  const username = await usernameResponse.data;
  return username;
}

export function clearCredentials(){
    sessionStorage.clear();
}
