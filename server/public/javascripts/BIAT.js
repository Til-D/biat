// Sequence (odd groupnumbers):
// 1. Short Block1 (hypothesis-consistent) 
// 2. Short Block2 (hypothesis-inconsistent)
// 3. Long Block (hypothesis consistent)
// 4. Long Block (hypothesis inconsistent)
// 3. Long Block (hypothesis consistent)* (the last two blocks are skipped if parameters.extended = false)
// 4. Long Block (hypothesis inconsistent)

// In all Test Blocks:
// * attributes and targets alternate
// * attributes  as well as targets are randomly selected without replacement
// * short blocks run 14 trials; experimental blocks run 20 trials by default
// * the first 4 trials = prefatory trials that are not included into subsequent analyses

// NOTE: if a participant goes through a sequence of BIATs the short blocks 
// short_a & short_b only need to be run for the very first BIAT in the sequence.
// Short Blocks are simply shorter versions (only 4 prefatory trial + 8 trials) of the longer Experimental Blocks. 
// They are intended as practice blocks as participants tend to be slower 
// during the first two blocks of a BIAT. They are not included into further data analyses.

// ************************************
// Short Blocks
// ************************************

// Note:
// Short Blocks are simply shorter versions (only 4 prefatory trial + 8 trials) of the longer Experimental Blocks. 
// They are intended as practice blocks as participants tend to be slower 
// during the first two blocks of an BIAT. They are not included into further data analyses.

// <block short_a>
// / onblockbegin = [values.currentTarget = item.targetALabel.1; text.topFocusInstruct.1 = item.targetAFocusInstruct.1]
// / trials = [1=testInstructions; 2=showLabels;
//   3-6 = noreplace(targetARight, targetBLeft);
//   8,10,12,14 = noreplace(targetARight, targetBLeft);
//   7,9,11,13 = noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>

// <block short_b>
// / onblockbegin = [values.currentTarget = item.targetBLabel.1; text.topFocusInstruct.1 = item.targetBFocusInstruct.1]
// / trials = [1=testInstructions; 2=showLabels;
//   3-6 = noreplace(targetBRight, targetALeft);
//   8,10,12,14 = noreplace(targetBRight, targetALeft);
//   7,9,11,13 = noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>

// ************************************
// Experimental Blocks
// ************************************
// Note:
// * experimental blocks run 20 trials by default
// * the first 4 trials = prefatory trials that are not included into subsequent analyses

// <block A>
// / skip = [parameters.extended == false && block.A.totalcount >=1]
// / onblockbegin = [values.currentTarget = item.targetALabel.1; text.topFocusInstruct.1 = item.targetAFocusInstruct.1]
// / trials = [1=testInstructions; 2=showLabels;
//   3-6 = noreplace(targetARight, targetBLeft);
//   8,10,12,14,16,18,20,22 = noreplace(targetARight, targetBLeft);
//   7,9,11,13,15,17,19,21 = noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>

// <block B>
// / skip = [parameters.extended == false && block.B.totalcount >=1]
// / onblockbegin = [values.currentTarget = item.targetBLabel.1; text.topFocusInstruct.1 = item.targetBFocusInstruct.1]
// / trials = [1=testInstructions;2=showLabels;
//   3-6 = noreplace(targetBRight, targetALeft);
//   8,10,12,14,16,18,20,22= noreplace(targetBRight, targetALeft);
//   7,9,11,13,15,17,19,21= noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>


// Block A:
// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1sum =  values.A1sum + block.A.latency]
// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1n += 1]
// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1ss =  values.A1ss  + (block.A.latency * block.A.latency)]
// / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2sum =  values.A2sum + block.A.latency]
// / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2n += 1]
// / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2ss =  values.A2ss  + (block.A.latency * block.A.latency)]
// / ontrialend = [if (block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.n_correct += block.a.correct]

// Block B:
// / ontrialend = [if (block.B.totalcount == 0 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B1sum =  values.B1sum + block.B.latency]
// / ontrialend = [if (block.B.totalcount == 0 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B1n +=  1]
// / ontrialend = [if (block.B.totalcount == 0 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B1ss =  values.B1ss  + (block.B.latency * block.B.latency)]
// / ontrialend = [if (block.B.totalcount == 1 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B2sum =  values.B2sum + block.B.latency]
// / ontrialend = [if (block.B.totalcount == 1 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B2n +=  1]
// / ontrialend = [if (block.B.totalcount == 1 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B2ss =  values.B2ss  + (block.B.latency * block.B.latency)]
// / ontrialend = [if (block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.n_correct += block.B.correct]


// CONSTANTS
const KEYCODE_SPACEBAR = 32;
const KEYCODE_RIGHT = 107;
const KEYCODE_LEFT = 100;
const RESPONSE_TIMEOUT = 10000;
const MIN_RESPONSE_TIME = 200;
const ATTITUDE_POS = 'Good';
const ATTITUDE_NEG = 'Bad';
const STIMULUS_TYPE_ATTRIBUTE = 'attribute';
const STIMULUS_TYPE_ATTITUDE = 'attitude';
const BLOCKS_PER_BIAT = 4;
const IMG_PATH = 'images/';

var biatActive = false;
var spacekeyActive = false;

