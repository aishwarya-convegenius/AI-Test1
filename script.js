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
