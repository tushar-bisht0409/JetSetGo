export interface SearchData {
    origin: string;
    destination: string;
    travellers: number;
    date: string;
  }
  
  export interface RootState {
    data: SearchData;
  }
  