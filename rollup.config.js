import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';

const extensionConfig = {
  input: 'src/main.js',
  plugins: [
    css({ output: 'extension.css' }),
    svelte({
      include: 'src/**/*.svelte',
      compilerOptions: { hydratable: false },
    }),
    // Solves issue with importing 3rd party components like Carbon
    // https://github.com/sveltejs/svelte/issues/3165#issuecomment-699985503
    replace({
      'outros.c.push':
        'if (outros === undefined) { block.o(local); return }\noutros.c.push',
    }),
  ],
  output: {
    file: 'compiled/extension.js',
    format: 'esm',
  },
};

export default extensionConfig
