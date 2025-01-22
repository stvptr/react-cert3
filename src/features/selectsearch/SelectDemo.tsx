import { useEffect, useState } from "react";
import { Select } from "./Select.tsx";

const namesData = [
  { label: "Hello" },
  { label: "Bonjour" },
  { label: "Hola" },
  { label: "Hallo" },
  { label: "Buongiorno" },
  { label: "Dzień dobry" },
];

type UserApiResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
}[];
export const DemoSelectSearchFeature = () => {
  const [data, setData] = useState<UserApiResponse>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        return response;
      })
      .then((response) => response.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-xl">Demo select feature</h1>

      <div className="flex flex-wrap gap-4">
        <Select
          valueChange={(e) => console.log(e)}
          options={data}
          labelKey={"name"}
        />
        <Select
          valueChange={(e) => console.log(e)}
          options={namesData}
          labelKey={"label"}
        />
      </div>
      {/*<div className="mb-8 h-20 bg-blue-400"></div>*/}
    </div>
  );
};
