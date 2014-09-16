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
    
    this._swapView(indexView);
  },
  
  feedsShow: function(id) {
    var feed = NewsReader.Collections.feeds.getOrFetch(id);
    var showView = new NewsReader.Views.FeedsShow({
      model: feed
    });
    
    this._swapView(showView);
  },
  
  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.render().$el);    
  }
  
});