var startTime, endTime;
var completed = 0; // 0 = script was not completed; 1 = script was completed (all conditions run)
var A1sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the first compatible block A1 (excludes prefatory ones)
var A2sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the second compatible block A2 (excludes prefatory ones)
var B1sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the first incompatible block B1 (excludes prefatory ones)
var B2sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the second incompatible block B2 (excludes prefatory ones)
// Note: by design, all final trial responses are correct (regardless of accuracy of initial response)

var A1n = 0; //	counts the number of trials in first compatible block A1 (excludes prefatory ones)
var A2n = 0; //	counts the number of trials in second compatible block A2 (excludes prefatory ones)
var B1n = 0; //	counts the number of trials in first incompatible block B1 (excludes prefatory ones)
var B2n = 0; //	counts the number of trials in second incompatible block B2 (excludes prefatory ones)

var A1ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the first compatible block A1 (excluding prefatory trials)
var A2ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the second compatible block A1 (excluding prefatory trials)
var B1ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the first incompatible block B1 (excluding prefatory trials)
var B2ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the second incompatible block B2 (excluding prefatory trials)

var magnitude = "";     // stores the magnitude of the implicit preference: "little to no", "a slight", "a moderate", "a strong"
var preferred = "";     // stores the preferred target category
var notpreferred = "";  // stores the non preferred target category
var currentTarget = ""; // stores the current target stimulus
var n_correct = 0;     // counts all initial correct responses of all trials that count towards D score

var A1m = 0;                    // mean latencies of correct responses in first compatible block A1
var A2m = 0;                    // mean latencies of correct responses in second compatible block A2
var B1m = 0;                    // mean latencies of correct responses in first incompatible block B1
var B2m = 0;                    // mean latencies of correct responses in second incompatible block B2
var A1sd = 0;                   // standard deviation of latencies of correct responses in first compatible block A1
var A2sd = 0;                   // standard deviation of latencies of correct responses in second compatible block A2
var B1sd = 0;                   // standard deviation of latencies of correct responses in first incompatible block B1
var B2sd = 0;                   // standard deviation of latencies of correct responses in second incompatible block B2
var sd1 = 0;                    // standarddeviation of latencies in first blocks
var sd2 = 0;                    // standarddeviation of latencies in second blocks
var d1 = 0;                     // D-score for first blocks	
var d2 = 0;                     // D-score for second blocks	
var d = 0;                      // overall D-score
var currentblocknumber = 0;     // stores the current block number
var totalblockcount = 0;        // counts the total blocks run
var percentcorrect = 0;         // the overall percent correct score of initial responses of test trials of D-score qualifying latencies

var warmup_round_enabled = true; //activates Flowers vs. Insects training round
var pre_study_mode = false;
var finished_page = '/mturk/grbs';

var settings;

// procedure: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0110938

// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.
//     =  values.A1sum + block.A.latency]
//    / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1n += 1]
//    / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1ss =  values.A1ss  + (block.A.latency * block.A.latency)]
//    / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2sum =  values.A2sum + block.A.latency]
//    / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2n += 1]
//    / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2ss =  values.A2ss  + (block.A.latency * block.A.latency)]
//    / ontrialend = [if (block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.n_correct += block.a.correct]


// TODO: change order based on group number!
// Note: 
// * counterbalanced by groupnumber
// * if a participant goes through a sequence of BIATs the short blocks 
// short_a & short_b only need to be run for the very first BIAT in the sequence

// <expt>
// / subjects = (1 of 2)
// / groupassignment = groupnumber
// / blocks = [1 = intro; 2= short_a; 3 = short_b; 4=A; 5=B; 6=A; 7=B; 8=summary]
// /onexptend = [values.completed = 1]
// </expt>

// <expt>
// / subjects = (2 of 2)
// / groupassignment = groupnumber
// / blocks = [1 = intro; 2= short_b; 3 = short_a; 4=B; 5=A; 6=B; 7=A; 8=summary]
// /onexptend = [values.completed = 1]
// </expt>

// Note: Put stimuli key (i.e., title) in the first array element. > not a good idea (Tilman)
// const STIMULI = {

//     // familiarization run
//     "Asian": ["Curry", "Karate", "Beijing", "Sony"], //"Ramen"
//     "American": ["Burger", "NFL", "Boston", "Microsoft"], //"Hollywood"

//     "Progressive": ["LGBTQ", "Multiculturalism", "Equality", "Opportunity"], // does this work in Australia? 
//     "Conservative": ["Tradition", "Stability", "Patriotism", "Responsibility"], // "Patriotism"

//     "Globalisation": ["Travel", "Markets", "Diversity", "Wealth"],

//     // Feminism / anti-feminism stimuli need more work
//     "Feminism": ["Empowerment", "Liberation", "Equality", "Progressive"], // "Harassment"
//     "Anti-feminism": ["Masculinity", "Housewife", "Traditional", "Family"],

//     "Veganism": ["Greens", "Tofu", "Produce", "Salad"], 
    
//     "Stoicism": ["Patience", "Calmness", "Acceptance", "Dispassion"], 
    
//     // Australian / Multiculturalism stimuli need more work. Are not necessarily opposites
//     "Australian": ["Footy", "Kangaroo", "Outback", "Aussie"], // > Asian or American
//     "Multiculturalism": ["Diversity", "Culture", "Chance", "International"],
    
//     // Man-made / Natural cycle climate change stimuli need more work.
//     "Man-made Climate Change": ["Emissions", "Consumerism", "Coal", "Drilling"], // "Traffic"
//     "Natural Climate Cycles": ["Natural", "Non-Sense", "Cycles", "Fearmongering"], // "Liberty"

