import { LanguageSchema } from "shared-schemas";
import { FaBrandsJava } from "solid-icons/fa";
import { Component, For, Match, Switch } from "solid-js";
import { z } from "zod";

const ArraySchema = LanguageSchema.array();

const Languages: Component<{
  languages?: z.infer<typeof ArraySchema>;
}> = (props) => {
  if (props.languages == null) {
    return (
      <div>
        <p>N/A</p>
      </div>
    );
  }
  return (
    <For each={props.languages}>
      {(language) => {
        return (
          <div>
            <Switch>
              <Match when={language.slug === "java"}>
                <FaBrandsJava size={20} />
              </Match>
            </Switch>
            <span class="sr-only">{language.name}</span>
          </div>
        );
      }}
    </For>
  );
};
export default Languages;
