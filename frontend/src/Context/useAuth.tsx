// src/hooks/useAuth.tsx
import { createContext, useEffect, useState } from 'react';
import { UserProfile } from '../Models/User';
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/AuthService';
import { toast } from 'react-toastify';
import axios from 'axios';
import { fetchUserActions, saveActions } from '../Services/ActionDataService'; // Import the function
import { ActionData } from '../Models/ActionDataModels';
import React from 'react';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:5240/api';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void; // Modify this
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
  actionData: ActionData[]; // Add this to the context type
  recordAction: (action: string, elementClass: string, quantity?: number) => void; // Add function to record actions
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<string[]>([]); 
  const [actionData, setActionData] = useState<ActionData[]>([]); // Add state for action data
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      // Decode the token to get roles if they are included in the JWT payload
      const decodedToken = jwtDecode<{ role: string[] }>(token);
      setRoles(decodedToken?.role || []); // Assumes roles are in the "role" claim
    }
    setIsReady(true);

    // Fetch user action data after login
    if (token) {
      fetchUserActions().then(setActionData).catch(console.error);
    }
  }, [token]);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success('Login Success!');
          navigate('/login');
        }
      })
      .catch((e) => toast.warning('Server error occurred'));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then(async (res) => {
        if (res) {
          localStorage.setItem('token', res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);

          // Decode token to get roles
          const decodedToken = jwtDecode<{ role: string[] }>(res?.data.token);
          setRoles(decodedToken?.role || []);

          // Fetch and set action data after login
          try {
            const actions = await fetchUserActions();
            setActionData(actions);
          } catch (error) {
            console.error('Error fetching action data:', error);
          }

          toast.success('Login Success!');
          navigate('/');
        }
      })
      .catch((e) => toast.warning('Server error occurred'));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const isAdmin = () => {
    return roles.includes('Admin');
  };

  const recordAction = (action: string, elementClass: string, quantity?: number) => {
    const actions = JSON.parse(localStorage.getItem('actions') || '[]') as ActionData[];
    const existingAction = actions.find(a => a.action === action && a.elementClass === elementClass);
    if (existingAction) {
      quantity? existingAction.quantity = quantity : existingAction.quantity += 1;
    } else {
      actions.push({ action, elementClass, quantity: 1 });
    }
    localStorage.setItem('actions', JSON.stringify(actions));
  };

  const logout = async (): Promise<void> => {
    try {
      const actions = JSON.parse(localStorage.getItem('actions') || '[]') as ActionData[];
      
      for (const action of actions) {
        await saveActions(action);
      }

      // Handle successful logout
      localStorage.removeItem('actions');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser, actionData, recordAction, isAdmin }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
