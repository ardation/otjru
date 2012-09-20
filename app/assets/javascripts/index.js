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
      faculty: '',
      university: '',
      email: '',
      year: '',
      mobile: '',
      kennedy: '',
      interest: '',
      outreach: 'RUSSIA',
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
        if( amplify.store('currentpage') != page.replace(I18n.locale  + '/','') ) {
          //saved page does not match
          window.location = '/'+ I18n.locale +'/' + amplify.store('currentpage');
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
        amplify.store('records', _.without(records, value));
        /*$.post('http://s1.studentlife.org.nz/index.php/api/journey/user/format/json', value , 'json')
        .success(function() {
          amplify.store('records', _.without(records, value));
        })
        .error(function(data) {
          if(data.responseText == '"Phone Number already exists in the system."') {
            amplify.store('records', _.without(records, value));
          }
        });*/
      });
    }
  });

  index.Views.step1 = Backbone.View.extend({
    template: I18n.locale + "/page/step1",

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
    template: I18n.locale + "/page/step2",
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
    template: I18n.locale + "/page/step3",
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
    template: I18n.locale + "/page/step4",
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
    template: I18n.locale + "/page/step5",
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
    template: I18n.locale + "/page/step6",
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
      var phone = /^\d{5,15}$/
      var email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

      if( $('#fname').val() == '' ) {
        $('#errorkind').text(I18n.step6_error_fname);
        $('#step6 .error').fadeIn();
      } else if( $('#lname').val() == '' ) {
        $('#errorkind').text(I18n.step6_error_lname);
        $('#step6 .error').fadeIn();
      } else if( !$('[name=gender]').is(':checked') ) {
        $('#errorkind').text(I18n.step6_error_gender);
        $('#step6 .error').fadeIn();
      } else if( !phone.test($('#mobile').val()) ) {
        $('#errorkind').text(I18n.step6_error_mobile);
        $('#step6 .error').fadeIn();
      } else if( !email.test($('#email').val()) ) {
        $('#errorkind').text(I18n.step6_error_email);
        $('#step6 .error').fadeIn();
      } else if( $('#university').val() == '' ) {
        $('#errorkind').text(I18n.step6_error_university);
        $('#step6 .error').fadeIn();
      } else if( $('#faculty').val() == '' ) {
        $('#errorkind').text(I18n.step6_error_faculty);
        $('#step6 .error').fadeIn();
      } else if( !$('[name=year]').is(':checked') ) {
        $('#errorkind').text(I18n.step6_error_year);
        $('#step6 .error').fadeIn();
      } else {
        namespace.app.router.navigate('step7', {trigger: true});
      }
    },
    populate: function() {
      $('#fname').val( Backbone.PageData.get('fname') );
      $('#lname').val( Backbone.PageData.get('lname') );
      $('#mobile').val( Backbone.PageData.get('mobile') );
      $('#email').val( Backbone.PageData.get('email') );
      $('#university').val( Backbone.PageData.get('university') );
      $('#faculty').val( Backbone.PageData.get('faculty') );
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
    template: I18n.locale + "/page/step7",
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
        Backbone.PageData.get('email') == '' ||
        Backbone.PageData.get('univesity') == '' ||
        Backbone.PageData.get('faculty') == '' ||
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
    template: I18n.locale + "/page/step8",
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
    template: I18n.locale + "/page/kennedy",
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
    template: I18n.locale + "/page/data",
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
      var phone = /^\d{6,14}$/

      if( !$('#locality').val() )
        $('#data .error').text('Enter a location').fadeIn();

      else if( !$('[name=sj]').is(':checked') )
        $('#data .error').text('Make a selection about Spiritual Journey').fadeIn();

      else if( !$('[name=interest]').is(':checked') )
        $('#data .error').text('Make a selection to Beginning Journey').fadeIn();

      else if( $('#fname').val() == '' )
        $('#data .error').text(I18n.step6_error_fname).fadeIn();

      else if( $('#lname').val() == '' )
        $('#data .error').text(I18n.step6_error_lname).fadeIn();

      else if( !$('[name=gender]').is(':checked') )
        $('#data .error').text(I18n.step6_error_gender).fadeIn();
      else if( $('#mobile').val() == '' ||  !phone.test($('#mobile').val()) )
        $('#data .error').text(I18n.step6_error_mobile).fadeIn();

      else if( !$('[name=year]').is(':checked') )
        $('#data .error').text(I18n.step6_error_year).fadeIn();


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
      $('#email').val( Backbone.PageData.get('email') );
      $('#university').val( Backbone.PageData.get('university') );
      $('#faculty').val( Backbone.PageData.get('faculty') );
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
