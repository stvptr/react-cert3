import { usePersistentState } from "./usePersistentState.ts";

const Counter = () => {
  const { value: count, setValue: setCount } = usePersistentState("count");
  if (
    !(typeof count == "number" || typeof count == "undefined" || count == null)
  )
    throw new Error("Expected count to be a number or undefined");

  return (
    <div className="flex items-center">
      <button
        className="h-10 w-10 rounded-md bg-green-400 p-2 text-white"
        onClick={() => setCount((count ?? 0) + 1)}
      >
        +
      </button>
      <span className="w-10">{count ?? 0}</span>
      <button
        className="h-10 w-10 rounded-md bg-green-400 p-2 text-white"
        onClick={() => setCount((count ?? 0) - 1)}
      >
        -
      </button>
    </div>
  );
};

export const DemoLocalStorageFeature = () => {
  const { value: count } = usePersistentState("count");
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl">Demo local storage</h1>
      <Counter />
      <Counter />
      <p>Count is {typeof count == "number" && count}</p>
    </div>
  );
};
