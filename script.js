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

// "Your turn" practice boxes: live character count as the learner types.
// Purely visual, in-memory state only — nothing is saved or sent anywhere,
// so drafts reset whenever the page is reloaded.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('textarea[data-counter]').forEach(function (textarea) {
    var counter = document.getElementById(textarea.getAttribute('data-counter'));
    if (!counter) return;
    textarea.addEventListener('input', function () {
      var n = textarea.value.length;
      counter.textContent = n + (n === 1 ? ' character' : ' characters');
    });
  });
});

// "Check before use" checklist: click an item to mark it considered.
// Purely visual, in-memory state only — nothing is saved or sent anywhere,
// so the list resets to unchecked whenever the page is reloaded.
document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.checklist li');
  items.forEach(function (item) {
    item.setAttribute('role', 'checkbox');
    item.setAttribute('aria-checked', 'false');
    item.setAttribute('tabindex', '0');

    function toggle() {
      var isDone = item.classList.toggle('done');
      item.setAttribute('aria-checked', isDone ? 'true' : 'false');
    }

    item.addEventListener('click', toggle);
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});
