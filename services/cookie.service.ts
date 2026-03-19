
import { cookies } from "next/headers";
 const TOKEN_KEY = process.env.LOGIN_TOKEN_KEY!;

export const tokenStorage = {
  get: async(): Promise<string|undefined>=> {
    try {
       const tokenInstance = await cookies();
       return tokenInstance.get(TOKEN_KEY)?.value
     } catch (error) {
       return undefined
     }
  },
  set: async(token: string) => {
     try {
      const tokenInstance = await cookies();
     tokenInstance.set(TOKEN_KEY, token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
     } catch (error) {
     }
  },
  remove: async() => {
    try {
      const tokenInstance = await cookies();
      tokenInstance.delete(TOKEN_KEY)
    } catch (error) {
     
    }
  },
};
