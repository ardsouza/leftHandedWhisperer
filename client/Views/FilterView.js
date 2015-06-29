app.filterView = Backbone.View.extend({
  // className : 'loginout',
  el: '<div id="filterView">\
        <ul class="nav navbar-nav navbar-left"> \
          <form class="form-inline filter">\
            <div class="form-group">\
              <label>Search Location: </label>\
              <input type="text" class="form-control" id="location-filter">\
            </div>\
            <div class="form-group">\
              <label>Radius (mi): </label>\
              <input type="number" class="form-control" id="distance-filter">\
            </div>\
            <div class="form-group">\
              <label>User: </label>\
              <input type="text" class="form-control" id="user-filter">\
            </div>\
            <input class="btn btn-success" id="filter-button" type="button" value="Update">\
          </form>\
        </ul> \
      <div>',

      // <div class="dropdown form-group" >\
      //   <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Followed User<span class="caret"></span></a>\
      //   <ul class="dropdown-menu">\
      //     <li><a href="#" id="newEventButton">Add Event</a></li>\
      //     <li><a href="#" id="usersButton">Follow Another User</a></li>\
      //     <li role="separator" class="divider"></li>\
      //     <li><a href="#" id="profileButton">Your Profile</a></li>\
      //   </ul>\
      // </div>\

  initialize : function() {
    parseInt(this.$el.find('#distance-filter').val(50));
    this.$el.find('#location-filter').val('San Francisco, CA');
    this.renderTourmapView();
  },

  events : {
    'click #filter-button' : 'renderTourmapView'
  },

  render : function() {
    return this.$el;
  },

  renderTourmapView: function(){

    var distanceMax = parseInt(this.$el.find('#distance-filter').val());
    distanceMax = distanceMax || 50;

    var location = this.$el.find('#location-filter').val();

    var username = parseInt(this.$el.find('#user-filter').val());
    if (app.allUsers) {
      var user_id = app.allUsers.findWhere({username:username});
    }

    $.ajax({
      type: 'GET',
      url: 'http://maps.google.com/maps/api/geocode/json?address=' + location,
      success: function(data) {
        var loc = data.results[0].geometry.location;

        app.tourmap.render(true,function(item) {
          if (user_id) {
            console.log(item.get('user_id'))
            return (item.distanceFromLatLong(loc.lat,loc.lng) <= distanceMax && item.get('user_id') === user_id);
          } else {
            return item.distanceFromLatLong(loc.lat,loc.lng) <= distanceMax;
          }
        });

      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });

  }
});