//     "Flowers": ["Orchid", "Lily", "Violet", "Daisy"],
//     "Insects": ["Ant", "Locust", "Bee", "Wasp"]
// };
// const WARMUP_PAIR = ['Flowers', 'Insects'];
// const STIMULI_PAIRS = [['Feminism', 'Anti-feminism'], ['Progressive', 'Conservative'], ['Australian', 'Multiculturalism'], ['Man-made Climate Change', 'Natural Climate Cycles']]; //['Feminism', 'Anti-feminism'], ['Australian', 'Multiculturalism'], ['Man-made Climate Change', 'Natural Climate Cycles']];

// var attitudes = {};
//     attitudes[ATTITUDE_POS] = ["Wonderful", "Best", "Superb", "Excellent"]; //"Positive" ["Paradise", "Pleasure", "Cheer", "Wonderful"]
//     attitudes[ATTITUDE_NEG] = ["Awful", "Horrible", "Terrible", "Worst"]; //["Bomb", "Abuse", "Sadness", "Pain"]; //"Negative"

// Identity-related IAT
// "Self": ["I", "Mine", "My", "Myself", "Self"],
// "Other": ["Other", "Their", "Theirs", "Them", "They"]

var trainingInProgress;
var warmupInProgress;
var stimuliOrder;
var stimulusIndex;
var blockCounter;
var currentStimulusArray;
var readyToStart;
var stimuliPairs;
var data_object;

var focalKey;
var nonFocalKey;

var focalStimuli;
var nonFocalStimuli;
var img_stimuli_attributes;

var counter;
var wordListType;
var correctAttribute;
var correctAttitude;

var prefatoryTrail = true;
var ongoing = false;

var alldone = false;

var mturkset = typeof mturk !== typeof undefined;

// TODO: Post trial pause ?
// TODO: BIAT blocks ?

function initIATs(_settings) {
    console.log('+ initIATs()');
    settings = _settings;

    settings['version'] = VERSION;

    currentStimulusArray = [];
    stimulusIndex = 0;
    blockCounter = -1;
    readyToStart = false;
    stimuliPairs = STIMULI_PAIRS.slice();
    // wordListType = "";
    // correctAttribute = "";
    // correctAttitude = "";

    stimuliOrder = [];
    for(var i=0; i<stimuliPairs.length; i++) {
        stimuliOrder.push(i);
    }
    stimuliOrder =shuffle(stimuliOrder);

    if(warmup_round_enabled) {
        stimuliPairs.splice(0, 0, WARMUP_PAIR);
        for(var i=0; i<stimuliOrder.length; i++) {
            stimuliOrder[i]++;
        }
        stimuliOrder.splice(0, 0, 0);
        warmupInProgress = true;
    }

    console.log('-stimuliOrder: ');
    for(var i=0; i<stimuliOrder.length; i++) {
        console.log(i + ': ' + stimuliPairs[stimuliOrder[i]][0] + ' vs ' + stimuliPairs[stimuliOrder[i]][1]);
    }
}

// launches single IAT
function initIAT (_settings) {
    console.log('+ initIAT()');
    settings = _settings;

    console.log(settings);

    settings['version'] = VERSION;
    pre_study_mode = settings['pre_study_mode'];

    currentStimulusArray = [];
    stimulusIndex = 0;
    blockCounter = -1;
    readyToStart = false;

    stimuliOrder = [];
    if(settings['include_warmup']) {
        warmupInProgress = true;
        stimuliPairs = [WARMUP_PAIR];
        stimuliOrder = [0];
    } else {
        warmupInProgress = false;
        stimuliPairs = STIMULI_PAIRS.slice();
        stimuliOrder[0] = settings['biat'];
    }

    console.log('-stimuliOrder: ');
    for(var i=0; i<stimuliOrder.length; i++) {
        console.log(i + ': ' + stimuliPairs[stimuliOrder[i]][0] + ' vs ' + stimuliPairs[stimuliOrder[i]][1]);
    }
}

function resetDataLog() {
    console.log('+ resetDataLog()');

    data_object = {
        "blocks_per_biat": BLOCKS_PER_BIAT,
        "biat_stimuli_pairs": [],
        "biat_stimuli": {},
        "focal_latencies": [],
        "non_focal_latencies": [],
        "d_score": '',
        "preferred": '',
        "magnitude": ''
    };

    if(mturkset) {
        data_object['mturk']=true;
    }
}

