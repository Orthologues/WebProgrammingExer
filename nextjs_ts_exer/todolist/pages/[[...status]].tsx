import type { NextPage } from 'next'
import Head from 'next/head'
import { initializeApollo } from '../lib/client'
import { useTodosQuery, TodosQuery, TodosDocument, TodosQueryVariables } from '../generated/graphql-frontend'
import TodoList from '../components/TodoList'
import CreateTodoForm from '../components/CreateTodoForm'
import TodoFilter from '../components/TodoFilter'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { TodoStatus } from '../generated/graphql-frontend'
import { useRef, useEffect } from 'react';
import Custom404 from './404';

const isTodoStatus = (value: string): boolean => {
    const todoStatusVals: string[] = Object.values(TodoStatus); 
    return todoStatusVals.includes(value);
}

const toGermanNounStyle = (word: string): string => {
  if (word.length === undefined || word.length === 0) {
    return "";
  } 
  if (word.length === 1) {
    return word.toUpperCase();
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const Home: NextPage = () => {
  const router = useRouter();
  const status = Array.isArray(router.query.status) 
    && router.query.status.length
    ? router.query.status[0] : undefined;
  const mappedStatus = status===undefined ? status : isTodoStatus(status) 
    ? TodoStatus[toGermanNounStyle(status) as keyof typeof TodoStatus] : undefined;
  
  const prevStatus = useRef(status);

  useEffect(() => {
      prevStatus.current = status;
  }, [status]);

  const res = useTodosQuery({
      variables: {
          status: mappedStatus
      },
      fetchPolicy: prevStatus.current === status ? 'cache-first' : 'cache-and-network'
  });
  const todos = res.data?.todos;
  
  // pre-processing for unmatched $status
  if (status !== undefined && !isTodoStatus(status)) {
    return <Custom404 />;
  }
  return (
    <div>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTodoForm onSuccess={res.refetch}/>
      {
      res.loading && !todos
      ? (<p>Loading todos...</p>)
      : res.error 
          ? (<p>Loading failed!</p>)
          : todos && todos.length > 0
            ? (<TodoList todos={todos}/>) 
            : (<p>No todos are found!</p>)
      }
      <TodoFilter status={mappedStatus}/>
    </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const status = typeof context.params?.status === 'string' 
      ? context.params.status : undefined;
    const mappedStatus = status===undefined ? status : isTodoStatus(status) 
      ? TodoStatus[toGermanNounStyle(status) as keyof typeof TodoStatus] : undefined;

    if (status === undefined || isTodoStatus(status)) {
        const apolloCli = initializeApollo();
        await apolloCli.
            query<TodosQuery, TodosQueryVariables>({ query: TodosDocument,
            variables: { status: mappedStatus } });
        return {
          props: {
            initialApolloState: apolloCli.cache.extract()
          }
        };
    }
    return { props: {} }
}

export default Home
