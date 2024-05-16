import {createContext, useState, ReactNode} from 'react'

interface UserContextType {
    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
    id: string | null;
    setId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserContextProviderProps {
    children: ReactNode;
}

export function UserContextProvider({children}: UserContextProviderProps){
    const[username, setUsername] = useState<string | null>(null)
    const[id, setId] = useState<string | null>(null)
    return (
        <UserContext.Provider value={{username, setUsername, id, setId}}>
            {children}
        </UserContext.Provider>
    );
}