function prepareWords(stimuliPair) {
    console.log('+ prepareWords() --with pair:');
    console.log(stimuliPair);
    
    // biatActive = true;

    // setAttributeStimuli
    // attributeKey1 = localAttributeStimuli1[0];
    // attributeKey2 = localAttributeStimuli2[0];
    // // remove first element (title) from array
    // localAttributeStimuli1.shift();
    // localAttributeStimuli2.shift();
    
    // randomise order or attitudes
    attitudesPositive = attitudes[ATTITUDE_POS];
    attitudesNegative = attitudes[ATTITUDE_NEG];

    // attributeStimuli = attributeStimuli1.concat(attributeStimuli2);

    // setAttitudeStimuli
    // focalKey = localAttitudeStimuli1[0];
    // nonFocalKey = localAttitudeStimuli2[0];
    // remove first element (title) from array

    // localAttitudeStimuli1.shift();
    // localAttitudeStimuli2.shift();
    
    // randomise order of category words
    // console.log(stimuliPairs);
    // console.log(stimuliPair)
    focalStimuli = shuffle(STIMULI[stimuliPair[0]]);
    nonFocalStimuli = shuffle(STIMULI[stimuliPair[1]]);

    // fill img stimuli array
    img_stimuli_attributes = [];
    if(IMAGE_STIMULI.indexOf(stimuliPair[0])>=0) {
        img_stimuli_attributes = img_stimuli_attributes.concat(STIMULI[stimuliPair[0]]).concat(stimuliPair[0]);
    }
    if(IMAGE_STIMULI.indexOf(stimuliPair[1])>=0) {
        img_stimuli_attributes = img_stimuli_attributes.concat(STIMULI[stimuliPair[1]]).concat(stimuliPair[1]);
    }
    // console.log('+ IMAGE STIMULI:');
    // console.log(img_stimuli_attributes);
    

    // console.log('stimulus collection ' + focalKey + ':');
    // console.log(focalStimuli);

    // console.log('stimulus collection ' + nonFocalKey + ':');
    // console.log(nonFocalStimuli);

    // categoryStimuli = attitudeStimuli1.concat(attitudeStimuli2);

    focalKey = stimuliPair[0];
    nonFocalKey = stimuliPair[1];

    currentStimulusArray = [];

    // prepare word array: currentStimulusArray
    if (trainingInProgress) { // Training: rand(2focal) + rand(2non-focal) + rand(remaining focals + remaining non-focals + pos/2 + neg/2)
        
        currentStimulusArray = currentStimulusArray.concat(selectRandomItems(focalStimuli, 2));
        currentStimulusArray = currentStimulusArray.concat(selectRandomItems(nonFocalStimuli, 2));

        // console.log('Top: ');
        // console.log(currentStimulusArray);

        // add remaining focals and non-focals
        var remainingStimuli = focalStimuli.concat(nonFocalStimuli);
        for(var i=0; i<currentStimulusArray.length; i++) {
            // console.log('remove: ' + currentStimulusArray[i]);
            remainingStimuli.splice(remainingStimuli.indexOf(currentStimulusArray[i].toString()), 1);
            // console.log(remainingStimuli);
        }
        
        // add (half) attributes
        var tail = remainingStimuli.concat(selectRandomItems(attitudesPositive, 2).concat(selectRandomItems(attitudesNegative, 2)));
        currentStimulusArray = currentStimulusArray.concat(shuffle(tail));

        console.log('stimuli array: ');
        console.log(currentStimulusArray);

    } else { // Test: rand(2focal) + rand(2non-focal) + rand(all), all: focals + non-focals + pos + neg

        currentStimulusArray = currentStimulusArray.concat(selectRandomItems(focalStimuli, 2));
        currentStimulusArray = currentStimulusArray.concat(selectRandomItems(nonFocalStimuli, 2));

        // console.log('Top: ');
        // console.log(currentStimulusArray);

        // add remaining focals and non-focals
        var allStimuli = focalStimuli.concat(nonFocalStimuli);
        
        // add attributes
        var tudes = attitudesPositive.concat(attitudesNegative);
        currentStimulusArray = currentStimulusArray.concat(shuffle(allStimuli.concat(tudes)));

        console.log('stimuli array: ');
        console.log(currentStimulusArray);
    }
}

const STATUS_COMPLETE = 'complete';			// indicates complete dataset on server
const STATUS_INCOMPLETE = 'incomplete';     
// const VERSION = '2.0'; 						// to keep track of changes affecting log file format

// *********************
// SCREEN Management
// *********************

function showIntroduction() {
    console.log('+ showIntroduction()');
    $(attributeStimuliCategory).text(focalKey);
    $(attitudeStimuliCategory).text(ATTITUDE_POS);

    // Set first instructions
    var instructions = "In this task, you will be instructed to <b>press the key 'K'</b> on your keyboard for all nouns or images representing <b>'" + focalKey.toUpperCase() + "'</b> and attitudes relating to <b>'" + ATTITUDE_POS + "'</b>. The <b>key 'D' on the left</b> is used for words representing <b>'" + nonFocalKey.toUpperCase() + "'</b> and attributes from <b>any other</b> category or attitude. You will go through <b>a total of " + (BLOCKS_PER_BIAT+1) + " blocks</b>. The first block will help you get used to the task format. Classify items as quickly as you can while making as few mistakes as possible. Going too slow or making too many mistakes will result in an uninterpretable score. It is OK to make an occasional mistake. If you press an incorrect key you will see a red 'X'. Rapidly correct the error by pressing <b>the other key</b>. <br /> <br /> <b>Press the spacebar to continue.</b>";
    $('.step_BIAT').show();
    $(BIAT_instructions).html(instructions);
    $(BIAT_instructions).show();
    spacekeyActive = true;
}

