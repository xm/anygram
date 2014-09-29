AnyGram.Views.SubmissionNew = Backbone.View.extend({
  template: JST['submission/new'],
  className: 'container-fluid',

  events: {
    'change #source': 'onChange',
    'click #upload': 'onUpload',
    'click #cancel': 'onCancel'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  onChange: function (event) {
    var file = event.currentTarget.files[0];
    var view = this;
    var reader = new FileReader();

    reader.onload = function (e) {
      var $wrapper = $('#editor-wrapper');
      var $canvas = $('#editor');
      var ctx = $canvas.get(0).getContext('2d');

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 512, 512);

      var img = new Image();
      img.src = this.result;
      img.onload = function (e) {
        var divisor = (img.width > img.height ? img.width : img.height) / 512;
        var width = img.width / divisor;
        var height = img.height / divisor;
        var x = (512- width) / 2;
        var y = (512 - height) / 2;

        ctx.drawImage(img, x, y, width, height);

        $('#upload-form').hide();
        $wrapper.show();
      };
    };

    reader.readAsDataURL(file);
  },

  onUpload: function (event) {
    event.preventDefault();

    var canvas = $('#editor').get(0);
    var data = canvas.toDataURL('image/jpeg');

    var attrs = $('form').serializeJSON();
    attrs.source = data;

    this.model.save(attrs, {
      success: function (model) {
        Backbone.history.navigate('#/view/' + model.id);
      }
    });
  },

  onCancel: function (event) {
    event.preventDefault();

    var $wrapper = $('#editor-wrapper');
    var $canvas = $('#editor');
    var canvas = $canvas.get(0);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);
    $wrapper.hide();
    $('#upload-form').show();
  }
});
