

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build) {
        // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });


      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args) => {
        return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
    });

    // Handle main file of a module  
      build.onResolve({ filter: /.*/ }, async (args) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };

        // else if (args.path === "tiny-test-pkg") {
        //   return {
        //     path: "https://www.unpkg.com/tiny-test-pkg@1.0.0/index.js",
        //     namespace: "a",
        //   };
        // }
        // return { path: args.path, namespace: "a" };
      });
    },
  };
};