function showInstructions() {
    console.log('showInstructions()');
    var names;
    if(isImageStimulus(focalKey)) {
        var items = [];
        for(var i=0; i<focalStimuli.length; i++) {
            items.push(focalStimuli[i]['name']);
        }
        names = items.join(', ');
    } else {
        names = focalStimuli.join(', ');
    }
    $(attributeStimuliCategory).html(focalKey.toUpperCase() + "<br />" + names);
    $(attitudeStimuliCategory).html(ATTITUDE_POS.toUpperCase() + "<br />" + attitudesPositive.join(', '));

    var instructions = "This is block " + (blockCounter+1) + " out of " + (BLOCKS_PER_BIAT+1) + ".<br /><br />";
    instructions += " Press the right 'K' key on your keyboard for " + focalKey.toUpperCase() + " or " + ATTITUDE_POS.toUpperCase() + ". <br /> Press the left 'D' key on your keyboard for anything else.<br /><br />Go as fast as you can.<br /><br />";
    if(trainingInProgress) {
        instructions += "<p>This first round is a training round.</p>";
    }
    instructions += '<b>Press the space bar to begin.</b>';
    $('.step_BIAT').show();
    $(BIAT_instructions).html(instructions);
    $(BIAT_instructions).show();
    spacekeyActive = true;

    readyToStart = true;
}

function showFinishScreen() {
    console.log('+ showFinishScreen()');

    // var scoreStatement = "Your BIAT score (D) was " + d + ", which suggests " + magnitude + " automatic preference for " + preferred + " compared to " + notpreferred + ".";
    // console.log(scoreStatement)

    // var instructions = "Congratulations! You have made it through all assessments. Your score would be displayed here if implemented.";
    // $(BIAT_instructions).html(instructions);
    // $(BIAT_instructions).show();
    $(".step_BIAT").hide();
    $(".step_pre_study_thanks").show();

}

function showMturkFinishScreen() {
    window.location.href = finished_page + '?pId=' + settings['participant_id'];
}

function showWarmupFinishScreen() {
    console.log('+ showWarmupFinishScreen()');

    $(".step_BIAT").hide();
    $(".alert").hide();
    $('.step_pre_study_warmup_done').show();
}

function showBIATPairEvaluation() {

    calculateScore();

    focalKey = stimuliPairs[stimuliOrder[stimulusIndex-1]][0];
    nonFocalKey = stimuliPairs[stimuliOrder[stimulusIndex-1]][1];
    focalStimuli = STIMULI[focalKey];
    nonFocalStimuli = STIMULI[nonFocalKey];

    $('#focalKey').val(focalKey);
    $('#nonFocalKey').val(nonFocalKey);
    $('#focalAttributes').val(focalStimuli);
    $('#nonfocalAttributes').val(nonFocalStimuli);

    $('.step_BIAT').hide();
    $('.stimulus_pair').html(getStimulusKeys());

    $('.attribute_focal_category').html(focalKey);

    var names;
    if(isImageStimulus(focalKey)) {
        var items = [];
        for(var i=0; i<focalStimuli.length; i++) {
            items.push(focalStimuli[i]['name']);
        }
        names = items.join(', ');
    } else {
        names = focalStimuli.join(', ');
    }
    $('.attribute_focal_stimuli').html(names);

    if(isImageStimulus(nonFocalKey)) {
        var items = [];
        for(var i=0; i<nonFocalStimuli.length; i++) {
            items.push(nonFocalStimuli[i]['name']);
        }
        names = items.join(', ');
    } else {
        names = nonFocalStimuli.join(', ');
    }
    $('.attribute_nonfocal_category').html(nonFocalKey);
    $('.attribute_nonfocal_stimuli').html(names);

    //init likert-style scale
    $(".likert").slider({
        max: 7,
        min: 1,
        step: 1,
        value: 4,
        slide:function(event,ui) {
            console.log('slider moved: log this to see whether user has consciously set a value');
        }
    });

    //reset text fields
    $('#focal_blacksheep').val('');
    $('#focal_wishlist').val('');
    $('#nonfocal_blacksheep').val('');
    $('#nonfocal_wishlist').val('');
    $('#feedback_BIAT_pairs').val('');

    $('#attribute_self_assessment').attr('data-focalkey', focalKey);
    $('#attribute_self_assessment').attr('data-nonfocalkey', nonFocalKey);

    $('.pre_study_evaluation').show();   

}

// *********************
// Log Management
// *********************

function create_data_log(settings, data, status) {
    return {
        'settings': settings,
        'data': data,
        'status': status
    }
}

function write_data_to_server(settings, data, status) {

    data = create_data_log(settings, data, status);

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
}

function getStimulusKeys() {
    return focalKey + '/' + nonFocalKey;
}

// *********************
// BIAT Management
// *********************

// initializes particular BIAT with stimulusA=focal and stimulusB=non-focal
function initBIAT(stimulusA, stimulusB, training=false) {
    console.log('+ initBIAT(): ' + stimulusA + '/' + stimulusB + ' (training: ' + training + ')');
    // $(BIAT_explanation).hide();

    trainingInProgress = training;
    $(BIAT_test).show();

    // if (settings['experiment_group'] == 1) {

        //TODO: continue here: stimuliPairs not initialized??>?????????????????????
        // console.log('lulu');
        // console.log(stimuliPairs);
    prepareWords([stimulusA, stimulusB]); //stimuliPairs[stimulusIndex]); //stimuli["Good"], stimuli["Bad"], stimuli[stimulusA], stimuli[stimulusB]);

    // } else if (settings['experiment_group'] == 2) {
        // prepareWords(stimuli["Good"], stimuli["Bad"], stimuli[stimulusB], stimuli[stimulusA]);
    // }

    if(!training && !warmupInProgress) {
        if(data_object['biat_stimuli'][getStimulusKeys()]) {
            data_object['biat_stimuli'][getStimulusKeys()].push(currentStimulusArray);
        } else {
            data_object['biat_stimuli'][getStimulusKeys()] = [currentStimulusArray];
        }
    }
    data_object['biat_start_ts'] = Date.now();
    // data_object['biat_stimuli_pairs'].push(currentStimulusArray);
}

