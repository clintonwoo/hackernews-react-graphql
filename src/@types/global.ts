// declare var process: NodeJS.Process & {
//   browser?: boolean; // We set the process.browser flag in the browser
// }

declare namespace NodeJS {
  interface Process {
    browser?: boolean; // We set the process.browser flag in the browser
  }
}
