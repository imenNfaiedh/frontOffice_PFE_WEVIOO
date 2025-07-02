import { TypeBankAccount } from "./typeCompteBancaire";

export class BankAccount {
  bankAccountId?: number;
  accountNumber?: any;
  openingDate?: Date;
  balance?: number;
  typeBankAccount?: TypeBankAccount;
  isBlocked ?: Boolean;
  userFirstName?: string;
  userLastName?: string;

}
