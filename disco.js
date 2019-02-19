export const disco = (size) => (p) => {
  var x = 90
  var z = 0
  var img
  p.preload = function () {
    img = p.loadImage("./assets/patt3.png")
  }
  
  p.setup = function () {
    p.createCanvas(size,size, p.WEBGL)
  }
  
  p.draw = function () {
    x = x+1
    p.background(200)
    p.rotateY(p.radians(x/2))
    p.texture(img)  
    p.beginShape()
    p.vertex(-(size/2),(size/2)-50,z+(size/2),0,0)
    p.vertex(200,(size/2)-50,z+(size/2),1,0)
    p.vertex(200,(size/2)-50,z+-(size/2),1,1)
    p.vertex(-200,(size/2)-50,z+-(size/2),0,1)
    p.endShape()
    p.beginShape()
    p.vertex(-(size/2),-((size/2)-50),z+(size/2),0,0)
    p.vertex((size/2),-((size/2)-50),z+(size/2),1,0)
    p.vertex((size/2),-((size/2)-50),z+-(size/2),1,1)
    p.vertex(-(size/2),-((size/2)-50),z+-(size/2),0,1)
    p.endShape()
    
    p.rotateZ(p.radians(x/2))
    p.rotateX(p.radians(x/2))
    p.rotateY(p.radians(x/2))
    p.translate(0,0,0)
    p.texture(img)
    p.sphere((size/2)-(size/4))
    p.ambientLight(255,255,255)
    p.sphere(size+100)
  }
}