// starts a particular BIAT
function startBIAT() {
    $("#step_BIAT_header").hide();
    $(BIAT_instructions).hide();

    $(attributeStimuliCategory).text(focalKey);
    $(attitudeStimuliCategory).html(ATTITUDE_POS.toUpperCase())

    biatActive = true;
    readyToStart = false;
    counter = -1;
    nextWord();
}

function nextWord() {

    console.log('+ nextWord()');
    counter+=1;

    $(BIAT_img_stimulus).hide();
    $(BIAT_word).hide();
    $(".alert").hide();

    if(counter<currentStimulusArray.length) {

        var next = currentStimulusArray[counter];

        if(isImageStimulus(currentStimulusArray[counter])) {
            var imgPath = IMG_PATH + currentStimulusArray[counter]['img'];
            console.log('-loading img: ' + imgPath);
            $(BIAT_img_stimulus).attr('src', imgPath);
            $(BIAT_img_stimulus).show();
        } else {
            $(BIAT_word).text(currentStimulusArray[counter]);
            $(BIAT_word).show();
        }

        start = new Date();

        $('#BIAT_word').removeClass();

        console.log('stimulus type: ' + getStimulusType());

        if (getStimulusType() == STIMULUS_TYPE_ATTRIBUTE) {
            $('#BIAT_word').addClass('attributeClass');
        } else { //attitude
            $('#BIAT_word').addClass('attitudeClass');
        }
        
        console.log('+ ' + next);
    } else {

        biatActive = false;
        data_object['biat_finished_ts'] = Date.now();
        nextBlock();

    }
    startTime = Date.now();
}

function launchIATIntroduction() {
    console.log(' + launchIATIntroduction()');

    nextBlock();
}

// manages BIAT blocks
function nextBlock() {

    blockCounter++;
    console.log('+ nextBlock(): (blockCounter: ' + blockCounter + ', warmupInProgress: ' + warmupInProgress + ', pre_study_mode: ' + pre_study_mode + ')' );

    // if(warmupInProgress && pre_study_mode) { //pre_study warmup done

    //     // remove warmup pair from stimuli array
    //     stimuliPairs.shift();
    //     spacekeyActive = false;
    //     showWarmupFinishScreen();

    // } else {

    // warmupInProgress = false;

    if(blockCounter==0) { // init training block

        resetDataLog();
        initBIAT(stimuliPairs[stimuliOrder[stimulusIndex]][0], stimuliPairs[stimuliOrder[stimulusIndex]][1], training=true);

        showIntroduction();
        // if(pre_study_mode) {
        //     showIntroduction();
        // } else {
        //     showInstructions();
        // }

    } else if(blockCounter <= BLOCKS_PER_BIAT) {

        if(!trainingInProgress && !warmupInProgress) {
            write_data_to_server(settings, data_object, STATUS_INCOMPLETE);
        }

        if(blockCounter % 2 == 0) { 
            initBIAT(stimuliPairs[stimuliOrder[stimulusIndex]][1], stimuliPairs[stimuliOrder[stimulusIndex]][0], training=false);
        } else { 
            initBIAT(stimuliPairs[stimuliOrder[stimulusIndex]][0], stimuliPairs[stimuliOrder[stimulusIndex]][1], training=false);
        }
            
        showInstructions(); 

    } else { //next stimulus

        stimulusIndex++;
        if(stimulusIndex < stimuliOrder.length) {

            // trainingInProgress = false;
            // initBIAT(stimuliPairs[stimuliOrder[stimulusIndex]][0], stimuliPairs[stimuliOrder[stimulusIndex]][1], training=true);
            blockCounter = -1;
            
            // TODO: show survey
            if(mturkset && !warmupInProgress) {
                spacekeyActive = false;
                calculateScore();
                if(!warmupInProgress) {
                    write_data_to_server(settings, data_object, STATUS_COMPLETE);
                }
                showBIATPairEvaluation();
            } else {
                warmupInProgress = false;
                nextBlock();
            }
            // showInstructions(); 
            
        } else {
            // Todo: FINISH Screen
            console.log('all BIATS finished');
            spacekeyActive = false;
            
            calculateScore();
            write_data_to_server(settings, data_object, STATUS_COMPLETE);

            if(pre_study_mode || mturkset) {

                alldone = true;
                showBIATPairEvaluation();

            } else {
            
                showFinishScreen();

            }

        }

    }

    // }

    if(!trainingInProgress) {
        //init data_object
        data_object['biat_stimuli_pairs'].push(getStimulusKeys());
        // if(!data_object['focal_latencies'][getStimulusKeys()]) {
        //     data_object['focal_latencies'][getStimulusKeys()] = {};
        // }
        // if(!data_object['non_focal_latencies'][getStimulusKeys()]) {
        //     data_object['non_focal_latencies'][getStimulusKeys()] = {};
        // }
        // if(!data_object['d_scores'][getStimulusKeys()]) {
        //     data_object['d_scores'][getStimulusKeys()] = {};
        // }

    } else {
        console.log('training in progress: no logging');
    }

    console.log('data log:');
    console.log(data_object);
}

