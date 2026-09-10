// Two-screen pagination: Next/Back swap which .page is visible and
// update the progress dots. Purely visual, in-memory state only.
document.addEventListener('DOMContentLoaded', function () {
  var pages = document.querySelectorAll('.page');
  var dots = document.querySelectorAll('.progress-dot');
  var nextBtn = document.getElementById('next-btn');
  var backBtn = document.getElementById('back-btn');

  function showPage(index) {
    pages.forEach(function (page, i) {
      page.hidden = i !== index;
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { showPage(1); });
  if (backBtn) backBtn.addEventListener('click', function () { showPage(0); });
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
