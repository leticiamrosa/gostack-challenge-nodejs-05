import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Data {
  transactions: Request[];
  balance: Balance;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public getAllTranscations(): Data {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    return {
      transactions,
      balance,
    };
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      if (this.transactionsRepository.getBalance().total < value) {
        throw Error('Invalid balance transcation');
      }
    }

    if (!(type === 'outcome' || type === 'income')) {
      throw Error('Invalid type transcation');
    }

    const transcation = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transcation;
  }
}

export default CreateTransactionService;
