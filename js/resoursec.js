let folder = 'images/';

let res = {
  BG_IMAGE : folder + "BG-HD.png",
  FLOOR_IMAGE : folder + "Floor-HD.png",
  ROBIN_IMAGE : folder + "Robin-HD.png"
};

let g_resources = [];
for (let i in res) {
  g_resources.push(res[i]);
}