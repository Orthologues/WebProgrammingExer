import '../styles/globals.css'
import { useApollo } from '../lib/client'
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client' 
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloCli = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloCli}>
      <Layout />
      <Component {...pageProps}/>
    </ApolloProvider>
  );
}

export default MyApp
