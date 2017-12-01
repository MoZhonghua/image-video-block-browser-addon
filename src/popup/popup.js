// popup.js


var $ = {
    query: document.querySelector.bind(document),
    toggleClass: function(el, className) {
        if (el.classList.contains(className))
            el.classList.remove(className);
        else
            el.classList.add(className);
    }
};


var options = {
  els: {
    imgBlock: $.query('#imgBlock'),
    videoHide: $.query('#videoHide'),
    flashHide: $.query('#flashHide'),
    svgHide: $.query('#svgHide'),
    canvasHide: $.query('#canvasHide')
  },

  set: function(e) {
    var data = {};
    data[e.target.id] = !e.target.classList.contains('active');
    $.toggleClass(e.target, 'active');

    chrome.storage.local.set(data);
  },

  init: function() {
    var self = this;
    chrome.storage.local.get(function(data) {
      Object.keys(self.els).forEach(function(key) {
        if (data[key]) self.els[key].classList.add('active');
      });
    });

    for (var el in this.els)
      this.els[el].addEventListener('click', this.set);
  }
};


options.init();
