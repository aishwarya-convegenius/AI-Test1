// Six-screen pagination: any button with data-target swaps which .page is
// visible and updates the progress dots. Purely visual, in-memory state only.
document.addEventListener('DOMContentLoaded', function () {
  var pages = document.querySelectorAll('.page');
  var dots = document.querySelectorAll('.progress-dot');

  function showPage(index) {
    pages.forEach(function (page, i) {
      page.hidden = i !== index;
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showPage(parseInt(btn.getAttribute('data-target'), 10));
    });
  });
});

// CRTF terms and five-moves accordions: tap a header to reveal its
// description. Only one item per accordion stays open at a time.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-accordion]').forEach(function (accordion) {
    var items = accordion.querySelectorAll('.acc-item');
    items.forEach(function (item) {
      var header = item.querySelector('.acc-header');
      header.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        items.forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
});

// Quick MCQs: tap an option to select it and reveal one line of feedback.
// Purely visual, in-memory state only — nothing is saved or sent anywhere.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mcq-group').forEach(function (group) {
    var options = group.querySelectorAll('.mcq-option');
    var feedback = group.querySelector('.mcq-feedback');
    options.forEach(function (option) {
      option.addEventListener('click', function () {
        options.forEach(function (o) { o.classList.remove('selected'); });
        option.classList.add('selected');
        if (feedback) {
          feedback.textContent = option.getAttribute('data-feedback') || '';
          feedback.hidden = false;
        }
      });
    });
  });
});
