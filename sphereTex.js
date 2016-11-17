var TSpherePositions = [];
var TSphereNormals = [];
var TSphereIndices = [];
var TextureCoordinateData = [];

(function() {

    var NumPhiBands = 30;
    var NumThetaBands = 30;

    for (var i = 0; i <= NumThetaBands; i++) {
        for (var j = 0; j <= NumPhiBands; j++) {
          
            var theta = (i/NumThetaBands)*Math.PI;
            var phi = 2*Math.PI*j/NumPhiBands;

            var x = Math.cos(phi)*Math.sin(theta);
            var y = Math.cos(theta);
            var z = Math.sin(phi)*Math.sin(theta);

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

})();
