import { gql } from 'graphql-tag'

export const TodoQueryDoc = gql`
  query Todos {
    todos {
      id
      title
      status
    }
  }
`