class planet {

  constructor(ma, v, p, mod) {

    this.mass = ma;
    this.velocity= v;
    this.pos = p;
    this.force = [0, 0, 0];
    this.model = mod;

    this.add2scene = function (scene) {
      scene.add(mod);
    }

    this.updatePos = function () {
      this.model.position = pos;

    }
  }
}
