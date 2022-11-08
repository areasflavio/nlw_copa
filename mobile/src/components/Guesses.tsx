import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';

import { Game, GameProps } from '../components/Game';
import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { Loading } from './Loading';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  const toast = useToast();

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);

      setGames(response.data.games);
    } catch (err) {
      console.error(err);

      toast.show({
        title: 'Não foi possível carregar os jogos. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmGuess = async (gameId: string) => {
    try {
      setIsLoading(true);

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Palpite registrado com sucesso!.',
        placement: 'top',
        bgColor: 'green.500',
      });

      fetchGames();
    } catch (err) {
      console.error(err);

      toast.show({
        title: 'Não foi possível registrar seu palpite. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          firstTeamPoints={firstTeamPoints}
          secondTeamPoints={secondTeamPoints}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleConfirmGuess(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
    />
  );
}
