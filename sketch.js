var table;

// var northernmost_lon_of_sf = 37.82573478;
// var southernmost_lon_of_sf = 37.63989053;
// var westernnmost_lat_of_sf = -122.5115789;
// var easternmost_lat_of_sf = -122.3677186;

var northernmost_lon_of_sf = 37.8346129354;
var southernmost_lon_of_sf = 37.6869807475;
var westernnmost_lat_of_sf = -122.5214423675;
var easternmost_lat_of_sf = -122.3530420064;

function preload() {
  table_trees = loadTable("trees.csv", "csv", "header")
  table_directory = loadTable("directory.csv", "csv", "header")
  console.log("table_directory:");
  console.log(table_directory);
}

function setup() {
  var width_of_sf = abs(westernnmost_lat_of_sf - easternmost_lat_of_sf);
  var height_of_sf = northernmost_lon_of_sf - southernmost_lon_of_sf;
  var aspect_ratio = width_of_sf / height_of_sf;

  var canvas_height = 800;
  var canvas_width = canvas_height * aspect_ratio;

  createCanvas(canvas_width, canvas_height);
  noStroke()


  background(0, 0, 0)

  var tree_rows = table_trees.getRows()
  for (var r = 0; r < tree_rows.length; r++) {
    // choosing the location of the dot
    var lon = tree_rows[r].getNum("lon")
    var lat = tree_rows[r].getNum("lat")

    // choose the colour of the dot
    var species = tree_rows[r].getString("Species");
    //console.log(species);
    var directory_row = table_directory.findRow(species,"Scientific Name");
  
    if(directory_row!==null){
      if(directory_row.getString("Fruit")==="showy") {
        fill(254, 127, 146, 10);
      } else {
        fill(75, 250, 20, 10);
      }
    }


    // drawing the dot
    var x = map(lon, westernnmost_lat_of_sf, easternmost_lat_of_sf, 0, width)
    var y = map(lat, southernmost_lon_of_sf, northernmost_lon_of_sf, height, 0)
    ellipse(x, y, 3, 3)
  }

}
