
var selectedItem = 'carrot';
var allData = [];
var dropdownMenuItem = document.querySelectorAll('.dropdown-item');
getSelectedItem();
var contentRecipe = document.querySelector('.content');

getRequest('carrot');
function getRequest(selected_item) {
    var req = new XMLHttpRequest();
    req.open('GET', "https://forkify-api.herokuapp.com/api/search?q=" + selected_item);
    req.send();

    req.addEventListener('readystatechange', function () {
        if (req.readyState == 4 && req.status == 200) {
            allData = JSON.parse(req.response);
            setRecipe(allData);
        }
    });

}
function getSelectedItem() {
    for (var count = 0; count < dropdownMenuItem.length; count++) {
        dropdownMenuItem[count].addEventListener('click', function (e) {
            selectedItem = e.target.innerHTML;


            getRequest(selectedItem);


        })
    }
}
function setRecipe(Item) {
    var str = '';
    for (var count = 0; count < Item.recipes.length; count++) {

        str += `<div class="col-md-4 text-center content-box single_${Item.recipes[count].recipe_id}">
<img src="${Item.recipes[count].image_url}" class="w-100 content-img">
<h1>${Item.recipes[count].title}</h1>
<p>${Item.recipes[count].publisher}</p> 
<p class="recipe-id">${Item.recipes[count].recipe_id}</p>  
</div>`;;
    }
    contentRecipe.innerHTML = str;
    
} 
var parent = document.querySelector('.content');
parent.addEventListener('click', function (e) {
    var signleBox = e.target.parentElement;
    var arr = [];
    arr = Array.from(signleBox.classList);
    var recipe_id = getRecipeID(arr);

    getRequestRecipeDetails(recipe_id); 
})
 
getRequest('carrot');
function getRequestRecipeDetails(recipeID) {
    if(recipeID!=0){
        var req = new XMLHttpRequest();
    req.open('GET', "https://forkify-api.herokuapp.com/api/get?rId=" + recipeID);
    req.send();

    req.addEventListener('readystatechange', function () {
        if (req.readyState == 4 && req.status == 200) {
            allData = JSON.parse(req.response);
            setRecipeDetails(allData);
        }
    });
    }
    

}
var popUpMenu = document.querySelector(".pop-up-menu");
function setRecipeDetails(allDATA){
    var stepsRecipe =allDATA.recipe.ingredients;
    var publisher = allDATA.recipe.publisher;
    var image_url = allDATA.recipe.image_url;
    var title = allDATA.recipe.title;
var str='';
for(var counter=0;counter<stepsRecipe.length;counter++){
    str+=`<p>${stepsRecipe[counter]}</p>`;
}
var content=`<div class="modal d-block" tabindex="-1">
<div class="modal-dialog   ">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">${title}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <img src="${image_url}"  class="w-100">
      <p>publisher: ${publisher}</p>
      ${str}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary closing" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary closed">Save changes</button>
    </div>
  </div>
</div>
</div>`;
popUpMenu.classList.remove('d-none'); 
popUpMenu.innerHTML = content;
     var closeBtn = document.querySelector('.btn-close'); 
     var closing = document.querySelector('.closing'); 
     var closed = document.querySelector('.closed'); 
     
         closeBtn.addEventListener('click',function(e){ 
            popUpMenu.classList.add('d-none');  
})

closing.addEventListener('click',function(e){ 
            popUpMenu.classList.add('d-none');  
})

closed.addEventListener('click',function(e){ 
            popUpMenu.classList.add('d-none');  
})
var body = document.body;
body.addEventListener('click',function(){ 
    if(popUpMenu.classList.contains('d-none')){
        popUpMenu.classList.remove('d-none')
    }
    else{
        popUpMenu.classList.add('d-none')
    }
},true) 

}

 
function getRecipeID(arr) {
    var recipe_id = 0;
    for (var count1 = 0; count1 < arr.length; count1++) {
         
        if (arr[count1].toLocaleLowerCase().includes('single')) {
            recipe_id = arr[count1].split("_")[1]
                ; 
            break;
        }
    }
    return recipe_id;
}






























