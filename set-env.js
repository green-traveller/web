// https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c
const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   apiKey: '${process.env.MAPS_API_KEY}'
};
`;
fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
  }
});
