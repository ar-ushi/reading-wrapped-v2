import { createContext, useContext  } from "solid-js";
import { createStore } from 'solid-js/store';

interface WrappedStore {
   year: number | null;
  file: File | null;
  parsedData: any | null;
}

const WrappedContext = createContext<{
  state: WrappedStore;
  setState: (v: Partial<WrappedStore>) => void;
}>();

export function WrappedProvider(props: {children: any}){
    const [state, setState] = createStore<WrappedStore>({ year: null,
    file: null,
    parsedData: null,})

  return (
    <WrappedContext.Provider value={{ state, setState }}>
      {props.children}
    </WrappedContext.Provider>
  );
}

export const useWrappedSession = () => {
  const ctx = useContext(WrappedContext);
  if (!ctx) throw new Error('useReadingSession must be used within provider');
  return ctx;
};