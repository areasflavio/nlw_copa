import { GetServerSideProps } from 'next';

interface Props {
  count: number;
}

export default function Home({ count }: Props) {
  return <h1>Contagem: {count}</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count');
  const data = await response.json();

  console.log(data);

  return {
    props: {
      count: data.count,
    },
  };
};
