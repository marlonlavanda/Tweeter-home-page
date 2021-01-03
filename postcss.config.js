// const IN_PRODUCTION = process.env.NODE_ENV === "production";

// module.exports = {
//   plugins: [
//     IN_PRODUCTION &&
//       require("@fullhuman/postcss-purgecss")({
//         content: [`./public/**/*.html`, `./src/**/*.vue`],
//         defaultExtractor(content) {
//           const contentWithoutStyleBlocks = content.replace(
//             /<style[^]+?<\/style>/gi,
//             ""
//           );
//           return (
//             contentWithoutStyleBlocks.match(
//               /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
//             ) || []
//           );
//         },
//         safelist: [
//           /-(leave|enter|appear)(|-(to|from|active))$/,
//           /^(?!(|.*?:)cursor-move).+-move$/,
//           /^router-link(|-exact)-active$/,
//           /data-v-.*/,
//         ],
//       }),
//   ],
// };
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    // etc.
  ],
  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV == "production" ? [purgecss] : []),
  ],
};