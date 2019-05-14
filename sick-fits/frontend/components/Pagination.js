import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import { perPage } from "../config";
import Head from "next/head";
import Link from "next/link";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

function Pagination({ page }) {
  return (
    <Query query={PAGINATION_QUERY}>
      {({
        error,
        loading,
        data: {
          itemsConnection: {
            aggregate: { count },
          },
        },
      }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        count = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>
                Sick Fits! Page {page} of {count}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: "items",
                query: { page: page - 1 },
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                Prev
              </a>
            </Link>
            <p>
              {page} / {count}
            </p>
            <p>{count} total Items</p>
            <Link
              prefetch
              href={{
                pathname: "items",
                query: { page: page + 1 },
              }}
            >
              <a className="prev" aria-disabled={page >= count}>
                Next
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
}

export default Pagination;
