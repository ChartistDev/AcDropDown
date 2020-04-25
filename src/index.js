import "./style.css";
import setAttributes from "./helper/attributeSetter";

const data = [{"id": 1, name: "Luffy", desc: "King of Pirates"}, 
{"id": 2, "name": "Thanos", "desc": "Inevitable"}, 
{"id":3, "name": "Terminator", "desc":"I'll be Back"},
{"id":4, "name": "Trump", "desc":"MAGA"},
{"id":5, "name": "Md.Ali", "desc":"I'm the Greatest"},
{"id":6, "name": "Braveheart", "desc":"Freedom"},
{"id":7, "name": "MConahey", "desc":"Awright!Awright!Awright!"},
{"id":8, "name": "Gabbar", "desc":"Hath Mujhe DeDe"},
{"id":9, "name": "Madonna", "desc":"Material Girl"},
{"id":10, "name": "Grant", "desc":"Nobody Move a Muscle"},
{"id":11, "name": "Arthur", "desc":"Where is my Horse"},
{"id":12, "name": "Aryabhatta", "desc":"Zero"},
{"id":13, "name": "Rock", "desc":"People's Chapion"},
{"id":14, "name": "Snake", "desc":"Remember Me?"},
{"id":15, "name": "Taher", "desc":"Eye to Eye"},
{"id":16, "name": "Kilvish", "desc":"Andhera Qayam Rahe"},
{"id":17, "name": "Sheldon", "desc":"Penny Penny Penny..."},
{"id":18, "name": "Nargis", "desc":"Mother India"},
{"id":19, "name": "Modi", "desc":"Mitrooo.."}];


class DropDown {
  constructor() {
    this.data = undefined;
    this.selected = document.querySelector(".selected");
    this.container = document.querySelector(".container");
    this.heading = this.container.querySelector("#myHeading");
    this.optionsContainer = document.querySelector(".options-container");
    this.searchBox = document.querySelector(".search-box input");
    this.optionsList = undefined;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  setFilter(filterName) {
    this.filterName = filterName;
    return this;
  }
  createDropDown() {
    if(!data || !this.filterName) {
      alert("Please insert data and valid filtername");
    } else {
      //Clear out optionsContainer
      var first = this.optionsContainer.firstElementChild; 
      while (first) { 
          first.remove(); 
          first = this.optionsContainer.firstElementChild; 
      } 
        
      this.createOptions();  
      this.optionsList = document.querySelectorAll(".option");

                this.selected.addEventListener("click", () => {
          this.optionsContainer.classList.toggle("active");

          this.searchBox.value = "";
          this.filterList("");

          this.optionsList.forEach(o => {
              o.style.backgroundColor= "";
            if(this.selected.innerHTML === o.querySelector("label").innerHTML) {
                o.style.backgroundColor="#57A0D3";
                o.scrollIntoView();
            }
          });

          if (this.optionsContainer.classList.contains("active")) {
            this.searchBox.focus();
          }
        });

          this.optionsList.forEach(o => {
          o.addEventListener("click", () => {
            let selectedData = this.data.find((value)=>{
                return(value[this.filterName] === o.querySelector("label").innerHTML);
            })
            if(selectedData!==undefined) {
                this.heading.innerHTML = selectedData.desc
            }
            this.selected.innerHTML = o.querySelector("label").innerHTML;
            this.optionsContainer.classList.remove("active");
          });
        });

        this.searchBox.addEventListener("keyup", function(e) {
          filterList(e.target.value);
        });

    }
  }
  createOptions() {
          for(let i = 0;i<this.data.length;i++) {
          let option = document.createElement("div");
              setAttributes(option, {"class": "option"});
            let input = document.createElement("input");
              setAttributes(input, {type:"radio",
                                          class:"radio",
                                          id: this.data[i][this.filterName],
                                          name:"category"});
            let label = document.createElement("label")
              setAttributes(label, {"for": this.data[i][this.filterName]});
              option.appendChild(input);
              option.appendChild(label);
              console.log(this.optionsContainer);
              this.optionsContainer.appendChild(option);
              label.innerHTML = this.data[i][this.filterName];
      }
  }
  filterList(searchTerm){
    searchTerm = searchTerm.toLowerCase();
    this.optionsList.forEach(option => {
      let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
      if (label.indexOf(searchTerm) != -1) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  };
}

const obj = new DropDown();
      obj.setData(data).setFilter("name").createDropDown();