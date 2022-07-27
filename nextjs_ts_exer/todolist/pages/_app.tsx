import '../styles/globals.css'
import { useApollo } from '../lib/client'
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client' 
import HOME from './index'
import Layout from '../components/Layout';
import TaskForm from '../components/CreateTaskForm'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloCli = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloCli}>
      <Layout />
      <TaskForm />
      <HOME />
    </ApolloProvider>
  );
}

export default MyApp
