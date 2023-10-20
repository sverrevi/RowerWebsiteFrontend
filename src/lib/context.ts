import { createContext } from 'react';

interface UserContext{
    username: string | null;
}

const defaultState = {
    username: null
}

export const UserContext = createContext<UserContext>(defaultState)
