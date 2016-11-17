var TSpherePositions = [];
var TSphereNormals = [];
var TSphereIndices = [];
var TextureCoordinateData = [];

(function() {

  // var latitudeBands = 30;
  //        var longitudeBands = 30;
  //        var radius = 1;
  //        var vertexPositionData = [];
  //        var normalData = [];
  //        var textureCoordData = [];
  //        for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
  //            var theta = latNumber * Math.PI / latitudeBands;
  //            var sinTheta = Math.sin(theta);
  //            var cosTheta = Math.cos(theta);
  //            for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
  //                var phi = longNumber * 2 * Math.PI / longitudeBands;
  //                var sinPhi = Math.sin(phi);
  //                var cosPhi = Math.cos(phi);
  //                var x = cosPhi * sinTheta;
  //                var y = cosTheta;
  //                var z = sinPhi * sinTheta;
  //                var u = 1 - (longNumber / longitudeBands);
  //                var v = 1 - (latNumber / latitudeBands);
  //                TSphereNormals.push(x);
  //                TSphereNormals.push(y);
  //                TSphereNormals.push(z);
  //                TextureCoordinateData.push(u);
  //                TextureCoordinateData.push(v);
  //                TSpherePositions.push(radius * x);
  //                TSpherePositions.push(radius * y);
  //                TSpherePositions.push(radius * z);
  //            }
  //        }
  //        var indexData = [];
  //        for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
  //            for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
  //                var first = (latNumber * (longitudeBands + 1)) + longNumber;
  //                var second = first + longitudeBands + 1;
  //                TSphereIndices.push(first);
  //                TSphereIndices.push(second);
  //                TSphereIndices.push(first + 1);
  //                TSphereIndices.push(second);
  //                TSphereIndices.push(second + 1);
  //                TSphereIndices.push(first + 1);
  //            }
  //        }







    var NumPhiBands = 30;
    var NumThetaBands = 30;

    for (var i = 0; i <= NumThetaBands; ++i) {
        for (var j = 0; j <= NumPhiBands; ++j) {
            var theta = (i/NumThetaBands - 0.5)*Math.PI;
            var phi = 2*Math.PI*j/NumPhiBands;

            var x = Math.cos(phi)*Math.cos(theta);
            var y = Math.sin(theta);
            var z = Math.sin(phi)*Math.cos(theta);

            var v = 1 - (i / NumThetaBands);
            var u = 1 - (j / NumPhiBands);

            TSpherePositions.push(x);
            TSpherePositions.push(y);
            TSpherePositions.push(z);
            TSphereNormals.push(x);
            TSphereNormals.push(y);
            TSphereNormals.push(z);

            TextureCoordinateData.push(u);
            TextureCoordinateData.push(v);

            if (i < NumThetaBands) {
                var i0 = i, i1 = i + 1;
                var j0 = j, j1 = (j + 1) % NumPhiBands;
                TSphereIndices.push(i0*NumPhiBands + j0);
                TSphereIndices.push(i0*NumPhiBands + j1);
                TSphereIndices.push(i1*NumPhiBands + j1);
                TSphereIndices.push(i0*NumPhiBands + j0);
                TSphereIndices.push(i1*NumPhiBands + j1);
                TSphereIndices.push(i1*NumPhiBands + j0);
            }
        }
    }
})();
