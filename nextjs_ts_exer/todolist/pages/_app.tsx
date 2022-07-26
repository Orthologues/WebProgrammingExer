import '../styles/globals.css'
import { useApollo } from '../lib/client'
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client' 
import HOME from './index'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloCli = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloCli}>
      <HOME />
    </ApolloProvider>
  );
}

export default MyApp
