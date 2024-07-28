import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type AstronomicalObject = {
  astronomicalObjectType: string;
  location: {
    uid: string | null;
    name: string | null;
  };
  name: string;
  uid: string;
  isChecked?: boolean;
};

export type AstronomicalObjects = AstronomicalObject[];

export type Page = {
  firstPage: boolean | null;
  lastPage: boolean | null;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type mainData = {
  astronomicalObjects: AstronomicalObjects;
  page: Page;
  sort: {
    clauses: [];
  };
};

export interface CardListProps {
  data: AstronomicalObjects;
  onItemClick: (item: AstronomicalObject) => void;
}

export interface DetailsProps {
  item: AstronomicalObject;
  onClose: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface HeaderProps {
  onEmulateError: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PopupMenuProps {
  selectedItems: AstronomicalObject[];
  onUnselectAll: () => void;
  onDownload: () => void;
  isDownloading: boolean;
  downloadProgress: number;
}

export interface SearchProps {
  onSearchSubmit: (query: string) => void;
  initialSearch: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface LeftSectionProps {
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  storedData: mainData | undefined;
  currentPage: number;
}

export interface RightSectionProps {
  query: URLSearchParams;
  navigate: ReturnType<typeof useNavigate>;
}

export interface AstronomicalObjectsState {
  data: mainData | null;
  loading: boolean;
  selectedItem: AstronomicalObject | null;
  rightSectionLoading: boolean;
  selectedItems: AstronomicalObject[];
  isDownloading: boolean;
  downloadProgress: number;
}

export interface PageDataState {
  data: mainData | null;
  selectedItems: AstronomicalObject[];
  isDownloading: boolean;
  downloadProgress: number;
}

export interface SearchState {
  query: string;
}

export interface SelectedItemState {
  item: AstronomicalObject | null;
  loading: boolean;
}

export interface RootState {
  search: {
    query: string;
  };
}
