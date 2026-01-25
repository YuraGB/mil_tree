import { useQuery } from '@tanstack/react-query';
import { getAllPersonsData } from '../services/useReportService';

export const useReportAssignSelect = () => {
  const { data } = useQuery({
    queryKey: ['persons'],
    queryFn: getAllPersonsData,
    staleTime: Infinity,
  });

  return {
    persons: data || [],
  };
};
