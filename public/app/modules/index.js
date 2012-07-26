define([
  "namespace",

  // Libs
  "use!backbone",
  "use!amplify"
  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var index = namespace.module();

  index.Model = Backbone.Model.extend({
    defaults: {
      campus: '',
      place: '',
      magazine: ['studying'],
      journey: '',
      fname: '',
      lname: '',
      gender: '',
      major: '',
      year: '',
      mobile: '',
      kennedy: '',
      interest: '',
      outreach: '2012B',
      mobileer: false
    },
    write: function () {
      amplify.store('pagedata', this);
    }
  });

  // index extendings
  index.Page = Backbone.Model.extend({
    model: null,
    mobile: function() {
      if ( Backbone.PageData.get('mobileer') ) {
        Backbone.PageData.set('mobileer', false);
        Backbone.PageData.write();
        return true;
      } else {
        return false;
      }
    },
    initialize: function(campus, hash) {
      this.campus = campus;
      this.checkpage(hash);
      this.pagedata();
    },
    reset: function() {
      var model = new index.Model;
      amplify.store('pagedata', model);
      Backbone.PageData = model;
      model.set('campus',this.campus);
      model.write();
    },
    pagedata: function() {
      var model = new index.Model;
      if ( amplify.store('pagedata') == undefined ) {
        amplify.store('pagedata', model);
      } else {
        model = new index.Model( amplify.store('pagedata') );
      }
      this.set('model', model);
      Backbone.PageData = model;
      model.set('campus',this.campus);
      model.write();
    },
    checkpage: function(page) {
      if ( amplify.store('currentpage') != undefined ) {
        if( amplify.store('currentpage') != page ) {
          //saved page does not match
          window.location = document.location.protocol + '//' + document.location.host + '/' + amplify.store('currentpage');
        }
      } else {
        //there is no saved page
        amplify.store('currentpage', '');
        window.location = document.location.protocol + '//' + document.location.host;
      }
    },
    changepage: function(page) {
      amplify.store('currentpage', page);
    },
    storerecord: function(data) {
      //store data for submission
      var records = [];
      if ( amplify.store('records') == undefined ) {
        amplify.store('records', records);
      }
      records = amplify.store('records');
      records.push(data);
      amplify.store('records', records);
    },
    pushrecords: function() {
      var records = amplify.store('records');
      _.each(records, function(value) {
        $.post('http://s1.studentlife.org.nz/index.php/api/journey/user/format/json', value , 'json')
        .success(function() {
          amplify.store('records', _.without(records, value));
        })
        .error(function(data) {
          if(data.responseText == '"Phone Number already exists in the system."') {
            amplify.store('records', _.without(records, value));
          }
        });
      });
    }
  });

  index.Views.step1 = Backbone.View.extend({
    template: "app/templates/step1.html",

    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  index.Views.step2 = Backbone.View.extend({
    template: "app/templates/step2.html",
    events: {
      'click .next': 'next',
      'focus input': 'empty',
      'change input': 'store'
    },
    store: function(e) {
      Backbone.PageData.set('place', $(e.currentTarget).val());
      Backbone.PageData.write();
    },
    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    empty: function(event) {
      $('#locality').val('');
    },
    next: function(event) {
      if( !$('#locality').val() || $('#locality').val() == 'Enter a location' ) {
        $('#step2 .error').fadeIn();
      } else {
        Backbone.PageData.set('place', $('#locality').val());
        Backbone.PageData.write();
        namespace.app.router.navigate('step3', {trigger: true});
      }
    },
    populate: function() {
      $('#locality').val( Backbone.PageData.get('place') );
    }
  });

  index.Views.step3 = Backbone.View.extend({
    template: "app/templates/step3.html",
    events: {
      'click .next': 'next',
      'click .label_check': 'labelstyle',
      'click input': 'store'
    },
    store: function() {
      var magazine = [];
      $('#studying:checked, #relation:checked, #lifesqs:checked:checked, #sports:checked').each(function() {
        magazine.push( $(this).attr('id') );
      });
      Backbone.PageData.set('magazine', magazine);
      Backbone.PageData.write();
    },
    labelstyle: function() {
      if ($('.label_check input').length) {
          $('.label_check').each(function(){ 
              $(this).removeClass('c_on');
          });
          $('.label_check input:checked').each(function(){ 
              $(this).parent('label').addClass('c_on');
          });                
      };
    },
    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    populate: function() {
      var magazine = Backbone.PageData.get('magazine');
      $.each(magazine, function(index, value) {
        $('#' + value).prop('checked',true);
      });
      this.labelstyle();
    },
    next: function(event) {
      namespace.app.router.navigate('step4', {trigger: true});
    }
  });

  index.Views.step4 = Backbone.View.extend({
    template: "app/templates/step4.html",
    events: {
      'click .next': 'next',
      "click .label_radio": "labelstyle",
      'change input': 'store'
    },
    store: function(e) {
        Backbone.PageData.set('journey', $(e.currentTarget).attr('id'));
        Backbone.PageData.write();
    },
    labelstyle: function() {
      if ($('.label_radio input').length) {
          $('.label_radio').each(function(){ 
              $(this).removeClass('r_on');
          });
          $('.label_radio input:checked').each(function(){ 
              $(this).parent('label').addClass('r_on');
          });
      };
    },
    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    next: function(event) {
      if( !$('[name=sj]').is(':checked') )
        $('#step4 .error').fadeIn();
      else
        namespace.app.router.navigate('step5', {trigger: true});
    },
    populate: function() {
      var journey = Backbone.PageData.get('journey');
      if (journey != '') {
        $('#' + journey).prop('checked',true);
        this.labelstyle();
      }
    }
  });

  index.Views.step5 = Backbone.View.extend({
    template: "app/templates/step5.html",
    events: {
      'click .next': 'next',
      "click .label_radio": "labelstyle",
      'change input': 'store'
    },
    store: function(e) {
        Backbone.PageData.set('interest', $(e.currentTarget).attr('id'));
        Backbone.PageData.write();
    },
    labelstyle: function() {
      if ($('.label_radio input').length) {
          $('.label_radio').each(function(){ 
              $(this).removeClass('r_on');
          });
          $('.label_radio input:checked').each(function(){ 
              $(this).parent('label').addClass('r_on');
          });
      };
    },
    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    next: function(event) {
      if( !$('[name=interest]').is(':checked') )
        $('#step5 .error').fadeIn();
      else
        if( $('#iaac').is(':checked') )
          namespace.app.router.navigate('kennedy', {trigger: true});
        else {
          namespace.app.router.navigate('step6', {trigger: true});
          // Reset Kennedy Question
          Backbone.PageData.set('kennedy', '');
          Backbone.PageData.write();
        }
    },
    populate: function() {
      var interest = Backbone.PageData.get('interest');
      if (interest != '') {
        $('#' + interest).prop('checked',true);
        this.labelstyle();
      }
    }
  });

  index.Views.step6 = Backbone.View.extend({
    template: "app/templates/step6.html",
    events: {
      'click .next': 'next',
      'click .label_radio': 'labelstyle',
      'change input, select': 'store'
    },
    store: function(e) {
      if($(e.currentTarget).attr('type') == 'radio') {
        Backbone.PageData.set($(e.currentTarget).attr('name'), $(e.currentTarget).val());
        Backbone.PageData.write();
      } else {
        Backbone.PageData.set($(e.currentTarget).attr('id'), $(e.currentTarget).val());
        Backbone.PageData.write();
      }
    },
    labelstyle: function() {
      if ($('.label_radio input').length) {
          $('.label_radio').each(function(){ 
              $(this).removeClass('r_on');
          });
          $('.label_radio input:checked').each(function(){ 
              $(this).parent('label').addClass('r_on');
          });
      };
    },
    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    next: function(event) {
      var phone = /^02\d{7,13}$/
      if( $('#fname').val() == '' ) {
        $('#errorkind').text('Enter your First Name');
        $('#step6 .error').fadeIn();
      } else if( $('#lname').val() == '' ) {
        $('#errorkind').text('Enter your Last Name');
        $('#step6 .error').fadeIn();
      } else if( !$('[name=gender]').is(':checked') ) {
        $('#errorkind').text('Select your Gender');
        $('#step6 .error').fadeIn();
      } else if( $('#mobile').val() == '' ||  !phone.test($('#mobile').val()) ) {
        $('#errorkind').text('Enter your valid NZ Mobile Number');
        $('#step6 .error').fadeIn();
      } else if( $('#major').val() == 'Area of Study' ) {
        $('#errorkind').text('Select your area of Study');
        $('#step6 .error').fadeIn();
      } else if( !$('[name=year]').is(':checked') ) {
        $('#errorkind').text('Select your Year');
        $('#step6 .error').fadeIn();
      } else {
        namespace.app.router.navigate('step7', {trigger: true});
      }
    },
    populate: function() {
      $('#fname').val( Backbone.PageData.get('fname') );
      $('#lname').val( Backbone.PageData.get('lname') );
      $('#mobile').val( Backbone.PageData.get('mobile') );
      var gender = Backbone.PageData.get('gender');
      if (gender != '') {
        $('#' + gender).prop('checked',true);
        this.labelstyle();
      }

      var year = Backbone.PageData.get('year');
      if (year != '') {
        $('#y' + year).prop('checked',true);
        this.labelstyle();
      }
    }
  });

  index.Views.step7 = Backbone.View.extend({
    template: "app/templates/step7.html",
    render: function(done) {
      var view = this;
      
      // Validation
      if ( Backbone.PageData.get('place') == '' ) {
        setTimeout(function() {
          namespace.app.router.navigate('step2', {trigger: true});
        }, 500);
        return;
      }

      if ( Backbone.PageData.get('journey') == '' ) {
        setTimeout(function() {
          namespace.app.router.navigate('step4', {trigger: true});
        }, 500);
        return;
      }

      if ( Backbone.PageData.get('interest') == '' ) {
        setTimeout(function() {
          namespace.app.router.navigate('step5', {trigger: true});
        }, 500);
        return;
      }

      if ( Backbone.PageData.get('interest') == 'iaac' && Backbone.PageData.get('kennedy') == '' ) {
        setTimeout(function() {
          namespace.app.router.navigate('kennedy', {trigger: true});
        }, 500);
        return;
      }

      if ( Backbone.PageData.get('fname') == '' ||
        Backbone.PageData.get('lname') == '' ||
        Backbone.PageData.get('gender') == '' ||
        Backbone.PageData.get('major') == '' ||
        Backbone.PageData.get('mobile') == '' ||
        Backbone.PageData.get('year') == ''
      ) {
        setTimeout(function() {
          namespace.app.router.navigate('step6', {trigger: true});
        }, 500);
        return;
      }

      var data = Backbone.PageData.toJSON();

      // Data Massaging
      if ( data.gender == 'f' )
        data.gender = 'Female';
      else
        data.gender = 'Male';

      if ( data.interest == 'iaac' )
        data.interest = 'Already Christian';

      if ( data.kennedy == 'k1' )
        data.kennedy = '0%';
      else if ( data.kennedy == 'k2' )
        data.kennedy = '25%';
      else if ( data.kennedy == 'k3' )
        data.kennedy = '50%';
      else if ( data.kennedy == 'k4' )
        data.kennedy = '75%';
      else if ( data.kennedy == 'k5' )
        data.kennedy = '100%';

      if ( data.interest == 'i1' )
        data.interest = '1';
      else if ( data.interest == 'i2' )
        data.interest = '2';
      else if ( data.interest == 'i3' )
        data.interest = '3';
      else if ( data.interest == 'i4' )
        data.interest = '4';
      else if ( data.interest == 'i5' )
        data.interest = '5';

      if( navigator.onLine ){
        //internet connection
        Backbone.Page.storerecord(data);
        Backbone.Page.pushrecords();
      } else {
        //no internet connection
        Backbone.Page.storerecord(data);
      }

      //Publish
      setTimeout(function() {
        namespace.app.router.navigate('step8', {trigger: true});
      }, 4000);

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
  });

  index.Views.step8 = Backbone.View.extend({
    template: "app/templates/step8.html",
    events: {
      'click .next': 'next',
    },
    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    next: function(event) {
      namespace.app.router.navigate('', {trigger: true});
    }
  });

  index.Views.kennedy = Backbone.View.extend({
    template: "app/templates/kennedy.html",
    events: {
      'click .next': 'next',
      "click .label_radio": "labelstyle",
      'change input': 'store'
    },
    store: function(e) {
        Backbone.PageData.set('kennedy', $(e.currentTarget).attr('id'));
        Backbone.PageData.write();
    },
    labelstyle: function() {
      if ($('.label_radio input').length) {
          $('.label_radio').each(function(){ 
              $(this).removeClass('r_on');
          });
          $('.label_radio input:checked').each(function(){ 
              $(this).parent('label').addClass('r_on');
          });
      };
    },
    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    next: function(event) {
      if( !$('[name=kennedy]').is(':checked') )
        $('#kennedy .error').fadeIn();
      else
        namespace.app.router.navigate('step6', {trigger: true});
    },
    populate: function() {
      var kennedy = Backbone.PageData.get('kennedy');
      if (kennedy != '') {
        $('#' + kennedy).prop('checked',true);
        this.labelstyle();
      }
    }
  });

  index.Views.data = Backbone.View.extend({
    template: "app/templates/data.html",
    events: {
      'click .next': 'next',
      "click .label_radio, .label_check": "labelstyle",
      'change input, select': 'store'
    },
    store: function(e) {
      if (e.currentTarget.id == 'locality')
        Backbone.PageData.set('place', $(e.currentTarget).val());

      else if (e.currentTarget.type == 'checkbox') {
        var magazine = [];
        $('#studying:checked, #relation:checked, #lifesqs:checked, #sports:checked').each(function() {
          magazine.push( $(this).attr('id') );
        });
        Backbone.PageData.set('magazine', magazine );
      }

      else if (e.currentTarget.name == 'sj')
        Backbone.PageData.set('journey', $(e.currentTarget).attr('id'));

      else if (e.currentTarget.name == 'interest')
        Backbone.PageData.set('interest', $(e.currentTarget).attr('id'));

      else if($(e.currentTarget).attr('type') == 'radio')
        Backbone.PageData.set($(e.currentTarget).attr('name'), $(e.currentTarget).val());
      
      else
        Backbone.PageData.set($(e.currentTarget).attr('id'), $(e.currentTarget).val() );

      Backbone.PageData.write();
    },
    labelstyle: function() {
       if ($('.label_check input').length) {
          $('.label_check').each(function(){ 
              $(this).removeClass('c_on');
          });
          $('.label_check input:checked').each(function(){ 
              $(this).parent('label').addClass('c_on');
          });                
      };
      if ($('.label_radio input').length) {
          $('.label_radio').each(function(){ 
              $(this).removeClass('r_on');
          });
          $('.label_radio input:checked').each(function(){ 
              $(this).parent('label').addClass('r_on');
          });
      };
    },
    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    next: function(event) {
      var phone = /^0\d{7,14}$/

      if( !$('#locality').val() )
        $('#data .error').html('Enter a location').fadeIn();

      else if( !$('[name=sj]').is(':checked') )
        $('#data .error').html('Make a selection about Spiritual Journey').fadeIn();

      else if( !$('[name=interest]').is(':checked') )
        $('#data .error').html('Make a selection to Beginning Journey').fadeIn();
      
      else if( $('#fname').val() == '' )
        $('#data .error').text('Enter First Name').fadeIn();

      else if( $('#lname').val() == '' )
        $('#data .error').text('Enter Last Name').fadeIn();

      else if( !$('[name=gender]').is(':checked') )
        $('#data .error').text('Select Gender').fadeIn();
      else if( $('#mobile').val() == '' ||  !phone.test($('#mobile').val()) )
        $('#data .error').text('Enter valid NZ Mobile Number').fadeIn();

      else if( $('#major').val() == 'Area of Study' )
        $('#data .error').text('Select Area of Study').fadeIn();

      else if( !$('[name=year]').is(':checked') )
        $('#data .error').text('Select Year').fadeIn();
      
      else {
        namespace.app.router.navigate('step7', {trigger: true});
      }
    },
    populate: function() {
      $('#locality').val( Backbone.PageData.get('place') );

      var magazine = Backbone.PageData.get('magazine');
      $.each(magazine, function(index, value) {
        $('#' + value).prop('checked',true);
      });

      var journey = Backbone.PageData.get('journey');
      if (journey != '') {
        $('#' + journey).prop('checked',true);
      }

      var interest = Backbone.PageData.get('interest');
      if (interest != '') {
        $('#' + interest).prop('checked',true);
      }

      $('#fname').val( Backbone.PageData.get('fname') );
      $('#lname').val( Backbone.PageData.get('lname') );
      $('#mobile').val( Backbone.PageData.get('mobile') );
      var gender = Backbone.PageData.get('gender');
      if (gender != '') {
        $('#' + gender).prop('checked',true);
      }

      var year = Backbone.PageData.get('year');
      if (year != '') {
        $('#y' + year).prop('checked',true);
      }

      this.labelstyle();
    }
  });

  // Required, return the module for AMD compliance
  return index;

});
