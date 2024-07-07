export type AstronomicalObject = {
  astronomicalObjectType: string;
  location: {
    uid: string | null;
    name: string | null;
  };
  name: string;
  uid: string;
};

export type AstronomicalObjects = AstronomicalObject[];

export type Page = {
  firstPage: boolean;
  lastPage: boolean;
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
