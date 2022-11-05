import { useState } from 'react';
import { Heading, Text, useToast, VStack } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export function FindPool() {
  const [isLoading, setIsLoading] = useState(false);
  const [poolCode, setPoolCode] = useState('');

  const navigation = useNavigation();
  const toast = useToast();

  const handleJoinPool = async () => {
    try {
      setIsLoading(true);

      await api.post('/pools/join', { code: poolCode });

      toast.show({
        title: `Você agora faz parte do bolão ${poolCode}!`,
        placement: 'top',
        bgColor: 'green.500',
      });

      navigation.navigate('pools');
    } catch (err) {
      setIsLoading(false);
      console.error(err);

      let errorMessage: string;

      switch (err.response?.data?.message) {
        case 'Pool not found.':
          errorMessage = 'Bolão não encontrado.';
          break;
        case 'You already joined this pool.':
          errorMessage = 'Você já faz parte deste bolão.';
          break;
        default:
          errorMessage = 'Não foi possível buscar o bolão. Tente novamente.';
          break;
      }

      return toast.show({
        title: errorMessage,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{'\n'} seu código único!
        </Heading>

        <Input
          mb={2}
          value={poolCode}
          onChangeText={setPoolCode}
          placeholder="Qual o código do bolão?"
        />

        <Button
          title="Buscar bolão"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}
