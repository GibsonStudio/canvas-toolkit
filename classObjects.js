


function Objects (args) {

  var args = args || {};
  this.objects = [];


  this.add = function (obj) {
    this.objects.push(obj);
  }


  this.delete = function (obj) {

    for (var i = 0; i < this.objects.length; i++) {
      if (this.objects[i] == obj) {
        this.objects.splice(i, 1);
        break;
      }
    }

  }


  this.update = function () {

    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }

  }



}








//
