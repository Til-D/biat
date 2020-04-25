function create_data_log(settings, data, status) {
    return {
        'settings': settings,
        'data': data,
        'status': status
    }
}

function write_data_to_server_and_continue(settings, data, status) {
	console.log('sending data to server..');

    data = create_data_log(settings, data, status);

    $.ajax({
        type: "POST",
        url: '/',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result, status, xhr) {
            
            // data saved, next step:
			window.location.href='?pId='+participant_id+'&step='+nextStep;

        },
        error: function (xhr, status, error) {
            console.log("Error when transmitting partial data!");
        }
    });
}

$(document).ready(function() {

    var settings = {
		'participant_id': participant_id
	},
		data = {};

	// BUTTON NEXT
	$(".btn-ocean-next").on("click", '', function() {

		// check if all questions have been answered
		if($("input:checked").length==(nextStep-step)) {

			// collect and save responses
			$("input:checked").each(function(){
			   
			   data[this.name] = this.value;

			});

			settings['step'] = step;
			settings['nextStep'] = nextStep;

			write_data_to_server_and_continue(settings, data, status);

		} else {
			
			$(".alert").html('ERROR: Please fill in all statements to proceed!');
			$(".alert").show();

		}
	});
});




