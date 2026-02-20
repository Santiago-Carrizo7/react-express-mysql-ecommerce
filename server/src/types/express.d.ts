
export {} 

declare global {
  namespace Express {
    export interface Request {
      session: {
        user: {
          id: string;
          email: string;
        }
      }
    }
  }
}