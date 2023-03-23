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

export type ButtonProps = {
  type?: JSX.ButtonHTMLAttributes<unknown>["type"];
  variant?: Variant;
  class?: string;
  classList?: { [k: string]: boolean };
  style?: string | JSX.CSSProperties;
  disabled?: boolean;
  onClick?: ((event: MouseEvent) => void) | (() => void);
};

function setVariantClassList(
  variant: Variant
): Required<ButtonProps["classList"]> {
  const classList: ButtonProps["classList"] = {
    "focus:outline-none": true,
    "focus:ring-4": true,
    "font-medium": true,
    "rounded-lg": true,
    "text-sm": true,
    "px-5": true,
    "py-2.5": true,
    "mr-2": true,
    "mb-2": true,
  };
  switch (variant) {
    case Variant.ALTERNATIVE:
      return {
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
    default:
      return {
        ...classList,
        "text-white": true,
        "bg-blue-700": true,
        "hover:bg-blue-800": true,
        "focus:ring-blue-300": true,
        "dark:bg-blue-600": true,
        "dark:hover:bg-blue-700": true,
        "dark:focus:ring-blue-800": true,
      };
  }
  // switch (props.disabled) {
  //   case true:
  //     classList = {
  //       ...classList,
  //       "cursor-not-allowed": true,
  //       "opacity-50": true,
  //     };
  //     break;
  // }
  // return classList;
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

const Button: ParentComponent<ButtonProps> = (props) => {
  const mergedProps = mergeProps(
    {
      type: "button",
      variant: Variant.DEFAULT,
      disabled: false,
    } as const,
    props
  );
  const variantClassList = createMemo(() => {
    return setVariantClassList(mergedProps.variant);
  });
  const disabledClassList = createMemo(() => {
    return setDisabledClassList(mergedProps.disabled);
  })

  const classList = createMemo(() => {
    return {...variantClassList(), ...disabledClassList()};
  })
  return (
    <Dynamic
      type={mergedProps.type}
      component="button"
      disabled={mergedProps.disabled}
      class={mergedProps.class}
      classList={classList()}
      style={mergedProps.style}
      onClick={mergedProps.onClick}
      children={mergedProps.children}
    />
  );
};
export default Button;
