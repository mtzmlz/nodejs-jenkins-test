
var policyHelper = require('./policyHelper');


// if(process.argv.length<=2) {
//     throw new Error('Repo name parameter missing.');
// }
// const repoName = process.argv[2];
// const repoPath = process.argv[3];

const repoName = "NEJR-docs";
const repoPath = "/Users/luis-jaime/codesamples/md-html/showdownjs/db/docs";

policyHelper.CheckDocsPolicy(repoName, repoPath)
.then( (analysis) => {
    if(!analysis.broken_docs || analysis.broken_docs.length>0){
        throw new Error("Missing required documentation in repo");
    }
});
// throw new Error('something bad happened');

// console.log('end...')

// console.log('Jenkins executing nodejs')