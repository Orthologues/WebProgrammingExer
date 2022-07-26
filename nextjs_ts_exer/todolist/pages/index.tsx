import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { initializeApollo } from '../lib/client'
import { useTodosQuery, TodosQuery, TodosDocument } from '../generated/graphql-frontend'

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
    <div className={styles.container}>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        todos && todos.length > 0 && todos.map(todo => 
          <div key={todo.id}>{todo.title} ({todo.status})</div>
        )
      }
    </div>
  )
}

export default Home
