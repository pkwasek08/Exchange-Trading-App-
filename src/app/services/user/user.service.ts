import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Companie } from 'src/app/models/companie';
import { Stock } from 'src/app/models/stock';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { StockService } from '../stock/stock.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: User;
  loggerUserStockList: Stock[];
  selectedCompanie: Companie;
  apiUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient,
              private stockService: StockService) {
    this.loggedUser = null;
  }

  public doRegistration(user: User) {
    return this.http.post(this.apiUrl, user);
  }

  public doLogin(email: string, password: string) {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.get<User>(this.apiUrl + '/login?' + params);

  }

  public setLoggedUser(user: User) {
    this.loggedUser = user;
    this.stockService.getStockByUserId(this.loggedUser.id).subscribe(stockList => this.loggerUserStockList = stockList);
  }

  public isLoggedUser(): boolean {
    return (this.loggedUser != null);
  }

  public updateUserCash() {
    this.http.get<User>(this.apiUrl + '/' + this.loggedUser.id).subscribe(user => {
      this.loggedUser.cash = user.cash;
    });
    return this.loggedUser;
  }
}
