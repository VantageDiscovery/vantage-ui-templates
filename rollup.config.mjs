import { dts } from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript';


const config = [
  // …
  {
    input: "dist/index.d.ts",
    output: [{ file:'index.d.ts'}],
    plugins: [typescript(), dts()],
  },
];

export default config;