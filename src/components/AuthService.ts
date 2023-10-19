import axios from 'axios';

interface LoginResponse {
  success: boolean;
  token?: string;
  username?: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post('https://rowerwebsite.azurewebsites.net/api/Auth/login', {
      username,
      password,
    });

    if (response.status === 200) {
      const token = response.data;

      const usernameResponse = await axios.get('https://rowerwebsite.azurewebsites.net/api/Auth/Username', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (usernameResponse.status === 200) {
        const username = usernameResponse.data;

        return { success: true, token, username };
      } else {
        return { success: false };
      }
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Login failed', error);
    return { success: false };
  }
};

export const logout = (): void => {
  console.log('Logout successful');
};
