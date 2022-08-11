import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/client';
import {
  TodoQuery,
  TodoQueryVariables,
  TodoDocument,
  useTodoQuery,
} from '../../generated/graphql-frontend';
import { useRouter } from 'next/router';
import Error from 'next/error';
import UpdateTodoForm from '../../components/UpdateTodoForm';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.params?.id === 'string'
      ? parseInt(context.params.id, 10)
      : NaN;
  if (id) {
    const apolloCli = initializeApollo();
    await apolloCli.query<TodoQuery, TodoQueryVariables>({
      query: TodoDocument,
      variables: { id },
    });
    return { props: { initialApolloState: apolloCli.cache.extract() } };
  }
  return { props: {} };
};

const UpdateTodo = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === 'string' ? parseInt(router.query.id, 10) : NaN;
  const { data, loading, error } = useTodoQuery({ variables: { id } });
  const todo = data?.todo;
  
  if (!id) {
    return <Error statusCode={404} />;
  }
  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>An error occurred.</p>
  ) : todo ? (
    <UpdateTodoForm id={todo.id} initialValues={{ title: todo.title }} />
  ) : (
    <p>Todo not found.</p>
  );
};

export default UpdateTodo;