AnyGram.Views.SubmissionShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.favorers(), 'add remove', this.render);
  },

  template: JST['submission/show'],
  className: 'feed-item',
  tagName: 'article',

  render: function () {
    var content = this.template({
      submission: this.model,
      submitter: this.model.submitter(),
      favorers: this.model.favorers()
    });
    
    this.$el.html(content);

    var $favImg = this.$el.find('.fav-img');
    $favImg.favoritable(this.model, {
      event: 'dblclick',
      onEventEnd: this.handleFavoritableResponse.bind(this)
    });

    var $favBtn = this.$el.find('.fav-btn');
    $favBtn.favoritable(this.model, { 
      onEventEnd: this.handleFavoritableResponse.bind(this)
    });

    if (this.model.get('favorited')) {
      $favBtn.addClass('favorited');
    }

    return this;
  },

  handleFavoritableResponse: function (favorited) {
    var $favImg = this.$el.find('.fav-img');

    var heartType = favorited ? 'heart-overlay' : 'heart-break-overlay';
    var $heart = $('<div>').addClass(heartType + ' animated fadeOut');

    $favImg.prepend($heart);

    var $favBtn = this.$el.find('.fav-btn');

    if (favorited) {
      $favBtn.addClass('favorited');
    } else {
      $favBtn.removeClass('favorited');
    }
  }
});
