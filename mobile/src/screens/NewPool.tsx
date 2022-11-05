import { useState } from 'react';
import { Heading, Text, useToast, VStack } from 'native-base';

import Logo from '../assets/logo.svg';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';

export function NewPool() {
  const [poolTitle, setPoolTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleCreatePool = async () => {
    if (!poolTitle.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsLoading(true);

      await api.post('/pools', { title: poolTitle });

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      setPoolTitle('');
    } catch (err) {
      console.error(err);

      toast.show({
        title: 'Não foi possível criar seu bolão. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa{'\n'}e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          value={poolTitle}
          onChangeText={setPoolTitle}
          placeholder="Qual o nome do seu bolão?"
        />

        <Button
          title="Criar meu bolão"
          onPress={handleCreatePool}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que você poderá
          usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
