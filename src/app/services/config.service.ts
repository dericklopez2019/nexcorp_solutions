import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(){}
  getUrl(key: any): string {
    return Env.host + Env.url[key];
   }
}

export const Env = {
  host:'https://nodemysql-production-0823.up.railway.app',

  url: {
    clientes:'/clientes',
    productos:'/productos'
  }
}
