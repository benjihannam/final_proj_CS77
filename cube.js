var CubePositions = [
  -1, -1,  1,
   1, -1,  1,
   1,  1,  1,
  -1,  1,  1,
  -1, -1, -1,
  -1,  1, -1,
   1,  1, -1,
   1, -1, -1,
  -1,  1, -1,
  -1,  1,  1,
   1,  1,  1,
   1,  1, -1,
  -1, -1, -1,
   1, -1, -1,
   1, -1,  1,
  -1, -1,  1,
   1, -1, -1,
   1,  1, -1,
   1,  1,  1,
   1, -1,  1,
  -1, -1, -1,
  -1, -1,  1,
  -1,  1,  1,
  -1,  1, -1,
];
var CubeNormals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
];
var CubeIndices = [
   0,  1,  2,  0,  2,  3,
   4,  5,  6,  4,  6,  7,
   8,  9, 10,  8, 10, 11,
  12, 13, 14, 12, 14, 15,
  16, 17, 18, 16, 18, 19,
  20, 21, 22, 20, 22, 23,
];

var CubeTextureCoordinates = [
  // Front
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Back
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Top
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Bottom
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Right
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Left
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0
];
