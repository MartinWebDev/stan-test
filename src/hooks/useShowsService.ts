import { useEffect, useState } from "react";
import { ShowContext } from "../context/ShowContextProvider";
import { Show } from "../models/Show";

// TODO: Baaaaad practice. Config like this should be at the very least in an env file, but since this is a quick demo, it's ok here.
// Real project would include a config setup for such variables, especially since they will be different values across different environments.
const apiRoot = "http://localhost:4000";

export type ShowsService = {
  shows: Show[];
  loading: boolean;
  error: boolean;
};

// TODO: No real reason why this hook can't initialise the context itself rather than pass it in. Would open the floor to debate on that one to decide what people thought was best practice.
export const useShowsService = (context: ShowContext) => {
  // Here we will look to see if we have the data already, if not get it, if so return it.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const get = async () => {
      // TODO: Move to proper service file in services folder
      const response = await fetch(`${apiRoot}/getShows`);

      if (response.ok) {
        const result = await response.json();
        // Updating the context will prompt a re-render, so this component need not worry about storing the data in any way.
        // It need only know if we've got the data or not, and fetch it if not. Let the context do what it should do.
        context.setShows(result);
      } else {
        // Very basic error handling for now, if statuscode is anything other than 200, set to error
        setLoading(false);
        setError(true);
      }
    };

    // Very simple method of fetching data only if it doesn't already exist. Check if it exists first, and if not, call the above function to get it.
    if (context.shows.length === 0) {
      get();
    } else {
      // If we have the data, then set these value accordingly.
      setLoading(false);
      setError(false);
    }
  }, []);

  return {
    shows: context.shows,
    loading,
    error
  };
};
