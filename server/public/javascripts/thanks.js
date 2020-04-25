$(document).ready(function() {

	get = [];
	location.search.replace('?', '').split('&').forEach(function (val) {
	    split = val.split("=", 2);
	    get[split[0]] = split[1];
	});
    
    var code_string;
    if(get["pId"]) {
    	code_string  = survey_code + '_' + get["pId"];
    } else {
		code_string  = survey_code;
    }

    // reveal surveycode
    $('.mturk_code').html(code_string);
});




