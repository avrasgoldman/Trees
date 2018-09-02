var table;

var northernmost_lon_of_sf = 37.8346129354;
var southernmost_lon_of_sf = 37.6869807475;
var westernnmost_lat_of_sf = -122.5214423675;
var easternmost_lat_of_sf = -122.3530420064

var bloom = false;
var fruit = false;
var drought_tolerant = false;

var socket = io.connect(window.location.origin);

var msg;



socket.on('mysocket', function(data) {
    msg = data;
    console.log(msg);


});

function preload() {
  table_trees = loadTable("js/trees.csv", "csv", "header")
  table_directory = loadTable("js/directory.csv", "csv", "header")
  table_landmark = loadTable("js/Landmark.csv", "csv", "header")
  console.log(table_directory);

}

//setup
function setup() {
  var width_of_sf = abs(westernnmost_lat_of_sf - easternmost_lat_of_sf);
  var height_of_sf = northernmost_lon_of_sf - southernmost_lon_of_sf;
  var aspect_ratio = width_of_sf / height_of_sf;

  var canvas_height = 800;
  var canvas_width = canvas_height * aspect_ratio;


  createCanvas(canvas_width, canvas_height);
  noStroke();
  //createCanvas.position(500, 100);

  background(0, 0, 0);
  // $('#fruitNames').show();


}

function keyTyped() {
  // use keypressed to simulate buttons

  // each key will toggle a variable relating to the trees ()
  // if (key === 'a') {
  //   bloom = true;
  // } else if (key === 'b') {
  //   bloom = false;
  // } else if (key === 'c') {
  //   fruit = true;
  // } else if (key === 'd') {
  //   fruit = false;
  // } else if (key === 'e') {
  //   drought_tolerant = true;
  // } else if (key === 'f') {
  //   drought_tolerant = false;
  // }



  // uncomment to prevent any default behaviour
  // return false;
}

function drawTreeDots(rows, landmark) {

  for (var r = 0; r < rows.length; r++) {
    // choosing the location of the dot
    var lon = rows[r].getNum("lon")
    var lat = rows[r].getNum("lat")

    // choose the colour of the dot
    var species = rows[r].getString("Species");
    //console.log(species);
    var directory_row = table_directory.findRow(species,"Scientific Name");

    if(directory_row!==null){
      if(directory_row.getString("Fruit")==="showy") {
        if (fruit === true) {
          $('#fruitNames').show();
          $('#fruit').show();
          $('#bloomNames').hide();
          $('#drought_tolerantNames').hide();
          if (landmark === true) {
            fill(75,250,20); // neon green
          } else {
            fill(255,0,102); // purple
          }
        } else {
          fill(0, 0, 0);
          // $('#fruitNames').hide();
        }
      }
      else if(directory_row.getString("Bloom")==="showy") {
        if (bloom === true) {
          if (landmark === true) {
            fill(75,250,20); // neon green
            $('#bloomNames').show();
            $('#fruitNames').hide();
            $('#drought_tolerantNames').hide();
          } else {
            fill(153, 153, 255); // pink
          }
        } else {
          fill (0, 0, 0);
          // $('#bloomNames').hide();
        }
      }
      else if(directory_row.getString("Drought-Tolerant?")==="yes") {
        if (drought_tolerant === true) {
          if (landmark === true) {
            fill(75,250,20); // neon green
            $('#bloomNames').hide();
            $('#fruitNames').hide();
            $('#drought_tolerantNames').show();
          } else {
            fill(255,191,0); //tan
          }
        } else {
          fill(0, 0, 0);
        }
      }
      else {
        fill(75, 250, 20); //neon green
        // $('#drought_tolerantNames').hide();
      }
    }

    // drawing the dot
    var x = map(lon, westernnmost_lat_of_sf, easternmost_lat_of_sf, 0, width)
    var y = map(lat, southernmost_lon_of_sf, northernmost_lon_of_sf, height, 0)

    // if landmark is true, make the dot big, otherwise, keep it Small
    if (landmark === true) {
        ellipse(x, y, 7, 7);
    } else {
      ellipse(x, y, 1, 1);
    }
  }
}

//make draw function
function draw() {
  var tree_rows = table_trees.getRows();
  var landmark_rows = table_landmark.getRows();

  drawTreeDots(tree_rows, false); // mapping generic trees
  drawTreeDots(landmark_rows, true); // mapping the landmark trees
  if (msg === 'd') {
    bloom = true;
  } else if (msg === 'b') {
    bloom = false;
  } else if (msg === 'a') {
    fruit = true;
  } else if (msg === 'f') {
    fruit = false;
  } else if (msg === 'c') {
    drought_tolerant = true;
  } else if (msg === 'e') {
    drought_tolerant = false;
  }

}

//look up button to select keys
//make variable -false, True
//turn if else statements into if variable
