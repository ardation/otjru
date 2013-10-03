
// Create a new module
var Index = {
    Models: {},
    Collections: {},
    Views: {}
};

Index.Model = Backbone.Model.extend({
  defaults: {
    campus: '',
    place: '',
    magazine: [],
    journey: [],
    fname: '',
    lname: '',
    gender: '',
    faculty: '',
    university: '',
    email: '',
    year: '',
    mobile: '',
    relationship: '',
    kv: '',
    kv_text: '',
    interest: '',
    mobileer: false,
  },
  write: function () {
    amplify.store('pagedata', this);
  }
});

Index.Page = Backbone.Model.extend({
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
  initialize: function() {
    var str = document.URL.match(/[^\/]+$/);
    if ( str != null )
      str = str[0];
    else
      str = '';
    this.checkpage(str);
    this.pagedata();
  },
  reset: function() {
    var model = new Index.Model;
    amplify.store('pagedata', model);
    Backbone.PageData = model;
    model.set('campus',this.campus);
    model.write();
  },
  pagedata: function() {
    var model = new Index.Model;
    if ( amplify.store('pagedata') == undefined ) {
      amplify.store('pagedata', model);
    } else {
      model = new Index.Model( amplify.store('pagedata') );
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
        window.location = '/'+ I18n.locale +'/' + amplify.store('currentpage');
      }
    } else {
      //there is no saved page
      amplify.store('currentpage', 'step1');
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
      value = {
        person: {
          first_name: value.fname,
          last_name: value.lname,
          gender: value.gender,
          email: value.email,
          mobile: value.mobile,
          answers_attributes: [
            {content_id:1, data:value.place},
            {content_id:2, data:JSON.stringify(value.magazine)},
            {content_id:3, data:JSON.stringify(value.journey)},
            {content_id:4, data:value.interest},
            {content_id:5, data:value.kv},
            {content_id:11, data:value.kv_text},
            {content_id:6, data:value.university},
            {content_id:7, data:value.faculty},
            {content_id:8, data:value.year},
            {content_id:10, data:I18n.locale},
            {content_id:12, data:value.relationship}
          ]
        }
      };
      $.post('/data.json', value , 'json')
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

Index.Views.step1 = Backbone.View.extend({
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

Index.Views.step2 = Backbone.View.extend({
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

Index.Views.step3 = Backbone.View.extend({
  template: I18n.locale + "/page/step3",
  events: {
    'click .next': 'next',
    'click .label_check': 'labelstyle',
    'click input': 'store'
  },
  store: function() {
    var magazine = ["","","",""]
    $('#m1:checked, #m2:checked, #m3:checked, #m4:checked').each(function() {
      magazine[$(this).attr('name')] = $(this).val();
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

Index.Views.step4 = Backbone.View.extend({
  template: I18n.locale + "/page/step4",
  events: {
    'click .next': 'next',
    'click .label_check': 'labelstyle',
    'change input': 'store'
  },
  store: function(e) {
     var journey = ["","","","",""];
      $('#c1:checked, #c2:checked, #c3:checked, #c4:checked, #c5:checked').each(function() {
        journey[$(this).attr('name')] = $(this).val();
      });
      Backbone.PageData.set('journey', journey);
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
  next: function(event) {
    namespace.app.router.navigate('step5', {trigger: true});
  },
  populate: function() {
    var journey = Backbone.PageData.get('journey');
    $.each(journey, function(index, value) {
      $('#' + value).prop('checked',true);
    });
    this.labelstyle();
  }
});

Index.Views.step5 = Backbone.View.extend({
  template: I18n.locale + "/page/step5",
  events: {
    'click .next': 'next',
    "click .label_radio": "labelstyle",
    'change input': 'store'
  },
  store: function(e) {
      Backbone.PageData.set('relationship', $(e.currentTarget).attr('id'));
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
    if( !$('[name=step5]').is(':checked') )
      $('#step5 .error').fadeIn();
    else
      if( $('[name=step5]:checked').hasClass('negative') ) {
        namespace.app.router.navigate('step6a', {trigger: true});
      } else {
        namespace.app.router.navigate('step6b', {trigger: true});
      }
  },
  populate: function() {
    var relationship = Backbone.PageData.get('relationship');
    if (relationship != '') {
      $('#' + relationship).prop('checked',true);
      this.labelstyle();
    }
  }
});

Index.Views.step6a = Backbone.View.extend({
  template: I18n.locale + "/page/step6a",
  events: {
    'click .next': 'next',
    "click .label_radio": "labelstyle",
    'change input': 'store',
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
    if( !$('[name=step6a]').is(':checked') )
      $('#step6a .error').fadeIn();
    else
      namespace.app.router.navigate('details', {trigger: true});
  },
  populate: function() {
    var interest = Backbone.PageData.get('interest');
    if (interest != '') {
      $('#' + interest).prop('checked',true);
      this.labelstyle();
    }
  }
});

Index.Views.step6b = Backbone.View.extend({
  template: I18n.locale + "/page/step6b",
  events: {
    'click .next': 'next',
    "click .label_radio": "labelstyle",
    'change #kv_text': 'store_text',
    'change input': 'store',
  },
  store: function(e) {
      Backbone.PageData.set('kv', $(e.currentTarget).attr('id'));
      Backbone.PageData.write();
  },
  store_text: function(e) {
      Backbone.PageData.set('kv_text', $(e.currentTarget).val());
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
    if( !$('[name=step6b]').is(':checked') )
      $('#step6b .error').fadeIn();
    else
      namespace.app.router.navigate('details', {trigger: true});
  },
  populate: function() {
    $("#kv_text").val(Backbone.PageData.get('kv_text'));
    var kv = Backbone.PageData.get('kv');
    if (kv != '') {
      $('#' + kv).prop('checked',true);
      this.labelstyle();
    }
  }
});

Index.Views.details = Backbone.View.extend({
  template: I18n.locale + "/page/details",
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
      $('#details .error').fadeIn();
    } else if( $('#lname').val() == '' ) {
      $('#errorkind').text(I18n.step6_error_lname);
      $('#details .error').fadeIn();
    } else if( !$('[name=gender]').is(':checked') ) {
      $('#errorkind').text(I18n.step6_error_gender);
      $('#details .error').fadeIn();
    } else if( !phone.test($('#mobile').val()) ) {
      $('#errorkind').text(I18n.step6_error_mobile);
      $('#details .error').fadeIn();
    } else if( !email.test($('#email').val()) ) {
      $('#errorkind').text(I18n.step6_error_email);
      $('#details .error').fadeIn();
    } else if( $('#university').val() == '' ) {
      $('#errorkind').text(I18n.step6_error_university);
      $('#details .error').fadeIn();
    } else if( $('#faculty').val() == '' ) {
      $('#errorkind').text(I18n.step6_error_faculty);
      $('#details .error').fadeIn();
    } else if( !$('[name=year]').is(':checked') ) {
      $('#errorkind').text(I18n.step6_error_year);
      $('#details .error').fadeIn();
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

Index.Views.step7 = Backbone.View.extend({
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

    if ( Backbone.PageData.get('relationship') == '' ) {
      setTimeout(function() {
        namespace.app.router.navigate('step5', {trigger: true});
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
      data.gender = 'female';
    else
      data.gender = 'male';

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

    Backbone.Page.storerecord(data);

    if( navigator.onLine ){
      //internet connection
      Backbone.Page.pushrecords();
    }

    //Publish
    setTimeout(function() {
      namespace.app.router.navigate('step8', {trigger: true});
    }, 2000);

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

Index.Views.step8 = Backbone.View.extend({
  template: I18n.locale + "/page/step8",
  events: {
    'click #finish': 'next',
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
    namespace.app.router.navigate('step1', {trigger: true});
  }
});

Index.Views.terms = Backbone.View.extend({
  template: I18n.locale + "/page/terms." + I18n.locale,
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
    window.history.back();
  }
});
