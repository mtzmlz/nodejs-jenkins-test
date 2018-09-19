const path = require('path');
const fs   = require('fs');
const http = require('http');

var docsServerUrl = process.env.DOCS_SERVER_URL || 'http://showdownjs-docs-server.dev.cloudapp.banregio.com/'

function checkMatchingPolicies (repoName) {
    return new Promise(function(resolve, reject){
        http.get(`${docsServerUrl}/api/repos/${repoName}`, (resp) => {
            let data = '';
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                let repoData = JSON.parse(data);
                getPolicy(repoData.policy).then(resolve).catch(reject);
            });
        }).on("error", (err) => {
            throw new Error("Error: " + err.message);
        });
        // }
        
    });
}

function getPolicy(policyName){
    return new Promise(function(resolve, reject){
        http.get(`${docsServerUrl}/api/policy/${policyName}`, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    });
}

function getPolicyBySufix(suffix) {
    return new Promise(function(resolve, reject){
        http.get(`${docsServerUrl}/api/policy/${suffix}`, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    });
}

function checkDocExists(repoName, repoPath, docPath) {
    let _docPath = `${repoPath}/${repoName}/${docPath}`;
    return fs.existsSync(_docPath);
}

function CheckDocsPolicy(repoName, repoPath) {
    return new Promise(function(resolve, reject){
        let docPath = repoPath;
        checkMatchingPolicies(repoName)
        .then((policy)=>{
            var broken_policies = null;
            // for(let i=0; i<policies.length; ++i) {
            //     let policy = policies[i];
                let not_complaint = [];
                for(let j=0; j<policy.docs.length; ++j) {
                    let docPath = policy.docs[j];
                    if(!checkDocExists(repoName, repoPath, docPath)){
                        not_complaint.push(policy.docs[j]);
                    }
                }
                if(not_complaint.length > 0) {
                    broken_policies = {
                        policy: policy.name,
                        broken_docs: not_complaint
                    };
                }
            // }
            resolve(broken_policies);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

const repoName = "NEJR-docs";
const repoPath = "/Users/luis-jaime/codesamples/md-html/showdownjs/db/docs";

// CheckDocsPolicy(repoName, repoPath)
// .then( (analysis) => {
//     if(!analysis.broken_docs || analysis.broken_docs.length>0){
//         throw new Error("Missing required documentation in repo: \n\r" + analysis.broken_docs);
//     }
// });

console.log("Hello World!")