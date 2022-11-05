import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import { useEffect, useState } from 'react';

import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { api } from '../services/api';

interface RouteParams {
  id: string;
}

export function Details() {
  const [selectedOption, setSelectedOption] = useState<'guesses' | 'ranking'>(
    'guesses'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [pool, setPool] = useState<PoolCardProps>({} as PoolCardProps);

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const fetchPool = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);

      setPool(response.data.pool);
    } catch (err) {
      console.error(err);

      toast.show({
        title:
          'Não foi possível carregar os detalhes do bolão. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPool();
  }, [id]);

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={pool.title || ''} showBackButton showShareButton />

      {isLoading ? <Loading /> : null}

      {!isLoading && pool._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={pool} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={selectedOption === 'guesses'}
              onPress={() => setSelectedOption('guesses')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={selectedOption === 'ranking'}
              onPress={() => setSelectedOption('ranking')}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={pool.code} />
      )}
    </VStack>
  );
}
