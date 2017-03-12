class planet {

  constructor(m, v, p, mod, l) {

    this.mass = m;
    this.velocity= v;
    this.position = p;
    this.force = new THREE.Vector3();
    this.model = mod;
    this.line = l;
  }
}
