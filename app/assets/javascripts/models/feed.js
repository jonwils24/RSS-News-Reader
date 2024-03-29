/*global NewsReader */

NewsReader.Models.Feed = Backbone.Model.extend({
  urlRoot: "/api/feeds",

  entries: function () {
    this._entries = this._entries ||
      new NewsReader.Collections.FeedEntries([], {feed: this});
    return this._entries;
  },

  parse: function (response) {
    if (response.latest_entries) {
      this.entries().set(response.latest_entries, {parse: true});
      delete response.latest_entries;
    }
    return response;
  }

});