function calculateLatency() {
    
    // console.log('--calculateLatency()');

    endTime = Date.now();

    // console.log('+ startTime: ' + startTime);
    // console.log('+ endTime: ' + endTime);
    var timeDiff = endTime - startTime;
    // console.log('+ timeDiff: ' + timeDiff);

    //TODO: calculate d score correctly
    if (timeDiff < RESPONSE_TIMEOUT && timeDiff > MIN_RESPONSE_TIME) {
        // TODO: Add condition configuration (if isEven && condA..)
        if (blockCounter == 1) {
            // block A1
            A1sum += timeDiff;
            A1n++;
            A1ss = A1ss + (timeDiff * timeDiff);
        } else if (blockCounter == 2) {
            // block B1
            B1sum += timeDiff;
            B1n++;
            B1ss = B1ss + (timeDiff * timeDiff);
        } else if (blockCounter == 3) {
            // block A2
            A2sum += timeDiff;
            A2n++;
            A2ss = A2ss + (timeDiff * timeDiff);
        } else if (blockCounter == 4) {
            // block B2
            B2sum += timeDiff;
            B2n++;
            B2ss = B2ss + (timeDiff * timeDiff);
        }
    } else {
        //invalid response time

    }

    // reset for next round
    startTime = Date.now();

    return timeDiff;
}

function calculateScore() {

    console.log('+ calculateScore()');

    // compute the standard deviation of all latencies (across block 1 and 2), SD.
    var s_pairs = data_object['biat_stimuli_pairs'],
        all_latencies,
        standard_dev,
        mean_condition_1,
        mean_condition_2,
        d_score,
        condition_1_latencies = [], //hypothesis
        condition_2_latencies = [], //anti-thesis
        preferred,
        non_preferred;

    // for(var i=0; i<data_object['focal_latencies'].length; i++) {
    //     if(f_latencies){
    //         f_latencies = f_latencies.concat(data_object['focal_latencies'][i]);
    //     } else {
    //         f_latencies = data_object['focal_latencies'][i];
    //     }

    //     if(nf_latencies) {
    //         nf_latencies = nf_latencies.concat(data_object['non_focal_latencies'][i]);
    //     } else {
    //         nf_latencies = data_object['non_focal_latencies'][i];
    //     }
    // }

    console.log('data_object');
    console.log(data_object);

    //select all blocks where focals meet hypothesis (i.e., odd blocks (1, 3, ...))

    for(var i=1; i<=data_object['blocks_per_biat']; i++) { //block counter starts with 1, 0=warmup
        if(i%2==1) {
            condition_1_latencies = data_object['focal_latencies'][i].concat(data_object['non_focal_latencies'][i]);
        } else {
            condition_2_latencies = data_object['focal_latencies'][i].concat(data_object['non_focal_latencies'][i]);
        }
    }

    all_latencies = condition_1_latencies.concat(condition_2_latencies);
    standard_dev = standardDeviation(all_latencies);

    // M1 is the mean of the latencies in condition 1 
    mean_condition_1 = average(condition_1_latencies);

    // M2 is the mean of the latencies in condition 2 
    mean_condition_2 = average(condition_2_latencies);

    // Calculate d-score: D=(M2-M1)/SD
    d_score = (mean_condition_2 - mean_condition_1) / standard_dev;

    console.log('condition_1_latencies');
    console.log(condition_1_latencies);

    console.log('condition_2_latencies');
    console.log(condition_2_latencies);

    console.log('all_latencies');
    console.log(all_latencies);

    console.log('standard_dev: ' + standard_dev);

    console.log('mean_condition_1: ' + mean_condition_1);

    console.log('mean_condition_2: ' + mean_condition_2);

    console.log('d_score: ' + d_score);

    // A1m = A1sum / A1n; //avg latency, block 1
    // A2m = A2sum / A2n;
    // B1m = B1sum / B1n;
    // B2m = B2sum / B2n;
    // A1sd = Math.sqrt((A1ss - (A1n * (A1m * A1m))) / (A1n - 1));
    // A2sd = Math.sqrt((A2ss - (A2n * (A2m * A2m))) / (A2n - 1));
    // B1sd = Math.sqrt((B1ss - (B1n * (B1m * B1m))) / (B1n - 1));
    // B2sd = Math.sqrt((B2ss - (B2n * (B2m * B2m))) / (B2n - 1));

    // sd1 = Math.sqrt((((A1n - 1) * (A1sd * A1sd) + (B1n - 1) * (B1sd * B1sd)) + ((A1n + B1n) * ((A1m - B1m) * (A1m - B1m)) / 4)) / (A1n + B1n - 1));
    // sd2 = Math.sqrt((((A2n - 1) * (A2sd * A2sd) + (B2n - 1) * (B2sd * B2sd)) + ((A2n + B2n) * ((A2m - B2m) * (A2m - B2m)) / 4)) / (A2n + B2n - 1));
    // d1 = (B1m - A1m) / sd1
    // d2 = (B2m - A2m) / sd2
    // // d = if ( parameters.extended ) { (d1+d2) / 2 } else { d1 }
    // d = (d1 + d2) / 2;

    // console.log("A1m " + A1m);
    // console.log("A2m " + A2m);
    // console.log("B1m " + B1m);
    // console.log("B2m " + B2m);
    // console.log("A1sd " + A1sd);
    // console.log("A2sd " + A2sd);
    // console.log("B1sd " + B1sd);
    // console.log("B2sd " + B2sd);
    // console.log("sd1 " + sd1);
    // console.log("sd2 " + sd2);
    // console.log("d1 " + d1);
    // console.log("d2 " + d2);
    // console.log("d " + d);

    magnitude = "little to no";
    if (Math.abs(d_score) > 0.15) {
        magnitude = "a slight";
    }
    if (Math.abs(d_score) > 0.35) {
        magnitude = "a moderate";
    }
    if (Math.abs(d_score) >= 0.65) {
        magnitude = "a strong";
    }


    if (d_score >= 0.0) {
        console.log('FOCAL WINS');
        preferred = stimuliPairs[stimuliOrder[stimulusIndex-1]][0];; 
        non_preferred = focalKey = stimuliPairs[stimuliOrder[stimulusIndex-1]][1];;
    } else { //if (d < 0.0) {
        console.log('NON_FOCAL WINS');
        preferred = stimuliPairs[stimuliOrder[stimulusIndex-1]][1];;
        non_preferred = stimuliPairs[stimuliOrder[stimulusIndex-1]][0];;
    }

    console.log('preferred: ' + preferred);
    console.log('non_preferred: ' + non_preferred);
    console.log('magnitude: ' + magnitude);

    data_object["d_score"] = d_score;
    data_object["preferred"] = preferred;
    data_object["magnitude"] = magnitude;

    // console.log('final data_object:');
    // console.log(data_object);

    $('#result').html('Done! You seem to have <strong>' + data_object["magnitude"] + '</strong> preferrence for <strong>' + data_object["preferred"] + '</strong> with a d-score of: ' + round(data_object["d_score"], 2));
}

