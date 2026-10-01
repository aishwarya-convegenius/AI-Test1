// Slide deck: every .page is one slide (14 in total). The footer Back / Next
// buttons move between slides and the progress bars + "n / 14" counter are
// built from the slide count, so nothing is hard-coded. In-memory state only.
document.addEventListener('DOMContentLoaded', function () {
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var backBtn = document.getElementById('deck-back');
  var nextBtn = document.getElementById('deck-next');
  var restartBtn = document.getElementById('deck-restart');
  var dotsWrap = document.getElementById('deck-dots');
  var count = document.getElementById('deck-count');
  var total = pages.length;
  var current = 0;

  pages.forEach(function () {
    var dot = document.createElement('span');
    dot.className = 'progress-dot';
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll('.progress-dot');

  function showPage(index) {
    current = Math.max(0, Math.min(total - 1, index));
    pages.forEach(function (page, i) {
      page.hidden = i !== current;
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('done', i < current);
      dot.classList.toggle('active', i === current);
    });
    count.textContent = (current + 1) + ' / ' + total;

    backBtn.classList.toggle('is-hidden', current === 0);
    backBtn.disabled = current === 0;
    // Last slide: "Start over" (secondary) replaces Next, as on the old recap page.
    var last = current === total - 1;
    nextBtn.hidden = last;
    restartBtn.hidden = !last;
  }

  backBtn.addEventListener('click', function () { showPage(current - 1); });
  nextBtn.addEventListener('click', function () { showPage(current + 1); });
  restartBtn.addEventListener('click', function () { showPage(0); });

  showPage(0);
});

// Five-moves accordions: tap a header to reveal its description.
// Only one item per accordion stays open at a time.
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

// Quick MCQs (one per slide): tap an option to select it and reveal one line
// of feedback in the space reserved for it. In-memory state only.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mcq-group').forEach(function (group) {
    var options = group.querySelectorAll('.mcq-option');
    var feedback = group.querySelector('.mcq-feedback');
    feedback.setAttribute('aria-live', 'polite');
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
