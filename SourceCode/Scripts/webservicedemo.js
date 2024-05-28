// jQuery functions to manipulate the main page and handle communication with
// the books web service via Ajax.
//
// Note that there is very little error handling in this file.  In particular, there
// is no validation in the handling of form data.  This is to avoid obscuring the 
// core concepts that the demo is supposed to show.

function getAllBooks()
{
    $.ajax({
        url: '/SourceCode/claims',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createBooksTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function addBook()
{
    var book = {
		ID: $('#claimid').val(),
        KIDSDRIV: $('#claimkidsdriv').val(),
        BIRTH: $('#claimbirth').val(),
        AGE: $('#claimage').val(),
        HOMEKIDS: $('#claimhomekids').val(),
        YOJ: $('#claimyoj').val(),
        INCOME: $('#claimincome').val(),
        PARENT1: $('#claimparent1').val(),
        HOME_VAL: $('#claimhomeval').val(),
        MSTATUS: $('#claimmstatus').val(),
        GENDER: $('#claimgender').val(),
        EDUCATION: $('#claimeducation').val(),
        OCCUPATION: $('#claimoccupation').val(),
        TRAVTIME: $('#claimtravtime').val(),
        CAR_USE: $('#claimcaruse').val(),
        BLUEBOOK: $('#claimbluebook').val(),
        TIF: $('#claimtif').val(),
        CAR_TYPE: $('#claimcartype').val(),
        RED_CAR: $('#claimredcar').val(),
        OLDCLAIM: $('#claimoldclaim').val(),
        CLM_FREQ: $('#claimclmfreq').val(),
        REVOKED: $('#claimrevoked').val(),
        MVR_PTS: $('#claimmvrpts').val(),
        CLM_AMT: $('#claimclmamt').val(),
        CAR_AGE: $('#claimcarage').val(),
        CLAIM_FLAG: $('#claimflag').val(),
        URBANICITY: $('#claimurbanicity').val()
    };

    $.ajax({
        url: '/SourceCode/claims',
        type: 'POST',
        data: JSON.stringify(book),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            updateGraphs();
            getAllBooks();
            getGraphs();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newbookform").html("");
}

function cancelChangeBook()
{
    $("#newbookform").html("");
}

function editBook(bookId)
{
    $.ajax({
        url: '/SourceCode/claims/' + bookId,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createEditBookForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function editBookValues(bookId)
{
    var book = {
        ID: $('#claimid').val(),
        KIDSDRIV: $('#claimkidsdriv').val(),
        BIRTH: $('#claimbirth').val(),
        AGE: $('#claimage').val(),
        HOMEKIDS: $('#claimhomekids').val(),
        YOJ: $('#claimyoj').val(),
        INCOME: $('#claimincome').val(),
        PARENT1: $('#claimparent1').val(),
        HOME_VAL: $('#claimhomeval').val(),
        MSTATUS: $('#claimmstatus').val(),
        GENDER: $('#claimgender').val(),
        EDUCATION: $('#claimeducation').val(),
        OCCUPATION: $('#claimoccupation').val(),
        TRAVTIME: $('#claimtravtime').val(),
        CAR_USE: $('#claimcaruse').val(),
        BLUEBOOK: $('#claimbluebook').val(),
        TIF: $('#claimtif').val(),
        CAR_TYPE: $('#claimcartype').val(),
        RED_CAR: $('#claimredcar').val(),
        OLDCLAIM: $('#claimoldclaim').val(),
        CLM_FREQ: $('#claimclmfreq').val(),
        REVOKED: $('#claimrevoked').val(),
        MVR_PTS: $('#claimmvrpts').val(),
        CLM_AMT: $('#claimclmamt').val(),
        CAR_AGE: $('#claimcarage').val(),
        CLAIM_FLAG: $('#claimflag').val(),
        URBANICITY: $('#claimurbanicity').val()
    };

    $.ajax({
        url: '/SourceCode/claims',
        type: 'PUT',
        data: JSON.stringify(book),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log('Server response:', data);
            updateGraphs();
            getAllBooks();
            getGraphs();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newbookform").html("");

}

function deleteBook(bookId)
{
    $.ajax({
        url: '/SourceCode/claims/' + bookId,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            updateGraphs();
            getAllBooks();
            getGraphs();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function createBooksTable(books) {
    var strResult = '<div class="col-md-12">' +
    '<table id="claimsTable" class="table table-bordered table-hover">' +
    '<thead>' +
    '<tr>' +
    '<th>ID</th>' +
    '<th>KIDSDRIV</th>' +
    '<th>BIRTH</th>' +
    '<th>AGE</th>' +
    '<th>HOMEKIDS</th>' +
    '<th>YOJ</th>' +
    '<th>INCOME</th>' +
    '<th>PARENT1</th>' +
    '<th>HOME_VAL</th>' +
    '<th>MSTATUS</th>' +
    '<th>GENDER</th>' +
    '<th>EDUCATION</th>' +
    '<th>OCCUPATION</th>' +
    '<th>TRAVTIME</th>' +
    '<th>CAR_USE</th>' +
    '<th>BLUEBOOK</th>' +
    '<th>TIF</th>' +
    '<th>CAR_TYPE</th>' +
    '<th>RED_CAR</th>' +
    '<th>OLDCLAIM</th>' +
    '<th>CLM_FREQ</th>' +
    '<th>REVOKED</th>' +
    '<th>MVR_PTS</th>' +
    '<th>CLM_AMT</th>' +
    '<th>CAR_AGE</th>' +
    '<th>CLAIM_FLAG</th>' +
    '<th>URBANICITY</th>' +
    '<th>&nbsp;</th>' +
    '<th>&nbsp;</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';
    
    $.each(books, function(index, book) {
        
        strResult += "<tr><td>" + book.ID + "</td><td> " + book.KIDSDRIV + "</td><td>" + book.BIRTH + "</td><td>" + book.AGE + "</td><td>" +
        book.HOMEKIDS + "</td><td>" + book.YOJ + "</td><td>" + book.INCOME + "</td><td>" + book.PARENT1 + "</td><td>" + book.HOME_VAL + 
        "</td><td>" + book.MSTATUS + "</td><td>" + book.GENDER + "</td><td>" + book.EDUCATION + "</td><td>" + book.OCCUPATION + "</td><td>" +
        book.TRAVTIME + "</td><td>" + book.CAR_USE + "</td><td>" + book.BLUEBOOK + "</td><td>" + book.TIF + "</td><td>" + book.CAR_TYPE + 
        "</td><td>" + book.RED_CAR + "</td><td>" + book.OLDCLAIM + "</td><td>" + book.CLM_FREQ + "</td><td>" + book.REVOKED + "</td><td>" +
        book.MVR_PTS + "</td><td>" + book.CLM_AMT + "</td><td>" + book.CAR_AGE + "</td><td>" + book.CLAIM_FLAG + "</td><td>" + book.URBANICITY +
        "</td><td>";

        strResult += '<input type="button" value="Edit Claim" class="btn btn-sm btn-primary" onclick="editBook(' +book.ID + ');" />';

        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Claim" class="btn btn-sm btn-primary" onclick="deleteBook(' + book.ID + ');" />';
        strResult += "</td></tr>";
    });
    strResult += "</tbody></table>";
    $("#allbooks").html(strResult);

    $('#claimsTable').DataTable({
        "pageLength": 12
    });
    
}

function createNewBookForm()
{
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';

    strResult += '<div class="form-group"><label for="claimid" class="col-md-3 control-label">ID</label><div class="col-md-9"><input type="text" class="form-control" id="claimid"></div></div>';
    strResult += '<div class="form-group"><label for="claimkidsdriv" class="col-md-3 control-label">KIDSDRIV</label><div class="col-md-9"><input type="text" class="form-control" id="claimkidsdriv"></div></div>';
    strResult += '<div class="form-group"><label for="claimbirth" class="col-md-3 control-label">BIRTH</label><div class="col-md-9"><input type="text" class="form-control" id="claimbirth"></div></div>';
    strResult += '<div class="form-group"><label for="claimage" class="col-md-3 control-label">AGE</label><div class="col-md-9"><input type="text" class="form-control" id="claimage"></div></div>';
    strResult += '<div class="form-group"><label for="claimhomekids" class="col-md-3 control-label">HOMEKIDS</label><div class="col-md-9"><input type="text" class="form-control" id="claimhomekids"></div></div>';
    strResult += '<div class="form-group"><label for="claimyoj" class="col-md-3 control-label">YOJ</label><div class="col-md-9"><input type="text" class="form-control" id="claimyoj"></div></div>';
    strResult += '<div class="form-group"><label for="claimincome" class="col-md-3 control-label">INCOME</label><div class="col-md-9"><input type="text" class="form-control" id="claimincome"></div></div>';
    strResult += '<div class="form-group"><label for="claimparent1" class="col-md-3 control-label">PARENT1</label><div class="col-md-9"><input type="text" class="form-control" id="claimparent1"></div></div>';
    strResult += '<div class="form-group"><label for="claimhomeval" class="col-md-3 control-label">HOME_VAL</label><div class="col-md-9"><input type="text" class="form-control" id="claimhomeval"></div></div>';
    strResult += '<div class="form-group"><label for="claimmstatus" class="col-md-3 control-label">MSTATUS</label><div class="col-md-9"><input type="text" class="form-control" id="claimmstatus"></div></div>';
    strResult += '<div class="form-group"><label for="claimgender" class="col-md-3 control-label">GENDER</label><div class="col-md-9"><input type="text" class="form-control" id="claimgender"></div></div>';
    strResult += '<div class="form-group"><label for="claimeducation" class="col-md-3 control-label">EDUCATION</label><div class="col-md-9"><input type="text" class="form-control" id="claimeducation"></div></div>';
    strResult += '<div class="form-group"><label for="claimoccupation" class="col-md-3 control-label">OCCUPATION</label><div class="col-md-9"><input type="text" class="form-control" id="claimoccupation"></div></div>';
    strResult += '<div class="form-group"><label for="claimtravtime" class="col-md-3 control-label">TRAVTIME</label><div class="col-md-9"><input type="text" class="form-control" id="claimtravtime"></div></div>';
    strResult += '<div class="form-group"><label for="claimcaruse" class="col-md-3 control-label">CAR_USE</label><div class="col-md-9"><input type="text" class="form-control" id="claimcaruse"></div></div>';
    strResult += '<div class="form-group"><label for="claimbluebook" class="col-md-3 control-label">BLUEBOOK</label><div class="col-md-9"><input type="text" class="form-control" id="claimbluebook"></div></div>';
    strResult += '<div class="form-group"><label for="claimtif" class="col-md-3 control-label">TIF</label><div class="col-md-9"><input type="text" class="form-control" id="claimtif"></div></div>';
    strResult += '<div class="form-group"><label for="claimcartype" class="col-md-3 control-label">CAR_TYPE</label><div class="col-md-9"><input type="text" class="form-control" id="claimcartype"></div></div>';
    strResult += '<div class="form-group"><label for="claimredcar" class="col-md-3 control-label">RED_CAR</label><div class="col-md-9"><input type="text" class="form-control" id="claimredcar"></div></div>';
    strResult += '<div class="form-group"><label for="claimoldclaim" class="col-md-3 control-label">OLDCLAIM</label><div class="col-md-9"><input type="text" class="form-control" id="claimoldclaim"></div></div>';
    strResult += '<div class="form-group"><label for="claimclmfreq" class="col-md-3 control-label">CLM_FREQ</label><div class="col-md-9"><input type="text" class="form-control" id="claimclmfreq"></div></div>';
    strResult += '<div class="form-group"><label for="claimrevoked" class="col-md-3 control-label">REVOKED</label><div class="col-md-9"><input type="text" class="form-control" id="claimrevoked"></div></div>';
    strResult += '<div class="form-group"><label for="claimmvrpts" class="col-md-3 control-label">MVR_PTS</label><div class="col-md-9"><input type="text" class="form-control" id="claimmvrpts"></div></div>';
    strResult += '<div class="form-group"><label for="claimclmamt" class="col-md-3 control-label">CLM_AMT</label><div class="col-md-9"><input type="text" class="form-control" id="claimclmamt"></div></div>';
    strResult += '<div class="form-group"><label for="claimcarage" class="col-md-3 control-label">CAR_AGE</label><div class="col-md-9"><input type="text" class="form-control" id="claimcarage"></div></div>';
    strResult += '<div class="form-group"><label for="claimflag" class="col-md-3 control-label">CLAIM_FLAG</label><div class="col-md-9"><input type="text" class="form-control" id="claimflag"></div></div>';
    strResult += '<div class="form-group"><label for="claimurbanicity" class="col-md-3 control-label">URBANICITY</label><div class="col-md-9"><input type="text" class="form-control" id="claimurbanicity"></div></div>';

    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Claim" class="btn btn-sm btn-primary" onclick="addBook();" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeBook();" /></div></div>';
    strResult += '</form></div>';
    $("#newbookform").html(strResult);
}

function createEditBookForm(book)
{
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';

    strResult += '<div style="display:none" class="form-group"><label for="claimid" class="col-md-3 control-label">ID</label><div class="col-md-9"><input type="text" class="form-control" id="claimid" value="' + book.ID + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimkidsdriv" class="col-md-3 control-label">KIDSDRIV</label><div class="col-md-9"><input type="text" class="form-control" id="claimkidsdriv" value="' + book.KIDSDRIV + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimbirth" class="col-md-3 control-label">BIRTH</label><div class="col-md-9"><input type="text" class="form-control" id="claimbirth"  value="' + book.BIRTH + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimage" class="col-md-3 control-label">AGE</label><div class="col-md-9"><input type="text" class="form-control" id="claimage" value="' + book.AGE + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimhomekids" class="col-md-3 control-label">HOMEKIDS</label><div class="col-md-9"><input type="text" class="form-control" id="claimhomekids" value="' + book.HOMEKIDS + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimyoj" class="col-md-3 control-label">YOJ</label><div class="col-md-9"><input type="text" class="form-control" id="claimyoj" value="' + book.YOJ + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimincome" class="col-md-3 control-label">INCOME</label><div class="col-md-9"><input type="text" class="form-control" id="claimincome" value="' + book.INCOME + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimparent1" class="col-md-3 control-label">PARENT1</label><div class="col-md-9"><input type="text" class="form-control" id="claimparent1" value="' + book.PARENT1 + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimhomeval" class="col-md-3 control-label">HOME_VAL</label><div class="col-md-9"><input type="text" class="form-control" id="claimhomeval" value="' + book.HOME_VAL + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimmstatus" class="col-md-3 control-label">MSTATUS</label><div class="col-md-9"><input type="text" class="form-control" id="claimmstatus" value="' + book.MSTATUS + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimgender" class="col-md-3 control-label">GENDER</label><div class="col-md-9"><input type="text" class="form-control" id="claimgender" value="' + book.GENDER + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimeducation" class="col-md-3 control-label">EDUCATION</label><div class="col-md-9"><input type="text" class="form-control" id="claimeducation" value="' + book.EDUCATION + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimoccupation" class="col-md-3 control-label">OCCUPATION</label><div class="col-md-9"><input type="text" class="form-control" id="claimoccupation" value="' + book.OCCUPATION + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimtravtime" class="col-md-3 control-label">TRAVTIME</label><div class="col-md-9"><input type="text" class="form-control" id="claimtravtime" value="' + book.TRAVTIME + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimcaruse" class="col-md-3 control-label">CAR_USE</label><div class="col-md-9"><input type="text" class="form-control" id="claimcaruse" value="' + book.CAR_USE + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimbluebook" class="col-md-3 control-label">BLUEBOOK</label><div class="col-md-9"><input type="text" class="form-control" id="claimbluebook" value="' + book.BLUEBOOK + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimtif" class="col-md-3 control-label">TIF</label><div class="col-md-9"><input type="text" class="form-control" id="claimtif" value="' + book.TIF + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimcartype" class="col-md-3 control-label">CAR_TYPE</label><div class="col-md-9"><input type="text" class="form-control" id="claimcartype" value="' + book.CAR_TYPE + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimredcar" class="col-md-3 control-label">RED_CAR</label><div class="col-md-9"><input type="text" class="form-control" id="claimredcar" value="' + book.RED_CAR + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimoldclaim" class="col-md-3 control-label">OLDCLAIM</label><div class="col-md-9"><input type="text" class="form-control" id="claimoldclaim" value="' + book.OLDCLAIM + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimclmfreq" class="col-md-3 control-label">CLM_FREQ</label><div class="col-md-9"><input type="text" class="form-control" id="claimclmfreq" value="' + book.CLM_FREQ + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimrevoked" class="col-md-3 control-label">REVOKED</label><div class="col-md-9"><input type="text" class="form-control" id="claimrevoked" value="' + book.REVOKED + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimmvrpts" class="col-md-3 control-label">MVR_PTS</label><div class="col-md-9"><input type="text" class="form-control" id="claimmvrpts" value="' + book.MVR_PTS + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimclmamt" class="col-md-3 control-label">CLM_AMT</label><div class="col-md-9"><input type="text" class="form-control" id="claimclmamt" value="' + book.CLM_AMT + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimcarage" class="col-md-3 control-label">CAR_AGE</label><div class="col-md-9"><input type="text" class="form-control" id="claimcarage" value="' + book.CAR_AGE + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimflag" class="col-md-3 control-label">CLAIM_FLAG</label><div class="col-md-9"><input type="text" class="form-control" id="claimflag" value="' + book.CLAIM_FLAG + '" ></div></div>';
    strResult += '<div class="form-group"><label for="claimurbanicity" class="col-md-3 control-label">URBANICITY</label><div class="col-md-9"><input type="text" class="form-control" id="claimurbanicity" value="' + book.URBANICITY + '" ></div></div>';

    
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Update Claim" class="btn btn-sm btn-primary" onclick="editBookValues(' + book.ID + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeBook();" /></div></div>';
    strResult += '</form></div>';
    $("#newbookform").html(strResult);

}