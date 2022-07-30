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
import Error from 'next/error';
import { useRef, useEffect } from 'react';

const isTodoStatus = (value: string): value is TodoStatus => {
    return Object.values(TodoStatus).includes(value as TodoStatus);
}

const Home: NextPage = () => {
  const router = useRouter();
  const status = typeof router.query.status === 'string' ? router.query.status : undefined;
  // pre-processing for unmatched $status
  if (status !== undefined && !isTodoStatus(status)) { 
      return (<Error statusCode={404}/>);
  }
  
  const prevStatus = useRef(status);

  useEffect(() => {
      prevStatus.current = status;
  }, [status]);

  const res = useTodosQuery({
      variables: {
          status: status
      },
      fetchPolicy: prevStatus.current === status ? 'cache-first' : 'cache-and-network'
  });
  const todos = res.data?.todos;
  
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
      <TodoFilter status={status}/>
    </div>
    )
}


// An explanation is here: https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
export const getServersideProps: GetServerSideProps = async (context) => {
    const status = typeof context.params?.status === 'string' 
        ? context.params.status : undefined;

    if (status === undefined || isTodoStatus(status)) {
        const apolloCli = initializeApollo();
        await apolloCli.
            query<TodosQuery, TodosQueryVariables>({ query: TodosDocument,
            variables: { status } });
        return {
          props: {
            initialApolloState: apolloCli.cache.extract()
          }
        };
    }
    return { props: {} }
}

export default Home
