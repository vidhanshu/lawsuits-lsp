import { useEffect, useState } from 'react';

type TuseAsyncProps = {
  /**
   * Async function is an asynchronous function that returns data to be stored in the state as a promise
   */
  asyncCallback: Function;
  // this is the dependency array for the useeffect which will make it run again
  dependency?: any[];
};
export default function useAsync<T>({
  asyncCallback,
  dependency = [],
}: TuseAsyncProps) {
  const [state, setState] = useState<{
    loading: boolean;
    data: T | null;
    error: string;
  }>({
    loading: true,
    data: null,
    error: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const d = await asyncCallback();
        setState((prev) => ({ ...prev, data: d }));
      } catch (error: any) {
        setState((prev) => ({ ...prev, error: error.message }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    getData();
  }, dependency);

  const setData = (d: T) => setState((prev) => ({ ...prev, data: d }));

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    setData,
  };
}
