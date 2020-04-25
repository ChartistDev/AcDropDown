import "./style.css";
import setAttributes from "./helper/attributeSetter";

const data = [{id: 1, name: "Luffy", desc: "King of Pirates"}, 
{id: 2, "name": "Thanos", "desc": "Inevitable"}, 
{id:3, "name": "Terminator", "desc":"I'll be Back"},
{id:4, "name": "Trump", "desc":"MAGA"},
{id:5, "name": "Md.Ali", "desc":"I'm the Greatest"},
{id:6, "name": "Braveheart", "desc":"Freedom"},
{id:7, "name": "MConahey", "desc":"Awright!Awright!Awright!"},
{id:8, "name": "Gabbar", "desc":"Hath Mujhe DeDe"},
{id:9, "name": "Madonna", "desc":"Material Girl"},
{id:10, "name": "Grant", "desc":"Nobody Move a Muscle"},
{id:11, "name": "Arthur", "desc":"Where is my Horse"},
{id:12, "name": "Aryabhatta", "desc":"Zero"},
{id:13, "name": "Rock", "desc":"People's Chapion"},
{id:14, "name": "Snake", "desc":"Remember Me?"},
{id:15, "name": "Taher", "desc":"Eye to Eye"},
{id:16, "name": "Kilvish", "desc":"Andhera Qayam Rahe"},
{id:17, "name": "Sheldon", "desc":"Penny Penny Penny..."},
{id:18, "name": "Nargis", "desc":"Mother India"},
{id:19, "name": "Modi", "desc":"Mitrooo.."}];
const filterKey = "name"

const selected = document.querySelector(".selected");
const container = document.querySelector(".container");
const heading = container.querySelector("#myHeading");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

///Create the different Options elements;

for(let i = 0;i<data.length;i++) {
    let option = document.createElement("div");
        setAttributes(option, {"class": "option"});
let input = document.createElement("input");
        setAttributes(input, {type:"radio",
                                    class:"radio",
                                    id: data[i][filterKey],
                                    name:"category"});
let label = document.createElement("label")
        setAttributes(label, {"for": data[i][filterKey]});
        option.appendChild(input);
        option.appendChild(label);
        optionsContainer.appendChild(option);
        label.innerHTML = data[i][filterKey];
}


const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");

  searchBox.value = "";
  filterList("");

  optionsList.forEach(o => {
      o.style.backgroundColor= "";
    if(selected.innerHTML === o.querySelector("label").innerHTML) {
        console.log(o.style.backgroundColor="#57A0D3");
        o.scrollIntoView();
    }
  });

  if (optionsContainer.classList.contains("active")) {
    searchBox.focus();
  }
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    let selectedData = data.find((value)=>{
        return(value[filterKey] === o.querySelector("label").innerHTML);
    })
    if(selectedData!==undefined) {
        heading.innerHTML = selectedData.desc
    }
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

searchBox.addEventListener("keyup", function(e) {
  filterList(e.target.value);
});

const filterList = searchTerm => {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};