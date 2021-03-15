async function getCupcakes(){
  let response = await axios.get("/api/cupcakes");
  let {cupcakes} = response.data;
  
  $("#cupcakes").empty();

  for (let cupcake of cupcakes){
    $("#cupcakes").append($(`<li>
    <img style="height: 100px" src=${cupcake.image}>
    Flavor: ${cupcake.flavor}
    Rating: ${cupcake.rating}
    Size: ${cupcake.size}
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

$(getCupcakes);

$("form").on("submit", async function (e) {
  e.preventDefault();
  addCupcake();
});