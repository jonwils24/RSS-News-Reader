/*global NewsReader, JST */
NewsReader.Views.FeedsShow = Backbone.View.extend({
  template: JST["feeds/show"],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      feed: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});