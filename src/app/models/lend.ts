export interface Lend{
  lendId:number;
  customerId:number;
  userId:number;
  bookId:number;
  categoryName:string;
  bookName:string;
  kindName:string;
  userName:string;
  customerName:string;
  lendDate:Date;
  returnBookDate?:Date;
  lendPeriod:number;
  totalDay:Date;
}
