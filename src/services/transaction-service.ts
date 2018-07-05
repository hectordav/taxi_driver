import {Injectable} from "@angular/core";
import {TRANSACTIONS} from "./mock-transactions";

@Injectable()
export class TransactionService {
  private transactions:any;

  constructor() {
    this.transactions = TRANSACTIONS;
  }

  getAll() {
    return this.transactions;
  }

  getItem(id) {
    for (var i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].id === parseInt(id)) {
        return this.transactions[i];
      }
    }
    return null;
  }

  remove(item) {
    this.transactions.splice(this.transactions.indexOf(item), 1);
  }
}