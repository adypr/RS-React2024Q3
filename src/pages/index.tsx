import React from 'react';
import { GetServerSideProps } from 'next';
import { fetchAstronomicalObjects } from '../services/api';
import AstronomicalObjectsPage from '../components/AstronomicalObjects';
import { mainData } from '../models/data.interface';

export interface HomeProps {
  data: mainData;
  currentPage: number;
  searchQuery: string;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const currentPage = parseInt(context.query.page as string) || 1;
  const searchQuery = Array.isArray(context.query.name) ? context.query.name[0] : context.query.name || '';

  const data = await fetchAstronomicalObjects({ currentPage, searchQuery });

  return {
    props: {
      data,
      currentPage,
      searchQuery,
    },
  };
};

const Home: React.FC<HomeProps> = ({ data, currentPage, searchQuery }) => {
  return <AstronomicalObjectsPage data={data} currentPage={currentPage} searchQuery={searchQuery} />;
};

export default Home;
