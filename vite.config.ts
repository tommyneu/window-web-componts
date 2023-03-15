import { defineConfig } from 'vite';
import { minify } from 'html-minifier';
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name?.split('.')[1] ?? "undefined";
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },
  plugins: [
    htmlMinify(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    })],
});

const htmlComponentFile = /\.component\.html\?inline$/;

const minifyHTMLConfig = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
};

function htmlMinify() {
  return {
    name: 'html-minify',

    transform(src: string, id: string) {
      if (htmlComponentFile.test(id)) {
        return {
          code: `export default \`${minify(src, minifyHTMLConfig)}\``,
          map: null,
        };
      } else {
        return;
      }
    },
  };
}
