import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (input) => {
  return {
    name: "fetch-plugin",
    setup(build) {
       
    build.onLoad({ filter: /(^index\.js$)/ }, async () => {
        return {
            loader: "jsx",
            contents: input,
          };

      });
      
    build.onLoad({ filter: /.*/ }, async (args) => {

        // check to see if we have already fetched this file and id it is in the cache
        const cachedResult = await fileCache.getItem(args.path);

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data
        .replace(/\n/g, '')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
            `;

        const result = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      })


      build.onLoad({ filter: /.*/ }, async (args) => {
        const { data, request } = await axios.get(args.path);
        
        const result = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
