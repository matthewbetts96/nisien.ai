import { Button, Card, CircularProgress } from "@mui/material";

interface ErrorAndLoadingHandlerProps {
  isLoading: boolean;
  children: any;
  error: any;
  refetch: any;
}

/**
 * A simple HOC that can be wrapped around any component that is making a request
 * supports loading and error state as well as giving the option for
 * retrying any failed requests
 */

export const withErrorAndLoadingHandler = ({
  isLoading,
  error,
  refetch,
  children,
}: ErrorAndLoadingHandlerProps) => {
  if (isLoading) {
    return <CircularProgress data-testid="loading" />;
  }

  if (error) {
    return (
      <Card>
        <div>Something went wrong.</div>
        <Button variant="contained" color={"success"} onClick={() => refetch()}>
          Retry
        </Button>
      </Card>
    );
  }

  return children;
};
