var Task6 = function(gl) {
    this.cameraAngle = 0;


    var earthTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, earthTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image2 = new Image();
    image2.src = "images/earth.png";
    image2.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, earthTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var valueTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, valueTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image3 = new Image();
    image3.src = "images/value1.png";
    image3.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, valueTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image3);
        gl.generateMipmap(gl.TEXTURE_2D);
      });


    this.earthTexture = earthTexture;
    this.valueTexture = valueTexture;


    //this.moonMesh = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    //this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, SunVertexSource, SunFragmentSource);

    this.mesh1 = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);
    this.mesh2 = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);
    this.mesh3 = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueInterpFragmentSource);
    this.mesh4 = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueInitColorsFragmentSource);
    this.mesh5 = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueSpecularFragmentSource);
    this.mesh6 = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueFragmentSource);
    this.mesh7 = new MoonTriangleMesh(gl, valueTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueFragmentSource);

    gl.enable(gl.DEPTH_TEST);
}

Task6.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projection = Matrix.perspective(60, w/h, 0.1, 100);
    var view =
        Matrix.translate(0, 0, 0).multiply(
        Matrix.rotate(this.cameraAngle, 0, 1, 0));
    var rotation = Matrix.rotate(Date.now()/100, 0.2327, 1, 0);

    var r = 4.0;
    var pi = 3.141;

    var sphere3 = Matrix.scale(0.9, 0.9, 0.9).multiply(Matrix.translate(r * Math.cos(0), 0, r* Math.sin(0)).multiply(rotation));
    var sphere4 = Matrix.scale(0.9, 0.9, 0.9).multiply(Matrix.translate(r * Math.cos(pi/3.0), 0, r* Math.sin(pi/3,0)).multiply(rotation));
    var sphere5 = Matrix.scale(0.9, 0.9, 0.9).multiply(Matrix.translate(r * Math.cos(2.0 *pi/3.0), 0, r* Math.sin(2.0*pi/3.0)).multiply(rotation));
    var sphere6 = Matrix.scale(0.9, 0.9, 0.9).multiply(Matrix.translate(r * Math.cos(3.0*pi/3.0), 0, r* Math.sin(3.0*pi/3.0)).multiply(rotation));
    var sphere1 = Matrix.scale(0.9, 0.9, 0.9).multiply(Matrix.translate(r * Math.cos(4.0*pi/3.0), 0, r* Math.sin(4.0*pi/3.0)).multiply(rotation));
    var sphere2 = Matrix.scale(0.9, 0.9, 0.9).multiply(Matrix.translate(r * Math.cos(5.0*pi/3.0), 0, r* Math.sin(5.0*pi/3.0)).multiply(rotation));


    this.mesh1.render(gl, sphere1, view, projection, this.earthTexture);
    this.mesh2.render(gl, sphere2, view, projection, this.valueTexture);
    this.mesh3.render(gl, sphere3, view, projection, this.valueTexture);
    this.mesh4.render(gl, sphere4, view, projection, this.valueTexture);
    this.mesh5.render(gl, sphere5, view, projection, this.valueTexture);
    this.mesh6.render(gl, sphere6, view, projection, this.valueTexture);


}

Task6.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -360), 360);
}
