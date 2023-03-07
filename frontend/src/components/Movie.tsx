import {
  Component,
  createEffect,
  createMemo,
  For,
  Match,
  Show,
  splitProps,
  Switch,
} from "solid-js";
import { createEventSignal } from "@solid-primitives/event-listener";
import { ToolControllerOutput } from "shared-tools";

const source = new EventSource("http://0.0.0.0:3000/results");

const Results: Component<{ results: ToolControllerOutput }> = (props) => {
  const [{ results }] = splitProps(props, ["results"]);
  if (results.status === "failed") {
    return (
      <>
        <h1>Failed</h1>
        <p>results.id</p>
      </>
    );
  }
  return (
    <>
      <h1>Success</h1>
      <p>parsedData().id</p>
      <For each={results.results}>
        {(result) => {
          return (
            <>
              <div>
                <p>Modularity: {result.metadata.modularity}</p>
                <p>Resolution: {result.metadata.resolution}</p>
                <For each={result.services}>
                  {(service) => {
                    return (
                      <>
                        <p>Name: {service.name}</p>
                        <ul>
                          <For each={service.modules}>
                            {(component) => {
                              return <li>{component}</li>;
                            }}
                          </For>
                        </ul>
                      </>
                    );
                  }}
                </For>
              </div>
              <hr />
            </>
          );
        }}
      </For>
    </>
  );
};

const MyFallback: Component = () => {
  return (
    <>
      <p>No data available</p>
    </>
  );
};

const Movie: Component = () => {
  const h = createEventSignal<Record<string, MessageEvent<string>>>(
    source,
    "message",
    {
      passive: true,
    }
  );

  const parsedData = createMemo(() => {
    const result = ToolControllerOutput.safeParse(
      JSON.parse(h()?.data || "null")
    );
    if (result.success) {
      return result.data;
    }
    return null;
  });

  return (
    <>
      <Show when={parsedData()} fallback={<MyFallback />}>
        <Results
          // @ts-ignore
          results={parsedData()}
        />
      </Show>
    </>
  );
};
export default Movie;
