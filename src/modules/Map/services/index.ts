import { api } from "@/elysia/eden";
import { TMArkGeometry } from "@/types/map";
import { useMutation, useQuery } from "@tanstack/react-query";

// Map service hook
// CRUD operations for map marks
// Create, Read, Update, Delete
export const useMapService = () => {
  const {
    data: mapData,
    error: errorMapData,
    isPending: loadingMapData,
  } = useQuery({
    queryKey: ["map-data"],
    queryFn: () => api.map.get(),
  });

  const {
    mutate: onCreateMapMark,
    data: createdMark,
    error: errorCreatedMark,
    isPending: loadingCreateMark,
  } = useMutation({
    mutationFn: async (markData: TMArkGeometry & { id: string }) =>
      await api.createMapMark.post(markData),
  });

  const {
    mutate: onUpdateMapMark,
    data: updatedMark,
    error: errorUpdateMark,
    isPending: loadingUpdateMark,
  } = useMutation({
    mutationFn: async (markData: TMArkGeometry & { id: string }) =>
      await api.updateMarks.put(markData),
  });

  const {
    mutate: onDeleteMapMark,
    data: deletedMark,
    error: errorDeleteMark,
    isPending: loadingDeleteMark,
  } = useMutation({
    mutationFn: async (id: string) => await api.deleteMarks.delete({ id }),
  });

  return {
    onDeleteMapMark,
    onCreateMapMark,
    onUpdateMapMark,
    mapData,
    deletedMark,
    createdMark,
    updatedMark,
    errorDeleteMark,
    errorUpdateMark,
    errorCreatedMark,
    errorMapData,
    loading:
      loadingDeleteMark ||
      loadingUpdateMark ||
      loadingCreateMark ||
      loadingMapData,
  };
};
