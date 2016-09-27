var studentList = $('.student-list').children();    //get children of unordered list (.student-list)
var studentListLength = studentList.length;   //get  length of student.list list item
var end;
var start;
var searchInput;

//Calculate number of pages needed
function pagination (listLength){
  var pagesNeeded = Math.ceil((listLength/10));   //divide length of student list by 10 (round up to nearest interger)
  return pagesNeeded;
}

//Add Page links
function paginationLinks (pages){
  pagination();   //run pagination function to get # of pages needed
  var newDiv = $('<div />').appendTo('body');       //add <div> after ul (.student-list)/append div to body
  newDiv.attr('class', 'pagination');   //add .pagination class to div
  var $pagesUl = $('<ul></ul>');    //create disembodied unordered list
  $pagesUl.addClass('pageLinks');   //add class to unordered list
  $('.pagination').append($pagesUl);    //append <ul> to .pagination div
  for (var i = 1; i <= pages; i++){    //add page links for number of pages needed  
    var $linkElement = $('<li></li>');    //create disembodied link item
    var $anchorElement = $('<a></a>');    //create disembodied anchor element
    $anchorElement.attr('href', '#');   //add href to anchor element
    if (i === 1){   //    make first anchor element class = 'selected'
      $anchorElement.addClass('selected');
    }
    $anchorElement.text(i);   //make i page number text in link
    $linkElement.append($anchorElement);    //append anchor element to list item               
    $('.pageLinks').append($linkElement);   //append <li> to <ul> of .pagination div
  }
}

//Page Links
function pageLinks (List) {
  $('.pageLinks li').on('click', function() {    //add eventhandler for page links
    $(this).siblings().removeClass('selected');   //remove selected class from other page links
    $(this).addClass('selected');   //add selected class to clicked <li>
    $('.student-item').removeClass('show').hide();   //remove show class from students and hides students
    studentPagination(List);    //calls function to iterate through students and show each set of 10 students
  });
}


// function to get start and end numbers for iterating only through set of students selected with page link
function startEndParameters (selectedStudents){     
  var selectedPage = $('.selected a').text();     //get page number
  var selectedPageNum = parseInt(selectedPage);       //page number into integer
  end = (selectedPageNum * 10);     //set ending number
  if (end > selectedStudents) {   //checks if not enough students to fill final page
    end = selectedStudents;   //makes end number total number of students
  }
    start = (end - 10);   //start number 10 less than end number
}

// function to iterate through students and shows only selected set of 10
function studentPagination (studentListPage){
  startEndParameters(studentListLength);   //calls function to get start and end paramenters
  for (var i = start; i < end; i++) {   //iterate through students
    var studentAddClass = studentListPage[i];   //adds student to variable
    $(studentAddClass).addClass('show');    //add 'show' class to each matching <li>
  }
  $('.show').fadeIn('slow');    //show only students with 'show' class
}

//Search
function searchHTML () {
  //Add search student mark-up to index.html file
  var $searchDiv = $('<div></div>');    //creat disembodied div element
    $searchDiv.addClass('student-search');    //add class to div element
  var $input = $('<input></input>');    //add <input placeholder = 'Search for students...'
    $input.attr('placeholder', 'Search for students...');   //add placeholder to input box
    $searchDiv.append($input);    //add input to div element
  var $searchButton = $('<button></button>');    //create button
    $searchButton.text('Search');   //add search text to button  
    $searchDiv.append($searchButton);   //add button to div element
  $('.page-header').append($searchDiv);       //add <div> class .student-search to <div class="page-header cf">
}
  
// function to iterate through students based on search input
function search() {
  searchInput = $('.student-search input').val().toLowerCase();   //capture input value make case insensitive  
  if (searchInput.length > 0) {   //check if any text has been inputted
    studentSearch();    //call student search function to retrieve matching students
    var searchList = $('.show');   //gets students matching search
    var searchLength = $('.show').length;   //gets length of searched students 
    $('.pagination').remove();    //removes page links 
    paginationLinks(pagination(searchLength));    //calls functions for page links of searched students (10 per page)
    pageLinks(searchList);    //calls function for click handler of page links
  }  else {   //if search has no input show all students
    $('.pagination').remove();    //removes page links 
    $('.student-item').removeClass('show').hide();   //remove show class from students and hides students
    $('.student-item:lt(9)').show();    //hides all but first 10 students
    paginationLinks(pagination(studentListLength));   //adds page links
    pageLinks(studentList); //click handler for page links
  }
}

//use text in search input to filter results
function studentSearch() {
    $('.student-item').removeClass('show');   //remove show class from students
    $('.student-item').hide();    //hides all students
    for (var i = 0; i < studentListLength; i ++) {    //iterate through student <li>
      var studentInfo = studentList[i].textContent;    //get text content from student <li>    
      if (studentInfo.indexOf(searchInput) > -1) {    //check for partial match
        var studentAddClass = studentList[i];   //add matching student to varaible
        $(studentAddClass).addClass('show');    //add 'show' class to each matching <li>
      } 
    }
    $('.show').fadeIn('slow');    //show matching students
    $('.show:gt(9)').hide();    //hide all but first 10 matching students
    if ($('.show').length < 1) {    //checks for no matchign students and shows message
      noResults();    //function to add error message
    }
}

//no results message
function noResults() {
  var $noResults = $('<h3></h3>');    //disembodied h3 element
  $noResults.addClass('error').text('No Students Found');    //add text to h3 element
  $('.student-list').parent().append($noResults);   //add h3 to div containing students
}

// inital page load functions
function pageLoad () {
$('.student-item:gt(9)').hide();    //hides all but first 10 students
paginationLinks(pagination(studentListLength));   //adds page links
pageLinks(studentList); //click handler for page links
searchHTML();   //search input and button
}

pageLoad();

//add eventlistener to search button
$('.student-search button').on('click' , function() {   //click handler for search button
    $('.error').remove();   //remove error message
    search();   //finds matching students
}); 

//add eventlistener to input
$('.student-search input').on('keyup' , function() {    //event handler to search 
  $('.error').remove();  //remoce error message
  search();   //finds matching students
}); 
