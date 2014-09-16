/*global NewsReader */

NewsReader.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'feedsIndex',
    'feeds/:id': 'feedsShow'
  },
  
  feedsIndex: function() {
    NewsReader.feeds.fetch();
    
    var indexView = new NewsReader.Views.FeedsIndex({
      collection: NewsReader.feeds
    });
    
    this.$rootEl.html(indexView.render().$el);
  },
  
  feedsShow: function(id) {
    var feed = NewsReader.Collections.feeds.getOrFetch(id);
    var showView = new NewsReader.Views.FeedsShow({
      model: feed
    });
    
    this.$rootEl.html(showView.render().$el);
  }
});