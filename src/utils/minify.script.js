const fs = require("fs");
const path = require("path");
const { minify, mangler } = require("terser");
const CSO = require("csso");
const htmlMinifier = require("html-minifier").minify;

const viewsDirectoryPath = path.join(__dirname, "..", "..", "dist", "views");

function minifyDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Unable to scan directory:", err);
      return;
    }
    files.forEach(async (file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        minifyDirectory(filePath);
      } else {
        if (file.endsWith(".js")) {
          // JavaScript 파일 압축
          try {
            const fileContents = fs.readFileSync(filePath, "utf8");
            const minified = await minify(fileContents, {
              compress: {
                toplevel: true,
              },
              mangle: {
                toplevel: true,
              },
            });
            if (minified.code) {
              fs.writeFileSync(filePath, minified.code);
            }
          } catch (error) {
            console.error("Error minifying JS file:", filePath, error);
          }
        } else if (file.endsWith(".css")) {
          try {
            const fileContents = fs.readFileSync(filePath, "utf8");
            const minified = CSO.minify(fileContents, {
              comments: false,
            }).css;
            fs.writeFileSync(filePath, minified);
          } catch (error) {
            console.error("Error minifying CSS file:", filePath, error);
          }
        } else if (file.endsWith(".html")) {
          try {
            const fileContents = fs.readFileSync(filePath, "utf8");
            const minified = htmlMinifier(fileContents, {
              removeAttributeQuotes: true,
              collapseWhitespace: true,
              removeComments: true,
              processScripts: ["text/html"],
              minifyJS: true,
              minifyCSS: true,
            });
            fs.writeFileSync(filePath, minified);
          } catch (error) {
            console.error("Error minifying HTML file:", filePath, error);
          }
        }
      }
    });
  });
}

minifyDirectory(viewsDirectoryPath);
