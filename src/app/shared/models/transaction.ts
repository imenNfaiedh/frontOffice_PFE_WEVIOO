import {TypeTransaction} from "./typeTransaction.enum";
import {TransactionStatus} from "./transactionStatus.enum";

export class Transaction {
  transactionId?:number;
  amount?:number;
  currency?:string;
  country?:string;
  transactionDate?:Date;
  typeTransaction?:TypeTransaction ;
  transactionStatus?: TransactionStatus ;
  bankAccountId?:number;

}

