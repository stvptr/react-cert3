import "./App.css";
import { DemoLocalStorageFeature } from "./features/localstorage/DemoLocalStorageFeature.tsx";
import { DemoSelectSearchFeature } from "./features/selectsearch/SelectDemo.tsx";

function App() {
  return (
    <main className="flex flex-col gap-8">
      <DemoLocalStorageFeature />
      <DemoSelectSearchFeature />
    </main>
  );
}

export default App;
