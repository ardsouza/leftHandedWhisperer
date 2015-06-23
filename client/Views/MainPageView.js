app.mainPageView = Backbone.View.extend({
  el: document.getElementsByClassName('col-md-8'),

  initialize : function() {
    app.calendar = this.calendar = new app.CalendarView({collection: app.events});
  },

  events : {
  },

  render : function(view) {
    this.$el.children().detach();
    this.$el.append(this[view].render());
    this.calendar.addAll();
  }
});