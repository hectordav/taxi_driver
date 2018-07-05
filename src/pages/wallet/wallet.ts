import {Component} from '@angular/core';
import {IonicPage,NavController} from 'ionic-angular';
import {TransactionService} from '../../services/transaction-service';

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {
  // list of transactions
  public records: any;

  constructor(public nav: NavController, public transactionService: TransactionService) {
    // get transactions from service
    this.records = transactionService.getAll();
  }
}
