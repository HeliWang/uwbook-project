$(".hasclear").keyup(function () {
  var t = $(this);
  t.next('span').toggle(Boolean(t.val()));
});

$(".clearer").hide($(this).prev('input').val());

$(".clearer").click(function () {
  $(this).prev('input').val('').focus();
  $(this).hide();
});