/*global NewsReader, JST */
NewsReader.Views.FeedNew = Backbone.View.extend({
  template: JST["feeds/new"],
  
  events: {
    "submit form": "submit"
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }, 
  
  submit: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    var newFeed = new NewsReader.Models.Feed(params["feed"]);
    
    newFeed.save({}, {
      success: function () {
        NewsReader.feeds.add(newFeed);
      } 
    });
  }
});

NewsReader.Views.FeedsIndex = Backbone.View.extend( {
  events: {
    'click .delete': 'destroyFeed'
  },
  
  template: JST['feeds/index'],
  
  initialize: function () {
    this.listenTo(this.collection, 'sync destroy add', this.render);
  },
  
  render: function() {
    var renderedContent = this.template( {
      feeds: this.collection
    });
    
    var form = new NewsReader.Views.FeedNew();
    this.$el.html(renderedContent).append(form.render().$el);
    
    return this;
  },
  
  // render: function() {
//     var renderedContent = this.template();
//     this.$el.html(renderedContent);
//     var that = this;
//     this.model.entries().each(function(entry) {
//       var view = new NewsReader.Views.EntryShow({ entry: entry });
//       that.$el.append(view.render().$el);
//     });
//     return this;
  
  destroyFeed: function (event) {
    var $target = $(event.target);
    var feed = this.collection.get($target.attr('data-id'));
    
    feed.destroy();
  }
  
});