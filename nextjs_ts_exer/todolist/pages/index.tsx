import type { NextPage } from 'next'
import { useQuery } from '@apollo/react-hooks'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { initializeApollo } from '../lib/client'
import { TodoQueryDoc } from '../lib/queryDoc'

interface TodosQuery {
  todos: {
    id: number, 
    title: string,
    status: string
  }[]
}

// An explanation is here: https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
export const getStaticProps = async () => {
  const apolloCli = initializeApollo();
  await apolloCli.query<TodosQuery>({ query: TodoQueryDoc });
  return {
    props: {
      initialApolloState: apolloCli.cache.extract()
    }
  };
}

const Home: NextPage = () => {
  const res  = useQuery<TodosQuery>(TodoQueryDoc);
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
