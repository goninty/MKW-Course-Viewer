class CourseLoader {
  constructor(dir, objFile, mtlFile) {
    this.dir = dir;
    this.objFile = objFile;
    this.mtlFile = mtlFile;
  }

  // Load in a course model, and fully texture it.
  load() {
    // Load .mtl texture mapping file.
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(this.dir);

    // Having to save the state of the class... can't go too deep.
    var self = this;

    // Load the course model object.
    var objLoader = new THREE.OBJLoader();

    mtlLoader.load(this.mtlFile,
      function(m) {
        m.preload(); // Preload the materials.
        
        // Load the course model object.
        var objLoader = new THREE.OBJLoader();
        
        // Prime materials to be applied to the object.
        objLoader.setMaterials(m);
        
        // Actually load obj file.
        objLoader.setPath(self.dir);
        objLoader.load(self.objFile,
          function(o) {
            // Iterate over individual meshes for some tweaks.
            o.children.forEach(
              function(c) {
                // Ensure transparent PNGs render correctly.
                c.material.transparent = true;
                // Enable flat shading to prevent weird flickering issues.
                c.material.flatShading = true;
              });
            
            // Scale course to a more reasonable size.
            o.scale.set(0.001, 0.001, 0.001);
            
            console.log(o);
            // Add course to scene.
            scene.add(o);
          });
        
      });
  }
}