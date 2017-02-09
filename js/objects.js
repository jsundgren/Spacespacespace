class planet {

    constructor(ma, v, p, mod) {
        this.mass = ma;
        this.vel= v;
        this.pos = p;
        this.force = [0, 0, 0];
        this.model = mod;



        this.add2scene = function (scene) {
            scene.add(mod);
        }
    }



}


