$(document).ready(function () {
$('#dtOrderExample').DataTable({
columnDefs: [{
orderable: false,
targets: 3
}]
});
$('.dataTables_length').addClass('bs-select');
});