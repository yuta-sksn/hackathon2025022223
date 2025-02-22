import fetcher from '@/utils/fetcher';
import { spotResponse, spot } from '../types';

export const getspot = async (uuid: string) => {
  return fetcher<spotResponse, spot>(`/v1/Spots/${uuid}`);
};
