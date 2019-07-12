/* functions */

/* randomly shuffle an array */

function shuffle(array) {
	var top = array.length,
		tmp, current;

	if (top) {
		while (--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}
	}

	return array;
}

// returns n random elements from a given array
function selectRandomItems(array, num) {
    // console.log("selectRandomItems(): " + num);

    // create array copy
    var arr = array.slice();
    var items = []
    if(arr.length > num) {
        
        while(num>0) {
            items.push(arr.splice([Math.floor(Math.random()*items.length)], 1)[0]);
            num-=1;
        }
        
        return items;
    } else {
        console.log("WARNING: array only has " + array.length + " items (" + num + " requested)");
        return shuffle(arr);
    }
}

function isEven(num) {
    return (num % 2) == 0;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* create an array of pairs. formula: n! / ( (n - k)! * k! ) */

function pair_combinator(array) {

	var length = array.length,
		result = [],
		counter = 0,
		i, j;

	for (i = 0; i < length; i++) {
		for (j = i; j < length - 1; j++) {
			result[counter] = shuffle([[array[i][0], array[i][1]], [array[j + 1][0], array[j + 1][1]]]);
			counter++;
		}
	}

	return shuffle(result);

}

/* creates an array with a given length and fills it up with a given value */

function new_filled_array(length, value) {
	var array = new Array(length);
	while (--length >= 0) {
		array[length] = value;
	}
	return array;
}

function update_info() {
	// console.log("updating info");
	$(".info").remove();
	$("<ul class='info'><li><strong>Participant:</strong> " + settings['participant_id'] + "</li><li><strong>Group:</strong> " + settings['experiment_group'] + "</li><li><strong>Round:</strong> " + current_round + "</li></ul>").insertAfter("h2");
}

$(document).ready(function () {

	/* constants & variables */

	const STATUS_COMPLETE = 'complete';			// indicates complete dataset on server
	const STATUS_INCOMPLETE = 'incomplete';
	const VERSION = '1.0'; 						// to keep track of changes affecting log file format

	var random_pairs,
		data_object,
		counter,
		pairs_length,
		demands = [
			["md", "Mental demand"],
			["pd", "Physical demand"],
			["td", "Temporal demand"],
			["pe", "Performance"],
			["ef", "Effort"],
			["fr", "Frustration"]
		],
		tableoutput = "",
		no_score = "–",
		weighted_tlx = false,
		total_rounds = 6,
		current_round = 1,
		DEBUG = false,
		settings = {},
		enforce_user_input = false,
		pre_study_mode = true;

	/* hide future steps */
	// $(".step_BIAT, .step_1, .step_2, .step_3, .step_4, .step_5, .step_6, .step_7, .step_open_questions, .alert").hide();

	if(DEBUG) { //skip intros
		settings['participant_id'] = 'test_participant';
		settings['experiment_group'] = 1;
		$(".step_start").hide();
		initIATs(settings);
		launchIATIntroduction();
	} else if(pre_study_mode) {

		//populate BIAT Selection
		$.each(STIMULI_PAIRS, function (i, item) {
		    $('#biat-selection-dropdown').append($('<option>', { 
		        value: i,
		        text : item[0] + ' / ' + item[1]
		    }));
		});

		$(".step_pre_study").show();	

	}
		else {
		
		/* step 0: Experiment SETTINGS */
		$(".step_start").show();	

	}

	$(".step_start").on("click", 'button', function () {

		if ($('#participant_id').val() != '') {
			settings['participant_id'] = $('#participant_id').val() + '_' +  Date.now();
		} else {
			settings['participant_id'] = 'anonymous_' + Date.now();
		}
		// settings['starting_task'] = $("input[name='starting_task']:checked").val();
		settings['experiment_group'] = $("input[name='experiment_group']:checked").val();

		if (enforce_user_input && (settings['participant_id'] == "" || settings['experiment_group'] == null)) {
			// do something 
			$(".alert").html('ERROR: some variables have not been set!');
			$(".alert").show();
		} else {
			$(".step_start").hide();
			$(".alert").hide();
			
			// show demographics
			$(".step_demographics").show();
		}
	});

	/* step 1: Demographics */

	$(".step_demographics button").click(function () {

		settings['age'] = $('#age').val();
		settings['gender'] = $("input[name='gender']:checked").val();
		settings['profession'] = $('#profession').val();

		if (enforce_user_input && (settings['age'] == "" || settings['gender'] == null || settings['profession'] == "")) {
			// do something 
			$(".alert").html('ERROR: some data has not been provided!');
			$(".alert").show();

		} else {
			
			$(".step_demographics").hide();
			$(".alert").hide();
			// $(".step_2").show();

			// start BIAT
			$(".step_BIAT").show();
			initIATs(settings);
			launchIATIntroduction();

		}
	});

	// PRE-STUDY
	$(".step_pre_study").on("click", '.btn-start', function () {

		if ($('#pre_study_participant_id').val() != '') {
			settings['participant_id'] = $('#pre_study_participant_id').val() + '_' +  Date.now();
		} else {
			settings['participant_id'] = 'anonymous_' + Date.now();
		}

		settings['age'] = $('#pre_study_participant_age').val();
		settings['gender'] = $("input[name='pre_study_gender']:checked").val();
		settings['profession'] = $('#pre_study_participant_background').val();
		settings['email'] = $('#pre_study_participant_email').val();
		settings['biat'] = $('#biat-selection-dropdown').val();
		// settings['include_warmup'] = $('#warmup-check').is(':checked');
		settings['pre_study_mode'] = true;

		if (settings['biat'] == "Choose...") {
			// do something 
			$(".alert").html('Please select a topic');
			$(".alert").show();
		
		} else {
		
		$(".step_pre_study").hide();
		$(".alert").hide();
			
		// start BIAT
		$(".step_BIAT").show();

			initIAT(settings);
			launchIATIntroduction();

		}

	});

	$(".step_pre_study").on("click", '.btn-warmup', function () {

		if ($('#pre_study_participant_id').val() != '') {
			settings['participant_id'] = $('#pre_study_participant_id').val() + '_' +  Date.now();
		} else {
			settings['participant_id'] = 'anonymous_' + Date.now();
		}

		settings['include_warmup'] = true;
		settings['pre_study_mode'] = true;
		
		$(".step_pre_study").hide();
		$(".alert").hide();
			
		// start BIAT
		$(".step_BIAT").show();

		initIAT(settings);
		launchIATIntroduction();

	});

	$(".step_pre_study_warmup_done").on("click", '.bth-restart', function () {

		settings['include_warmup'] = false;

		$(".step_pre_study_warmup_done").hide();
		$(".step_pre_study").show();

	});

	$(".pre_study_evaluation").on("click", 'button', function () {

		var feedback = {
			'focalKey': $('#focalKey').val(),
			'nonFocalKey': $('#nonFocalKey').val(),
			'focalAttributes': $('#focalAttributes').val(),
			'nonfocalAttributes': $('#nonfocalAttributes').val(),
			'attributeFocalCategoryFit': $('#attribute_focal_category_fit').slider("option", "value"),
			'focalBlacksheep': $('#focal_blacksheep').val(),
			'focal_wishlist': $('#focal_wishlist').val(),
			'attributeNonfocalCategoryFit': $('#attribute_nonfocal_category_fit').slider("option", "value"),
			'nonfocal_blacksheep': $('#nonfocal_blacksheep').val(),
			'nonfocal_wishlist': $('#nonfocal_wishlist').val(),
			'comment': $('#feedback_BIAT_pairs').val()
		}

		console.log("Feedback collected: ");
		console.log(feedback);
		
		$(".pre_study_evaluation").hide();
		$(".alert").hide();

		data = create_data_log(settings, feedback, 'feedback');

	    $.ajax({
	        type: "POST",
	        url: '/',
	        dataType: 'json',
	        contentType: "application/json",
	        data: JSON.stringify(data),
	        success: function (result, status, xhr) {
	            console.log("Dataset saved!");
	        },
	        error: function (xhr, status, error) {
	            console.log("Error when transmitting partial data!");
	        }
	    });
			
		$(".step_pre_study_thanks").show();

	});

	$(".step_pre_study_thanks").on("click", 'button', function () {
		
		$(".step_pre_study_thanks").hide();
		$(".alert").hide();

		// reset inputs
	    $('#focal_blacksheep').val('');
	    $('#focal_wishlist').val('');
	    $('#nonfocal_blacksheep').val('');
		$('#nonfocal_wishlist').val('');
		$('#feedback_BIAT_pairs').val('');
		$('#biat-selection-dropdown').val('Choose...');

		$(".step_pre_study").show();

	});

	// back button: currently not in use
	$(".step_demographics .go_back a").click(function () {
		$(".step_1 .cf p").remove();
		$(".step_1").hide();
		$(".step_0").show();
		return false;
	});

});