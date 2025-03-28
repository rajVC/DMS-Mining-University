declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
      id: number
      session_id: string;
      role_id: string;
      email: string;
      user_type: string;
      contact: string;
      name: string;
      client_id: number;
      first_name : string;
      last_name : string
  
    }
  
    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
      id: number
      session_id: string;
      role_id: string;
      email: string;
      user_type: string;
      contact: string;
      name: string;
      client_id: number;
      first_name : string;
      last_name : string
    }
  }
  
  // The `JWT` interface can be found in the `next-auth/jwt` submodule
  import "next-auth/jwt";
  
  declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
      id: number
      session_id: string;
      role_id: string;
      email: string;
      user_type: string;
      contact: string;
      name: string;
      client_id : number;
      first_name : string;
      last_name : string
    }
  }
  