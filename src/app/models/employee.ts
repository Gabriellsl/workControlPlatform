export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: string;
    clients: [{
        name: string,
        hour: number,
        min: number,
        sec: number
    }]
  }