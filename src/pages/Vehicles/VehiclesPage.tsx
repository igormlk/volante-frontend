import Card from "@/components/Card"
import SearchPage from "@/components/SearchPage"
import CarPlate from "@/components/ui/plate"
import { getVehiclesAPI } from "@/data/api/VehiclesAPI"
import { USE_QUERY_CONFIGS } from "@/data/constants/utils"
import useDebounce from "@/hooks/useDebounce"
import { isToday } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function VehiclesPage() {
  const [searchValue, setSearchValue] = useDebounce({timeout: 800})

  const {data: vehicles, isFetchingNextPage, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ['get_all_vehicles', {searchValue}],
    queryFn: ({pageParam = 1}) => getVehiclesAPI(searchValue, pageParam),
    ...USE_QUERY_CONFIGS,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined
    },
    initialPageParam: 1
  })

  const vehiclesData = vehicles?.pages.flatMap(page => page.data)  || []

  return (
    <SearchPage>
      <SearchPage.Title>Veículos</SearchPage.Title>
      <SearchPage.SearchBar placeholder="Pesquise os veículos aqui..." onChange={(e) => {setSearchValue(e.target.value)}}/>
      <Card.Container>
        {vehiclesData?.map((vehicle: any) => (
          <Card key={vehicle.id}>
            <Card.Header
              title={(vehicle.brand || vehicle.model) ? `${vehicle.brand} ${vehicle.model}` : 'Sem Veículo'}
              description={String(vehicle.year).toUpperCase()}
            >
            <CarPlate plate={vehicle.plate || ''}/>
            </Card.Header>
            {isToday(new Date(vehicle.updatedAt)) && <Card.Badge> </Card.Badge>}
            {/* <Card.Content>
              <p className="flex gap-2 text-sm mb-1"><Palette size={18} className="ml-[1px]"/>{COLORS.find(i => i.value === vehicle.color)?.label || 'Não informada'}</p>
              <p className="flex gap-2 text-sm"><Fuel size={18} className="ml-[1px]"/>{CAR_FUELS.find(i => i.value === vehicle.fuel)?.label || 'Não informado'}</p>
              <p className="flex gap-2 text-sm mt-1"><Car size={18}/>{vehicle.chassi || 'Chassi não informado'}</p>
            </Card.Content> */}
          </Card>
        ))}
      </Card.Container>
      <SearchPage.LoadMore visible={hasNextPage} loading={isFetchingNextPage} onClick={() => fetchNextPage()} >Ver mais</SearchPage.LoadMore>
    </SearchPage>
  )
}
