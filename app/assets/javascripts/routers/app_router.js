NewsReader.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'index',
    'feeds/:id': 'show'
  },
  
  index: function() {
    NewsReader.feeds.fetch();
    
    var indexView = new NewsReader.Views.FeedsIndex({
      collection: NewsReader.feeds
    });
    
    this.$rootEl.html(indexView.render().$el);
  },
  
  show: function() {}
});