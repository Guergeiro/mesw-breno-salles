import { createMemo, JSX, mergeProps, ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

const Variant = {
  DEFAULT: "default",
  ALTERNATIVE: "alternative",
  DARK: "dark",
  LIGHT: "light",
  GREEN: "green",
  RED: "red",
  YELLOW: "yellow",
  PURPLE: "purple",
} as const;

type Variant = (typeof Variant)[keyof typeof Variant];

export type AnchorProps = {
  variant?: Variant;
  href?: string;
  class?: string;
  classList?: { [k: string]: boolean };
  style?: string | JSX.CSSProperties;
  disabled?: boolean;
  onClick?: ((event: MouseEvent) => void) | (() => void);
};

function setVariantClassList(
  variant: Variant,
  classList?: AnchorProps["classList"]
): Required<AnchorProps["classList"]> {
  if (classList == null) {
    classList = {
    };
  }
  classList = {
      "focus:outline-none": true,
      "focus:ring-4": true,
      "font-medium": true,
      "rounded-lg": true,
      "text-sm": true,
      "px-5": true,
      "py-2.5": true,
      ...classList
  }
  switch (variant) {
    case Variant.DEFAULT:
      classList = {
        ...classList,
        "text-white": true,
        "bg-blue-700": true,
        "hover:bg-blue-800": true,
        "focus:ring-blue-300": true,
        "dark:bg-blue-600": true,
        "dark:hover:bg-blue-700": true,
        "dark:focus:ring-blue-800": true,
      };
      break;
    case Variant.ALTERNATIVE:
      classList = {
        ...classList,
        "text-gray-900": true,
        "bg-white": true,
        border: true,
        "border-gray-200": true,
        "hover:bg-gray-100": true,
        "hover:text-blue-700": true,
        "focus:ring-gray-200": true,
        "dark:focus:ring-gray-700": true,
        "dark:bg-gray-800": true,
        "dark:text-gray-400": true,
        "dark:border-gray-600": true,
        "dark:hover:text-white": true,
        "dark:hover:bg-gray-700": true,
      };
      break;
    case Variant.LIGHT:
      classList = {
        ...classList,
        "text-gray-900": true,
        "bg-white": true,
        border: true,
        "border-gray-300": true,
        "hover:bg-blue-800": true,
        "hover:bg-gray-100": true,
        "focus:ring-gray-200": true,
        "dark:bg-gray-800": true,
        "dark:text-white": true,
        "dark:border-gray-600": true,
        "dark:hover:bg-gray-700": true,
        "dark:hover:border-gray-600": true,
        "dark:focus:ring-gray-700": true,
      };
      break;
  }
  return classList;
}

function setDisabledClassList(disabled: boolean) {
  switch (disabled) {
    case true:
      return {
        "cursor-not-allowed": true,
        "opacity-50": true,
      };
    default:
      return {
        "cursor-not-allowed": false,
        "opacity-50": false,
      };
  }
}

const Anchor: ParentComponent<AnchorProps> = (props) => {
  const mergedProps = mergeProps(
    {
      disabled: false,
    } as const,
    props
  );
  const variantClassList = createMemo(() => {
    if (mergedProps.variant == null) {
      return props.classList;
    }
    return setVariantClassList(mergedProps.variant, props.classList);
  });
  const disabledClassList = createMemo(() => {
    return setDisabledClassList(mergedProps.disabled);
  });

  const classList = createMemo(() => {
    return { ...variantClassList(), ...disabledClassList() };
  });
  const finalProps = mergeProps(
    {
      onClick: (e: MouseEvent) => {
        if (mergedProps.disabled) {
          e.preventDefault();
        }
      },
    },
    mergedProps
  );
  return (
    <Dynamic
      component="a"
      href={finalProps.href}
      class={finalProps.class}
      classList={classList()}
      style={finalProps.style}
      onClick={finalProps.onClick}
      children={finalProps.children}
    />
  );
};
export default Anchor;
