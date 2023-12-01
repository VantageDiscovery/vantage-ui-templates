/// <reference types="vitest" />
/// <reference types="vite/client" />

/* eslint-disable-next-line unicorn/prevent-abbreviations */
interface ImportMetaEnv {
  readonly VITE_MOCK_API: string;
  readonly VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
