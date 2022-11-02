import { createContext, ReactNode, useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { GCP_CLIENT_ID, GCP_REDIRECT_URI } from 'react-native-dotenv';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GCP_CLIENT_ID,
    redirectUri: GCP_REDIRECT_URI,
    scopes: ['profile', 'email'],
  });

  const signIn = async () => {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (err) {
      console.error(err);

      throw err;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signInWithGoogle = async (access_token: string) => {
    console.log({
      access_token,
    });
  };

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ signIn, user, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
