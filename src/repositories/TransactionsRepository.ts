import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTranscationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private getIncome(): number {
    return this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((arr, type) => arr + type.value, 0);
  }

  private getOutcome(): number {
    return this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((arr, type) => arr + type.value, 0);
  }

  public getBalance(): Balance {
    const income = this.getIncome();
    const outcome = this.getOutcome();

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTranscationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
