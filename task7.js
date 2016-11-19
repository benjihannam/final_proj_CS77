var Task7 = function(gl) {
    this.cameraAngle = 0;

    var moonTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, moonTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image = new Image();
    image.src = "value1.png";
    image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, moonTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var sunTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, sunTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image2 = new Image();
    image2.src = "sun.png";
    image2.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, sunTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var valueTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, valueTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image3 = new Image();
    image3.src = "value1.png";
    image3.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, valueTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image3);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var marsTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, marsTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image4 = new Image();
    image4.src = "mars.png";
    image4.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, marsTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image4);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

    var jupiterTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, jupiterTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    var image5 = new Image();
    image5.src = "jupiter.png";
    image5.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, jupiterTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image5);
        gl.generateMipmap(gl.TEXTURE_2D);
      });


    this.moonTexture = moonTexture;
    this.sunTexture = sunTexture;
    this.valueTexture = valueTexture;
    this.marsTexture = marsTexture;
    this.jupiterTexture = jupiterTexture;


    //this.moonMesh = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    //this.cubeMesh = new ShadedTriangleMesh(gl, CubePositions, CubeNormals, CubeIndices, SunVertexSource, SunFragmentSource);

    this.mesh1 = new ShadedTriangleMesh(gl, DTSpherePositions, DTSphereNormals, DTSphereIndices, SunVertexSource, SunFragmentSource);
    this.mesh2 = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);
    this.mesh3 = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueInterpFragmentSource);
    this.mesh4 = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, ValueInitColorsFragmentSource);
    this.mesh5 = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);
    this.mesh6 = new MoonTriangleMesh(gl, moonTexture, TextureCoordinateData, TSpherePositions, TSphereNormals, TSphereIndices, MoonVertexSource, MoonFragmentSource);

    gl.enable(gl.DEPTH_TEST);
}

Task7.prototype.render = function(gl, w, h) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projection = Matrix.perspective(60, w/h, 0.1, 100);
    var view =
        Matrix.translate(-15, 0, -30).multiply(
        Matrix.rotate(this.cameraAngle, 0, 1, 0));
    var rotation = Matrix.rotate(Date.now()/100, 0.2327, 1, 0);
    var sun_rotation = Matrix.rotate(Date.now()/100, -15, 0, 5);

    var r = 4.0;
    var pi = 3.141;

    var earth_angle = Date.now() / 70;
    var mercury_angle = earth_angle * 4;
    var venus_angle = earth_angle * (3/2) ;
    var mars_angle = earth_angle / 1.88;
    var jupiter_angle = earth_angle / 11.86;
    var sphere1 = Matrix.translate(-15, 0, 0).multiply(rotation).multiply(Matrix.scale(8.0, 8.0, 8.0));
    var sphere2 = Matrix.translate(-3.3, 0, 0).multiply(rotateAroundAxisAtPoint([0, 1, 0], mercury_angle, [-11.7, 0, 0])).multiply(rotation).multiply(Matrix.scale(0.2, 0.2, 0.2));
    var sphere3 = Matrix.translate(-2.5, 0, 0).multiply(rotateAroundAxisAtPoint([0, 1, 0], venus_angle, [-12.5, 0, 0])).multiply(rotation).multiply(Matrix.scale(0.3, 0.3, 0.3));
    var sphere4 = Matrix.translate(-1.5, 0, 0).multiply(rotateAroundAxisAtPoint([0, 1, 0], earth_angle, [-13.5, 0, 0])).multiply(rotation).multiply(Matrix.scale(0.4, 0.4, 0.4));
    var sphere5 = Matrix.translate(-0.4, 0, 0).multiply(rotateAroundAxisAtPoint([0, 1, 0], mars_angle, [-14.6, 0, 0])).multiply(rotation).multiply(Matrix.scale(0.35, 0.35, 0.35));
    var sphere6 = (Matrix.translate(7, 0, 0).multiply(rotateAroundAxisAtPoint([0, 1, 0], jupiter_angle, [-22, 0, 0])).multiply(rotation).multiply(Matrix.scale(4.4, 4.4, 4.4)));


    //this.sphereMesh.render(gl, sphereModel2, view, projection);
    //this.earthMesh.render(gl, sphereModel, view, projection, this.earthTexture);
    this.mesh1.render(gl, sphere1, view, projection);
    this.mesh2.render(gl, sphere2, view, projection, this.moonTexture);
    this.mesh3.render(gl, sphere3, view, projection, this.valueTexture);
    this.mesh4.render(gl, sphere4, view, projection, this.valueTexture);
    this.mesh5.render(gl, sphere5, view, projection, this.marsTexture);
    this.mesh6.render(gl, sphere6, view, projection, this.jupiterTexture);
    //this.cubeMesh.render(gl, cubeModel, view, projection);


    //this.valueMesh.render(gl, sphereModel2, view, projection, this.valueTexture);

}

Task7.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -360), 360);
}