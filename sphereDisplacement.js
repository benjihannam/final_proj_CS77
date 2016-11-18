var DTSpherePositions = [];
var DTSphereNormals = [];
var DTSphereIndices = [];
var DTextureCoordinateData = [];

(function() {

    var NumPhiBands = 100;
    var NumThetaBands = 100;

    for (var i = 0; i <= NumThetaBands; i++) {
        for (var j = 0; j <= NumPhiBands; j++) {

            var theta = (i/NumThetaBands)*Math.PI;
            var phi = 2*Math.PI*j/NumPhiBands;

            var x = Math.cos(phi)*Math.sin(theta) + Math.random()/25.0;
            var y = Math.cos(theta)+ Math.random()/25.0;
            var z = Math.sin(phi)*Math.sin(theta)+ Math.random()/25.0;

            var v = (i / NumThetaBands);
            var u = 1 - (j / NumPhiBands);

            DTSpherePositions.push(x);
            DTSpherePositions.push(y);
            DTSpherePositions.push(z);
            DTSphereNormals.push(x);
            DTSphereNormals.push(y);
            DTSphereNormals.push(z);

            DTextureCoordinateData.push(u);
            DTextureCoordinateData.push(v);

            var i0 = i, i1 = i + 1;
            var j0 = j, j1 = (j + 1) % NumPhiBands;
            DTSphereIndices.push(i0*NumPhiBands + j0);
            DTSphereIndices.push(i0*NumPhiBands + j1);
            DTSphereIndices.push(i1*NumPhiBands + j1);
            DTSphereIndices.push(i0*NumPhiBands + j0);
            DTSphereIndices.push(i1*NumPhiBands + j1);
            DTSphereIndices.push(i1*NumPhiBands + j0);
        }
    }

})();
