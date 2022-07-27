import { useMemo } from 'react'
import { createHttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client'
import { SchemaLink } from 'apollo-link-schema'
import merge from 'deepmerge'
import { schema } from '../backend/schema'
import { sqldb } from '../backend/sqldb'
import { ApolloClient } from '@apollo/client'

type MyApolloCache = any;
let apolloClient: ApolloClient<MyApolloCache> | undefined;

const createIsomorphLink = () => {
  if (typeof window === 'undefined') {
    return new SchemaLink({ schema, context: { sqldb } })
  } else {
    const httpLink = createHttpLink({
      uri: "http://localhost:3000/api/graphql"
    })
    return httpLink
  }
}

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink() as any, // forceful type conversion to avoid error here
    cache: new InMemoryCache() as any,
  })
}

export const initializeApollo = (initialState: MyApolloCache | null = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (initialState: MyApolloCache | null) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}