// AuthService.ts
import axios from 'axios';

export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    // Perform authentication logic (e.g., sending a request to your server)
    const response = await axios.post('https://rowerwebsite.azurewebsites.net/api/Auth/login', {
      username,
      password,
    });

    // Assuming the server responds with a success status
    if (response.status === 200) {
      // You might also store the token in local storage for future use
      // localStorage.setItem('token', response.data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Login failed', error);
    return false;
  }
};

export const logout = (): void => {
    console.log('Logout successful');
  };
  
