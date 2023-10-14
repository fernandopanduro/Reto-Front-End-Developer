export interface Transactions {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
  addTransaction?: (transaction: Transaction) => void;
  filteredTransactions?: Transaction[] | undefined;
  setFilteredTransactions?: React.Dispatch<
    React.SetStateAction<Transaction[] | undefined>
  >;
  selectedMonth?: number | null;
  setSelectedMonth?: React.Dispatch<React.SetStateAction<number | null>>;
  currentMonth?: number;
}

export interface Transaction {
  id: string;
  text: string;
  createdAt: Date;
  amount: number;
}
