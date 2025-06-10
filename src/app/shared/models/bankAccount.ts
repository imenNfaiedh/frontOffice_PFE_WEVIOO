import { TypeBankAccount } from "./typeCompteBancaire";

export class BankAccount {
  bankAccountId?: number;
  accountNumber?: number;
  openingDate?: Date;
  balance?: number;
  typeBankAccount?: TypeBankAccount;
  isBlocked ?: Boolean;
  userFirstName?: string;
  userLastName?: string;

}
