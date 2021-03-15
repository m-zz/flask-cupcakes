// MAIN FUNCTIONS //

async function getCupcakes(){
  let response = await axios.get("/api/cupcakes");
  let {cupcakes} = response.data;
  
  $("#cupcakes").empty();

  for (let cupcake of cupcakes){
    $("#cupcakes").append($(`<li id=${cupcake.id}>
    <img style="height: 100px" src=${cupcake.image}>
    Flavor: ${cupcake.flavor}
    Rating: ${cupcake.rating}
    Size: ${cupcake.size}
    <button id=edit>Edit</button>
    </li>`));
  }
}

async function addCupcake(){
  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  await axios.post("/api/cupcakes", {
    flavor,
    rating,
    size,
    image
  });

  await getCupcakes();
}

async function updateCupcake(id){
  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  await axios.patch(`/api/cupcakes/${id}`, {
    flavor,
    rating,
    size,
    image
  });

  await getCupcakes();
}

async function search() {

  let resp = await axios.get(`/api/cupcakes/search/${$("#search").val()}`)

  let {cupcakes} = resp.data;
  $("#cupcakes").empty();
  $("#search").empty();
  
  for (let cupcake of cupcakes){
    $("#cupcakes").append($(`<li id=${cupcake.id}>
    <img style="height: 100px" src=${cupcake.image}>
    Flavor: ${cupcake.flavor}
    Rating: ${cupcake.rating}
    Size: ${cupcake.size}
    <button id=edit>Edit</button>
    </li>`));
  }



}

// PAGE LOAD AND EVENT HANDLERS //

$(getCupcakes);

$("form").on("click", "#add", async function (e) {
  e.preventDefault();
  addCupcake();
});

$("#cupcakes").on("click", "#edit", function (e) {
  $("#cupcakes").empty();
  $("button").attr("id", "edit")
  $("button").attr("class", $(e.target).parent().attr("id"))
});

$("form").on("click", "#edit", async function (e) {
  e.preventDefault();
  updateCupcake($("button").attr("class"));
});

$("#search-form").on("submit", async function(e) {
  e.preventDefault();
  search();
});