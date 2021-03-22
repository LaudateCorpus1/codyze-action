const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');
const unzip = require('unzipper');
const cp = require('child_process');
const fs = require('fs');

try {

    const version = core.getInput('version');
    console.group(`Using Codyze ${version}`)

    const directory = core.getInput('directory');
    console.log(`Hello ${directory}!`);

    let markDirectory = core.getInput('markDirectory');

    if(markDirectory == "") {
        markDirectory = `codyze-${version}/mark`
    }
    
    console.log(`Using MARK directory ${markDirectory}`)

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    downloadCodyze(`https://github.com/Fraunhofer-AISEC/codyze/releases/download/v${version}/codyze-${version}.zip`, "codyze.zip")
    execCodyze(version, markDirectory, directory)
} catch (error) {
    core.setFailed(error.message);
}

function downloadCodyze(url) {
    console.group(`Using URL ${url}`)
    
    request({followRedirect: true, url: url}).pipe(unzip.Extract({path:'./'}))
}

function execCodyze(version, markDirectory, directory) {
    fs.chmodSync(`codyze-${version}/bin/codyze`, 0755);

    const command = `codyze-${version}/bin/codyze -c -o - -m ${markDirectory} -s ${directory} --no-good-findings`

    console.log(`Using ${command}`)

    console.log(cp.execSync(command).toString());
}
