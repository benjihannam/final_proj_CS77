function rotateAroundAxisAtPoint(axis, angle, point) {
    // TODO: Build a transformation matrix that rotates around a given axis
    //       by the given angle at the given point.
    //       Hint: You will need Matrix.translate and Matrix.rotate
    //       Hint: axis and point are arrays. Use axis[0], axis[1], etc.
    //             to get their components

    var res1 = (Matrix.translate(point[0], point[1], point[2])).inverse();
    var res2 = Matrix.rotate(angle, axis[0], axis[1], axis[2]);
    var res3 = (Matrix.translate(point[0], point[1], point[2]));
    return res3.multiply(res2).multiply(res1);
}

var Task5 = function(gl) {
    this.cameraAngle = 0;


    var starTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, starTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image = new Image();
    image.src = "space2.png";
    image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, starTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var moonTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, moonTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image2 = new Image();
    image2.src = "moon.gif";
    image2.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, moonTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
        gl.generateMipmap(gl.TEXTURE_2D);
      });


    this.starTexture = starTexture;
    this.moonTexture = moonTexture;

    this.moonMesh = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    this.sphereMesh = new ShadedTriangleMesh(gl, SpherePositions, SphereNormals, SphereIndices, SunVertexSource, SunFragmentSource);
    this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, PhongVertexSource, PhongFragmentSource);

    this.starMesh = new MoonTriangleMesh(gl, starTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    this.cubeStarMesh = new MoonTriangleMesh(gl, starTexture, CubeTextureCoordinates, CubePositions, CubeNormals, CubeIndices, MoonVertexSource, MoonFragmentSource);


    gl.enable(gl.DEPTH_TEST);
}

Task5.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var angle = Date.now()/50; // controls how fast it rotates
    var projection = Matrix.perspective(35, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, -10).multiply(
        Matrix.rotate(this.cameraAngle, 1, 0, 0));

    var rotation = Matrix.rotate(Date.now()/25, 0.4327, 1, 0);

    var cubeModel = Matrix.translate(-4, 0, 0).multiply(rotation).multiply(
        rotateAroundAxisAtPoint([1, 1, 0], angle, [0, 0, 0])).multiply(
        Matrix.scale(0.2, 0.2, 0.2));

    var earthModel = Matrix.translate(-0, 0, 0).multiply(
        rotateAroundAxisAtPoint([1, 1, 0], angle, [0, 0, 0])).multiply(rotation).multiply(
        Matrix.scale(0.9, 0.9, 0.9));

    var moonModel = Matrix.translate(-2.5, 0, 0).multiply(
        rotateAroundAxisAtPoint([0, 0, 1], angle, [3, 0, 0])).multiply(rotation).multiply( // point controls radius of rotation
        Matrix.scale(0.3, 0.3, 0.3));

    var sunModel = Matrix.translate(-0, 0, 0).multiply(rotation).multiply(
        Matrix.scale(0.9, 0.9, 0.9));

    var starModel = Matrix.translate(-0, 0, 0).multiply(
        Matrix.scale(10, 10, 10));

    this.moonMesh.render(gl, moonModel, view, projection, this.moonTexture);
    //this.starMesh.render(gl, starModel, view, projection, this.starTexture);
    this.sphereMesh.render(gl, sunModel, view, projection);

    this.cubeMesh.render(gl, cubeModel, view, projection);

    this.cubeStarMesh.render(gl, starModel, view, projection, this.starTexture);
}

Task5.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