// checks current stimulus/attribute and returns whether user classification is correct
function evaluateClassification(keycode) {
    
    var currentStim = currentStimulusArray[counter];
    
    console.log('evaluateClassification: ' + currentStim + ' (' + keycode + ')');

    //check if currentStim is in attitudesPositive or focalStimuli
    if (keycode===KEYCODE_LEFT) { //non-focal or bad

        return !isFocal(currentStim); //(attitudesPositive.indexOf(currentStim)==-1 && focalStimuli.indexOf(currentStim)==-1);

    } else if (keycode==KEYCODE_RIGHT) { //focal or good

        return isFocal(currentStim);

    }
}

//returns STIMULUS_TYPE_ATTRIBUTE or STIMULUS_TYPE_ATTITUDE according to classification
function getStimulusType() {

    var currentStim = currentStimulusArray[counter];

    if(focalStimuli.concat(nonFocalStimuli).indexOf(currentStim)>=0) {
        return STIMULUS_TYPE_ATTRIBUTE
    } else {
        return STIMULUS_TYPE_ATTITUDE
    }
}

//returns whether current stimulus is focal attribute/attitude
function isFocal(stimulus) {

    return (attitudesPositive.indexOf(stimulus)>=0 || focalStimuli.indexOf(stimulus)>=0);

}

// checks whether stimuli are images or words
function isImageStimulus(stimulus) {

    if(img_stimuli_attributes.indexOf(stimulus)>=0) {
        console.log('+ isImageStimulus(' + stimulus + '): true');
        return true;
    } else {
        console.log('+ isImageStimulus(' + stimulus + '): false');
        return false;
    }
}

// here we go
$( document ).ready(function() {

    // Listen for key input
    $(document).keypress(function (e) {
        // console.log("wordListType " + wordListType);
        // check which side is correct
        
        switch (e.keyCode) {
            case KEYCODE_SPACEBAR:
                // 'Spacebar' pressed - go to next page if on an instruction page
                if(spacekeyActive) {
                    if (!biatActive) {
                        if(readyToStart) {
                            startBIAT();
                        } else {
                            showInstructions();
                        }

                    } else {
                        console.log('Biat active');
                    }
                }
                break;

            case KEYCODE_LEFT:
                if (biatActive) {
                    // 'D'-key pressed - check whether answer is correct

                    if(evaluateClassification(KEYCODE_LEFT)) { // correct classification

                        if(!trainingInProgress && counter>=4) { //prefatory trail, no logging
                            
                            // log 
                            var timediff = calculateLatency();

                            // console.log('timediff: ' + timediff);

                            // console.log("LULU");
                            // console.log(data_object['non_focal_latencies']);
                            if(data_object['non_focal_latencies'][blockCounter]) {
                                // console.log(blockCounter + ' exists.');
                                data_object['non_focal_latencies'][blockCounter].push(timediff);
                            } else {
                                // console.log(blockCounter + ' not exists.');
                                data_object['non_focal_latencies'][blockCounter] = [timediff];
                            }
                            // console.log(data_object['non_focal_latencies']);
                            // console.log("EXIT LULU");

                        }
                        nextWord();

                    } else { // incorrect classification
                        
                        $(".alert").html('X');
                        $(".alert").show();

                    }
                }
                break;

            case KEYCODE_RIGHT:
                if (biatActive) {
                    // 'K'-key pressed - check whether answer is correct

                    if(evaluateClassification(KEYCODE_RIGHT)) { // correct classification

                        if(!trainingInProgress && counter>=4) { //prefatory trail, no logging

                            // log 
                            var timediff = calculateLatency();

                            if(data_object['focal_latencies'][blockCounter]) {
                                data_object['focal_latencies'][blockCounter].push(timediff);
                            } else {
                                data_object['focal_latencies'][blockCounter] = [timediff];
                            }
                        }
                        nextWord();

                    } else { // incorrect classification
                        
                        $(".alert").html('X');
                        $(".alert").show();

                    }
                }
                break;
        }
    });
});