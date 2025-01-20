import { Button, CircularProgress } from "@mui/material";
// import styled from "styled-components";

interface ErrorAndLoadingHandlerProps {
  isLoading: boolean;
  children: any;
  error: any;
  refetch: any;
}

/**
 * A simple HOC that can be wrapped around any component that is making a request (doesn't have
 * to be the product query) supports loading and error state as well as giving the option for
 * retrying any failed requests
 */

export const withErrorAndLoadingHandler = ({
  isLoading,
  error,
  refetch,
  children,
}: ErrorAndLoadingHandlerProps) => {
  if (isLoading) {
    return (
      //   <LoadingContainer data-testid={"loading"}>
      <CircularProgress />
      //   </LoadingContainer>
    );
  }

  if (error) {
    return (
      //   <ErrorContainer>
      <div>
        <div>Something went wrong.</div>
        <Button variant="contained" color={"success"} onClick={() => refetch()}>
          Retry
        </Button>
      </div>
      //   </ErrorContainer>
    );
  }

  return children;
};

// const LoadingContainer = styled.div`
//   width: 100%;
//   height: 200px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const ErrorContainer = styled.div`
//   width: 100%;
//   height: 200px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;

//   > button {
//     margin-top: 10px;
//   }
// `;
