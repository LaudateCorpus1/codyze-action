const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');
const unzip = require('unzipper');
const cp = require('child_process');
const fs = require('fs');
const { exit } = require('process');

try {
    core.startGroup("Configuration")
    const version = core.getInput('version');
    console.log(`Using Codyze ${version}`)

    const directory = core.getInput('directory');
    console.log(`Scanning ${directory}!`);

    let markDirectory = core.getInput('markDirectory');

    if (markDirectory == "") {
        markDirectory = `codyze-${version}/mark`
    }

    console.log(`Using MARK directory ${markDirectory}`)

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.endGroup()

    // Get the JSON webhook payload for the event that triggered the workflow
    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);

    core.startGroup("Downloading Codyze")
    downloadCodyze(version, "codyze.zip")
        .then(() => {
            core.endGroup()
            console.log(execCodyze(version, markDirectory, directory))
        })
} catch (error) {
    core.setFailed(error.message);
}

async function downloadCodyze(version) {
    const url = `https://github.com/Fraunhofer-AISEC/codyze/releases/download/v${version}/codyze-${version}.zip`

    console.log(`Using URL ${url}`)

    /*const stream = request({ followRedirect: true, url: url }).pipe(unzip.Extract({ path: './' }))

    return new Promise(fulfill => stream.on("finish", fulfill));*/
    const command = `wget --quiet ${url} && unzip -qo codyze-${version}.zip`
    cp.execSync(command)
}

function execCodyze(version, markDirectory, directory) {
    try {
        fs.chmodSync(`codyze-${version}/bin/codyze`, 0755);

        const command = `codyze-${version}/bin/codyze -c -o - -m ${markDirectory} -s ${directory} --no-good-findings`

        console.log(`Using ${command}`)

        return cp.execSync(command).toString();
    }
    catch (error) {
        console.error(error.stderr.toString());
        console.log(error.stdout.toString());

        if (error.status != 0) {
            exit(error.status);
        }
    }
};