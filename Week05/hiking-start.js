//create an array of hikes
const hikeList = [{
        name: "Bechler Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short hike along the Bechler river to Bechler Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
        name: "Teton Canyon",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions: "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
        name: "Denanda Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "7 miles",
        difficulty: "Moderate",
        description: "Beautiful hike through Bechler meadows river to Denanda Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];

//this constant will get the partial path to get image
const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page
window.addEventListener("load", () => {
    showHikeList();
});

//this function will handle the view part inserting the array at the page
function showHikeList() {
    //get the Id were images will be inserted
    const hikeListElement = document.getElementById("hikes");
    //start by writting noting at the element.
    hikeListElement.innerHTML = "";
    //call the function that will write element inserting the array and the element in it.
    renderHikeList(hikeList, hikeListElement);
}
//this function is called inside showhikes and will handle the insertion of childs in Ul element
function renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
        //it will append childs to a parent element. In that case ul element is the parent.
        //One hike has many attributes. it will be handled by renderOneHike
        parent.appendChild(renderOneHike(hike));
    });
}
//This function will get each element from the array and organize its attributes in html code.
function renderOneHike(hike) {
    //this will make one li element from the atributes in hike
    const item = document.createElement("li");

    item.innerHTML = `<h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h4>Difficulty</h4>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>`;
    //return item to insert in the parent using renderHikeList.
    return item;
}