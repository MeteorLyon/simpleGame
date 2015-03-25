Position = new Meteor.Collection("cam-position");

if (Meteor.isClient) {
  Template.games.rendered = function() {
        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

        function preload () {

            game.load.image('logo', 'img/phaser.png');

        }

        function create () {

            var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

        }
  };

  Template.games.events({
    'keydown button': function (event) {
      var liliPosition = Position.findOne(),
          lili = document.querySelector('#lili'),
          bottom = parseInt(lili.style.bottom),
	  right = parseInt(lili.style.right); 
      
      switch (event.which) {
	case 38:
           lili.style.bottom = bottom + 5 + "px";
	   break;
        case 40:
	   lili.style.bottom = bottom - 5 + "px";
	   break;
        case 37:
	   lili.style.right = right + 5 + "px";
	   break;
	case 39:
	   lili.style.right = right - 5 + "px";
	   break;
        
      }

      Position.update({_id: liliPosition._id}, {$set: {bottom: parseInt(lili.style.bottom), right: parseInt(lili.style.right)}});
    }
  });

  Template.games.helpers({
    bottom: function() {
      var liliPosition = Position.findOne();//,
console.log(liliPosition);
          bottom = liliPosition && liliPosition.bottom || 0;

      return bottom;
    },

    right: function() {
      var liliPosition = Position.findOne(),
          right = liliPosition && liliPosition.right || 0;

      return right;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Position.find().count() === 0) {
      Position.insert({bottom: 0, right: 0});
    }
  });
}
