/*global NewsReader, JST */
NewsReader.Views.EntryShow = Backbone.View.extend({
  tagName: 'li',
  
  template: JST["feeds/entry"],
  
  initialize: function(option) {
    this.entry = option.entry;
  },
  
  render: function() {
    var renderedContent = this.template( {
      entry: this.entry
    });
    this.$el.html(renderedContent);
    return this;
  }
});

NewsReader.Views.FeedsShow = Backbone.View.extend({
  events: {
    'click #refresh-feed' : 'refresh'
  },
  
  template: JST["feeds/show"],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    var that = this;
    this.model.entries().each(function(entry) {
      var view = new NewsReader.Views.EntryShow({ entry: entry });
      that.$el.append(view.render().$el);
    });
    return this;
  },
  
  refresh: function() {
    this.model.fetch();
  }
});