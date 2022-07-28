import { initializeApollo } from '../../lib/client'
import { GetServerSideProps } from 'next'
import { TodoQuery, TodoQueryVariables, TodoDocument, useTodoQuery } from '../../generated/graphql-frontend'
import { useRouter } from 'next/router'
import Error from 'next/error'

const UpdateTask = (): JSX.Element => {
    const router = useRouter();
    const id = typeof router.query.id === 'string' ? parseInt(router.query.id, 10) : NaN;
    if (!id) {
        return <Error statusCode={404} />;
    }
    const { data, loading, error } = useTodoQuery({ variables: { id: id } })
    const todo = data?.todo;
    return (
        <p>{
          loading 
          ? "Loading..." 
          : error 
            ? (<p>An error occurred</p>) 
            : todo 
              ? (<p>{todo.title} {todo.status}</p>) 
              : (<p>No todo-items are found!</p>)}
        </p>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = typeof context.params?.id === 'string' ? parseInt(context.params.id, 10) : NaN;
    if (id) {
        const apolloCli = initializeApollo();
        await apolloCli.query<TodoQuery, TodoQueryVariables>({
            query: TodoDocument,
            variables: {
                id: id
            }
        });
        return { props: { initialApolloState: apolloCli.cache.extract() } }
    }
    return { props: {} }
}

export default UpdateTask;