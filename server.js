const express = require("express");

const app = express();
const PORT = 3000;

const websites = [
    {
        id: 1,
        name: "Website 1",
        url: "https://www.douyin.com/"
    },
    {
        id: 2,
        name: "Website 2",
        url: "https://hhhh.com/"
    },
    {
        id: 3,
        name: "Website 3",
        url: "https://www.biocryptodisk.com/"
    }
];

app.use(express.static("public"));

async function checkWebsite(website) {

    const startTime = Date.now();

    try {

        const response = await fetch(website.url);

        const responseTime = Date.now() - startTime;

        return {
            ...website,
            status: response.ok ? "ONLINE" : "ERROR",
            responseTime: responseTime,
            lastCheck: new Date().toISOString()
        };

    } catch (error) {

        return {
            ...website,
            status: "OFFLINE",
            responseTime: null,
            lastCheck: new Date().toISOString()
        };

    }
}

app.get("/api/status", (req, res) => {
    res.json({
        websites: latestResults
    });
});


let latestResults = [];

async function checkAllWebsites() {
    latestResults = await Promise.all(
        websites.map(checkWebsite)
    );

    console.log("Websites checked:", new Date().toLocaleTimeString());
}

checkAllWebsites();

setInterval(checkAllWebsites, 10 * 1000);


app.listen(PORT, () => {
    console.log(`Website Monitor running at http://localhost:${PORT}`);
});