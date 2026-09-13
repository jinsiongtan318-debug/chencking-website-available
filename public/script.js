async function loadStatus() {

    const response = await fetch("/api/status");

    const data = await response.json();

    const onlineCount = data.websites.filter(
        site => site.status === "ONLINE"
    ).length;

    document.getElementById("overall").textContent =
        `${onlineCount} / ${data.websites.length} Online`;

    document.getElementById("checkedAt").textContent =
        formatDate(data.websites[0].lastCheck);

    document.getElementById("cards").innerHTML =
        data.websites.map(site => {

            return `
                <article class="card">

                    <div class="card-top">

                        <h2>${site.name}</h2>

                        <span class="status ${
                            site.status === "ONLINE"
                            ? "online"
                            : "offline"
                        }">

                            ${
                                site.status === "ONLINE"
                                ? "● ONLINE"
                                : "● OFFLINE"
                            }

                        </span>

                    </div>

                    <p class="url">
                        ${site.url}
                    </p>

                    <div class="info">

                        <div>

                            <span>
                                Response Time
                            </span>

                            <strong>
                                ${
                                    site.responseTime !== null
                                    ? site.responseTime + " ms"
                                    : "—"
                                }
                            </strong>

                        </div>

                        <div>

                            <span>
                                Last Check
                            </span>

                            <strong>
                                ${formatDate(site.lastCheck)}
                            </strong>

                        </div>

                    </div>

                </article>
            `;

        }).join("");
}


function formatDate(value) {

    return new Date(value).toLocaleString();

}


loadStatus();

setInterval(loadStatus, 10 * 1000);