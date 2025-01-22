import "./App.css";
import { DemoLocalStorageFeature } from "./features/localstorage/DemoLocalStorageFeature.tsx";
import { DemoSelectSearchFeature } from "./features/selectsearch/SelectDemo.tsx";
import { DemoDialogFeature } from "./features/dialog/DemoDialogFeature.tsx";

function App() {
  return (
    <main className="flex flex-col gap-8">
      <DemoLocalStorageFeature />
      <DemoSelectSearchFeature />
      <DemoDialogFeature />
    </main>
  );
}

export default App;
