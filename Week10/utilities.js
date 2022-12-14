export function getData(url) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function(error) {
            console.log(error)
        })

}

export async function main(url) {
    const result = await getData(url);
    console.log(result);
}



export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

export async function getLocalization(baseUrl, maxRadius) {
    const result = await getLocation();
    const addToUrl = `&latitude=${result.coords.latitude}&longitude=${result.coords.longitude}&maxradiuskm=${maxRadius}`;
    const completeUrl = baseUrl + addToUrl;
    return completeUrl;
};

export function buildQuakeTable(quakes) {
    let html = "";
    html += "<table id='tablequakes'><thead><th>Title</th><th>Time</th>";
    quakes.forEach(e => {
        html += `<tr><td>${e.properties.title}</td><td>${new Date(e.properties.time)}</td></tr>`
    });
    html += "</table>";
    return html;

}