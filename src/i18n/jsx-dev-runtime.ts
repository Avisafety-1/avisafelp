import { jsx, jsxs } from "./jsx-runtime";
import type { jsxDEV as ReactJsxDEV } from "react/jsx-dev-runtime";
export { Fragment } from "./jsx-runtime";
export const jsxDEV: typeof ReactJsxDEV = (type, props, key, isStaticChildren) => (isStaticChildren ? jsxs : jsx)(type, props, key);
export type { JSX } from "react/jsx-runtime";
