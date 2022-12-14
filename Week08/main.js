const url = 'https://swapi.dev/api/people/';


async function getResponse(urlOfAPI) {
    try {
        const response = await fetch(urlOfAPI);
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            const jsonFile = await response.json();
            return jsonFile;
        }
    } catch {
        console.log(error)
    }
}

function showView(url) {
    getResponse(url).then(function(data) {
        const result = data.results;
        const peopleListElement = document.getElementById("peoplelist");
        renderpeopleList(result, peopleListElement);
        const next = data.next;
        console.log(next);

        if (data.next) {
            const nextpage = document.getElementById("nextpage");
            nextpage.ontouchend = () => showView(data.next);
        }

        if (data.previous) {
            const previouspage = document.getElementById("previouspage");
            previouspage.ontouchend = () => showView(data.previous);
        }
    })

}

function renderpeopleList(peoplelist, place) {
    const placelist = place.children[1];
    placelist.innerHTML = "";
    peoplelist.forEach(function(e) {
        let item = document.createElement("tr");
        item.innerHTML = `
        <td>${e.name}</td>
        <td>${e.height}</td>
        <td>${e.mass}</td>
        <td>${e.birth_year}</td>
        <td>${e.skin_color}</td>`;
        placelist.appendChild(item);

    });

}

showView(url)