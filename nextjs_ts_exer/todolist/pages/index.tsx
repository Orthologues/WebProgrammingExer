import type { NextPage } from 'next'
import Head from 'next/head'
import { initializeApollo } from '../lib/client'
import { useTodosQuery, TodosQuery, TodosDocument } from '../generated/graphql-frontend'
import TodoList from '../components/TodoList'
import CreateTodoForm from '../components/CreateTodoForm'

// An explanation is here: https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
export const getStaticProps = async () => {
  const apolloCli = initializeApollo();
  await apolloCli.query<TodosQuery>({ query: TodosDocument });
  return {
    props: {
      initialApolloState: apolloCli.cache.extract()
    }
  };
}

const Home: NextPage = () => {
  const res  = useTodosQuery();
  const todos = res.data?.todos;
  return (
    <div>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTodoForm onSuccess={res.refetch}/>
      {
      res.loading 
      ? (<p>Loading the GraphQL server...</p>)
      : res.error 
          ? (<p>Loading failed!</p>)
          : todos && todos.length > 0
            ? (<TodoList todos={todos}/>) 
            : (<p>No todos are found!</p>)
      }
    </div>
  )
}

export default Home
