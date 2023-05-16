import { LanguageSchema } from "shared-schemas";
import { FaBrandsJava } from "solid-icons/fa";
import { SiOpenapiinitiative } from "solid-icons/si";
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
          <>
            <div class="peer">
              <Switch>
                <Match when={language.slug === "java"}>
                  <FaBrandsJava size={20} />
                </Match>
                <Match when={language.slug === "openapi"}>
                  <SiOpenapiinitiative size={20} />
                </Match>
              </Switch>
              <span class="sr-only">{language.name}</span>
            </div>

            <div
              role="tooltip"
              class="absolute z-10 invisible opacity-0 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 -translate-y-7 translate-x-8 peer-hover:visible peer-hover:opacity-100"
            >
              {language.name}
            </div>
          </>
        );
      }}
    </For>
  );
};
export default Languages;
