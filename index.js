let drpc = require('discord-rpc');
let RPC = new drpc.Client({ transport: 'ipc' });

function createClient() {
    RPC = new drpc.Client({ transport: 'ipc'});

    RPC.login({ clientId: "829406159844278292" });
};

(async() => {
    const http = require('http');
    const got = require('got');
    const fs = require('fs');
    
    const rl = require('readline');

    let userid;
    try {
        userid = fs.readFileSync('./userid.txt').toString();
    } catch {};

    // Perform start-up
    if (!userid || userid == '') {
        let instance = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        await new Promise((resolve, reject) => {
            // Ask for user ID
            instance.question('Please enter your user ID: ', (_userid) => {
                userid = _userid.toString();
                
                if (fs.existsSync('./userid.txt')) {
                    fs.writeFileSync('./userid.txt', _userid)
                }

                resolve();
            });
        });
    }

    // Create a RPC in discord that will show "Hi"
    createClient();

    RPC.on('ready', () => {
        let game = "Aperiophobia";
        RPC.setActivity({
            details: `Playing ${game} on Roblox`,
            state: "Hi there!",
            startTimestamp: new Date(),
            largeImageKey: "ebbfacda15693a6865494d6b74c964a6",
            largeImageText: "Roblox",
            partyId: "ae488379-351d-4a4f-ad32-2b9b01c91657",
            partySize: 1,
            partyMax: 5,
            joinSecret: "MTI4NzM0OjFpMmhuZToxMjMxMjM= ",
            instance: false,
        });
    });

    console.log("Starting")
    RPC.login({ clientId: "812381092963287050" }).then(() => {
        console.log("Running")
    }).catch((err) => {
        console.log(err);
    });
})();