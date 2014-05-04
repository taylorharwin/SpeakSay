$(function(){

    var Animal = Backbone.Model.extend({
        defaults:{
            title: 'Animal',
            says: 'voice',
            talking: false
        },

        toggle: function(){
            this.set('talking', !this.get('activated'));
        },
    });

    var AnimalList = Backbone.Collection.extend({
        model: Animal,
        getChecked: function(){
            return this.where({'activated':true});
        }
    });


    var animals = new AnimalList([
        new Animal({title: 'dog', says: 'woof'}),
        new Animal({title: 'cat', says: 'meow'}),
        new Animal({title: 'bird', says: 'tweet'}),
        new Animal({title: 'cow', says: 'moo'})
        ]);


    var  AnimalsView = Backbone.View.extend({
        tagName: 'ul',

        events:{
            'click': 'speak'
        },

        initialize: function(){
            this.listenTo(this.model, 'add', this.render);
        },

        render: function(){
            this.$el.html('What does the ' + this.model.get('title') + ' say?');
            return this;
        },

        speak: function(){
            var self = this;
            this.$el.html('The ' + this.model.get('title') + ' says ' + this.model.get('says'));
            setTimeout(function(){self.render();}, 2000);
          }
        });


    var App = Backbone.View.extend({
        el: $('span'),

        //template: _.template('<button class=button>Click to Play</button>'),

        events: {
            'click .button':'randomSpeak',
            'click .butt2': 'getNewAnimal',
        },

          initialize: function(){
            this.render();
            this.list = $('.title');
            this.listenTo(animals, 'add', this.addNew);
            animals.each(function(animal){
              var view = new AnimalsView({ model: animal});
              this.list.append(view.render().el);}, this);
        },

        addNew: function(){
            var newAnimal =  animals.at(animals.length - 1);
            var newAnimalView = new AnimalsView({ model: newAnimal});
            this.list.append(newAnimalView.render().el);
        },

          randomSpeak: function(){

            var randomAnimalIndex = Math.floor(Math.random() * animals.length);
            var randomAnimalspot = animals.at(randomAnimalIndex);

            var randomAnimal = new AnimalsView({model: randomAnimalspot});
            this.$el.append('<li>' + 'The ' + randomAnimal.model.get('title') + ' says ' + randomAnimal.model.get('says') + '</li>');
        },

         getNewAnimal: function(){
            var animalName = $('.name').val();
            var animalSound = $('.sound').val();

            var newBeast = new Animal({title: animalName, says: animalSound});
            animals.add(newBeast);

            $('.name').val('Name');
            $('.sound').val('Sound');

        },

        render: function(){
            this.$el.append('<button class=button>Get random Animal</button>');
            this.$el.append('<input class=name type="text" size="18" value=Name>');
            this.$el.append('<input class=sound type="text" size="18" value=Sound>');
            this.$el.append('<button class=butt2>Submit new Animal</button>');

            return this;
        }


        });

new App();


});

