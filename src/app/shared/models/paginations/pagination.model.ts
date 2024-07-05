import { SortOrders } from "../../enums";

export class PaginationRequest {
  private static readonly MaxPageSize: number = 50;

  constructor(options?: PaginationOptions){
    this.pageNumber = options?.pageNumber ?? 0;
    this.pageSize = options?.pageSize ?? 0;
  }

  private _pageNumber: number = 0;
  get pageNumber(): number {
    return this._pageNumber;
  }
  set pageNumber(value: number) {
    this._pageNumber = value > 0 ? value : 0;
  }

  private _pageSize: number = 10;
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(value: number) {
    this._pageSize = value > PaginationRequest.MaxPageSize ? PaginationRequest.MaxPageSize : value;
  }

  private _sortBy: string = 'Id';
  get sortBy(): string {
    return this._sortBy;
  }
  set sortBy(value: string) {
    this._sortBy = value;
  }

  private _sortOrder: SortOrders = SortOrders.Ascending;
  get sortOrder(): string {
    return this._sortOrder === SortOrders.Ascending ? 'asc' : 'desc';
  }
  set sortOrder(value: string) {
    this._sortOrder = value === 'asc' ? SortOrders.Ascending : SortOrders.Descending;
  }

  get offset(): number {
    return this.pageNumber * this.pageSize;
  }
}

export interface PaginationOptions {
  pageSize?: number;
  pageNumber?: number;
}

export interface PaginationResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  sortBy: string;
  sortOrder: string;
  items: T[];
  isCompleted: boolean;
}