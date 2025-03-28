export interface Response<T> {
    data: T;
    message: string;
    status: "success" | "Error";
  }
  
  type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  
  export type Payload = Record<string, unknown> | null;
  
  export interface FetcherProps {
    url: string;
    method?: RequestMethod;
    token? : boolean
    body?: Payload;
    headerOptions?: { [key: string]: string };
    options?: Record<string, unknown>;
  }
  