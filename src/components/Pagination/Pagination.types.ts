export interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  textColor?: string;
  color?: string;
  shape?: shape;
  startCount: any;
  startPage?: number;
  increaseSibling?: boolean;
  inline?: boolean;
  className?: string;
}

type shape = "rounded" | "squared";

export interface UsePaginationProps {
  totalCount: any;
  pageSize: any;
  siblingCount: any;
  currentPage: any;
  inline?: boolean;
  className?: string;
  startPage: any;
  increaseSibling?: boolean;
  startCount?: any;
}
