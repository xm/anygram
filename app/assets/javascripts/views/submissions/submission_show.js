AnyGram.Views.SubmissionShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['submission/show'],
  className: 'container-fluid submission',

  render: function () {
    var content = this.template({ 
      submission: this.model,
      submitter: this.model.submitter()
    });
    this.$el.html(content);

    var $favoritable = this.$el.find('.favoritable');

    $favoritable.favoriteToggle({
      onEventBegin: function ($el, favorited) {
        $el.removeClass('animated tada shake');
      },

      onEventEnd: function ($el, favorited) {
        $el.addClass('animated');
        $el.addClass(favorited ? 'tada' : 'shake');
      }
    });

    return this;
  }
});
