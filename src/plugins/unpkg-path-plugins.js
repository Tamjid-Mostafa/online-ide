import axios from "axios";
import localforage from 'localforage'


const fileCache = localforage.createInstance({
    name: 'filecache'
})




export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        } 


        if (args.path.includes('./') || args.path.includes('../')) {
            return {
                namespace: 'a',
                path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
            }
        }

        return {
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`
        }


        // else if (args.path === "tiny-test-pkg") {
        //   return {
        //     path: "https://www.unpkg.com/tiny-test-pkg@1.0.0/index.js",
        //     namespace: "a",
        //   };
        // }
        // return { path: args.path, namespace: "a" };
      });

      build.onLoad({ filter: /.*/ }, async (args) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
                import react from 'react';
                import reactDOM from 'react-dom';
                console.log(react, reactDOM);`,
          };
        }

        // check to see if we have already fetched this file and id it is in the cache

        const cachedResult = await fileCache.getItem(args.path);

    // if it is, return it immediately
    if (cachedResult) {
        return cachedResult;
    }
        
        const { data, request } = await axios.get(args.path);
       
        const result = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };
         // store response in cache
         await fileCache.setItem(args.path, result);
         return result;
      });
    },
  };
};
